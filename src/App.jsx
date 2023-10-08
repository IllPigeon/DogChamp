import React, { useState, useEffect } from 'react';
import Header from './Header';
import axios from 'axios';
import CardList from './CardList';

const App = () => {
  const [breeds, setBreeds] = useState([]);
  const [images, setImages] = useState({});
  const [query, setQuery] = useState('');
  const [filteredBreeds, setFilteredBreeds] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);

  const onChange = (event) => {
    setQuery(event.target.value);
  }

  const addFilter = (filteredBreed) => {
    if (breeds.includes(filteredBreed) && !activeFilters.includes(filteredBreed)) {
      setActiveFilters([...activeFilters, filteredBreed]);
      setFilteredBreeds(filterBreed(breeds));
    }
  };
  
  const clearFilters = () => {
    setActiveFilters([]);
    setFilteredBreeds(filterBreed(breeds));
    console.log("filters cleared");
  };
  

  //fetching all dog breeds from dog API
  useEffect(() => {
    // Fetch list of dog breeds
    //ADD DARK MODE TOGGLE
    axios.get('https://dog.ceo/api/breeds/list/all')
      .then(response => {
        const breedList = Object.keys(response.data.message);
        // console.log(response.data.message.bulldog);
        setBreeds(breedList);
        const imageRequests = breedList.map(breed =>
          axios.get(`https://dog.ceo/api/breed/${breed}/images/random/12`)
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


  const filterBreed = () => {
    return breeds.filter((breed) => {
      return activeFilters.includes(breed);
    });
  };

  //using useEffect to filter out dog breeds based on current filters
  useEffect(() => {
    setFilteredBreeds(filterBreed(breeds));
  }, [breeds, activeFilters])



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
        <div className="dropdown">
          {breeds.filter(breed =>{
            const filterTerm = query.toLowerCase();
            return filterTerm && breed.startsWith(filterTerm) && breed != filterTerm;
          }).map(breed => 
          <div className="dropdown-row" onClick={()=> setQuery(breed)}>
            {breed}
          </div>
          )}
        </div>
      </div>
      <div className="filter-pills">
        <button onClick={()=>clearFilters(filteredBreeds)}>Clear Filters</button>
        <p>Active Filters Pills</p>
      </div>
    <div className="dogs-container">
      <CardList dogs={filteredBreeds} dog_images={images}/>      
    </div>
    </>
  );
};

export default App
