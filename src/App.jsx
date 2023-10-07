import React, { useState, useEffect } from 'react';
import Header from './Header';
import axios from 'axios';
import CardList from './CardList';

const App = () => {
  const [breeds, setBreeds] = useState([]);
  const [images, setImages] = useState({});
  const [query, setQuery] = useState('');
  const [filteredBreeds, setFilteredBreeds] = useState([]);

  const onChange = (event) => {
    setQuery(event.target.value);
  }

  const addFilter = (filteredBreed) => {
    console.log("breed filtered")
  }

  const clearFilters = () => {
    console.log("filters cleared")
  }

  useEffect(() => {
    // Fetch list of dog breeds
    //ADD DARK MODE TOGGLE
    axios.get('https://dog.ceo/api/breeds/list/all')
      .then(response => {
        const breedList = Object.keys(response.data.message);
        // console.log(response.data.message.bulldog);
        setBreeds(breedList);
        const imageRequests = breedList.map(breed =>
          axios.get(`https://dog.ceo/api/breed/${breed}/images/random/10`)
            .then(imageResponse => imageResponse.data.message)
            .catch(error => {
              console.error(`Error fetching images for ${breed}:`, error);
              return [];
            })
        );

        // Resolve all image requests
        Promise.all(imageRequests)
          .then(imagesData => {
            const imagesMap = {};
            breedList.forEach((breed, index) => {
              imagesMap[breed] = imagesData[index];
            });
            setImages(imagesMap);
          })
          .catch(error => {
            console.error('Error fetching breed images:', error);
          });
      })
      .catch(error => {
        console.error('Error fetching breeds:', error);
      });
  }, []);

  return (
    <>
    <div>
      <Header/>
    </div>
    <div className="filter-area">
      <h2>
        Add Breed Filter!
      </h2>
      <div className="search-area">
        <div className="search-box"></div>
          <input text="Search" value={query} onChange={onChange}/>
          <button onClick={()=>addFilter(query)}>Add Filter</button>
        </div>
        <div className="drop-down">

        </div>
      </div>
      <div className="filter-pills">
        <button onClick={()=>clearFilters(filteredBreeds)}>Clear Filters</button>
        <p>Active Filters Pills</p>
      </div>
    <div>
      <CardList dogs={breeds} dog_images={images}/>      
    </div>
    </>
  );
};

export default App
