import React, { useState, useEffect } from 'react';
import Header from './Header';
import axios from 'axios';
import CardList from './CardList';
import FilterPill from './FilterPill';


const App = () => {
  // STUFF ID LIKE TODO: MAKE HEADER/SEARCHBAR/FILTERS FOLLOW SCROLL
  //states for storing the breeds, filtered breed images, filter query, etc.
  const [breeds, setBreeds] = useState([]);
  const [images, setImages] = useState({});
  const [query, setQuery] = useState('');
  const [filteredBreeds, setFilteredBreeds] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);

  //on change for the filter search bar
  const onChange = (event) => {
    setQuery(event.target.value);
  }

  //button add valid filter from the search bar
  const addFilter = (filteredBreed) => {
    if (breeds.includes(filteredBreed.toLowerCase()) && !activeFilters.includes(filteredBreed.toLowerCase())) {
      setActiveFilters([...activeFilters, filteredBreed.toLowerCase()]);
      setFilteredBreeds(filterBreed(breeds));
    }
    setQuery('');
  };

  const handleRemoveFilter = (breedToRemove) => {
    // Logic to remove the breed filter from activeFilters state
    setActiveFilters(activeFilters.filter(breed => breed !== breedToRemove));
  };
  
  const clearFilters = () => {
    setActiveFilters([]);
    setFilteredBreeds(filterBreed(breeds));
    console.log("filters cleared");
  };
  

  //fetching all dog breeds from dog API
  useEffect(() => {
    axios.get('https://dog.ceo/api/breeds/list/all')
      .then(response => {
        const breedList = Object.keys(response.data.message);
        setBreeds(breedList);
        setFilteredBreeds(breedList);
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

  //filtering out breeds based on search filter parameters
  const filterBreed = () => {
    if(activeFilters.length > 0){
      return breeds.filter((breed) => {
        return activeFilters.includes(breed);
      });
    }
    else{
      return breeds;
    }
  };

  //using useEffect to filter out dog breeds based on current filters
  useEffect(() => {
    setFilteredBreeds(filterBreed(breeds));
  }, [breeds, activeFilters])

  /**
   * Main page component, has the header, filtering functionality, and displays
   * each dog breed. If no breed is filtered then it will display them all.
   */
  return (
    <>
    <Header/>
    <div className="filter-area">
      <div className="search-area">
        <div className="search-box">
          <input type="text" text="Search" value={query} onChange={onChange}/>
          <button onClick={()=>addFilter(query)}>Add Filter</button>
        </div>
      </div>
      <div className="dropdown">
        {breeds.filter(breed =>{
          const filterTerm = query.toLowerCase();
          return filterTerm && breed.startsWith(filterTerm) && breed != filterTerm;
        }).map(breed => 
        <div className="dropdown-row" onClick={()=> setQuery(breed.toUpperCase())}>
          {breed.toUpperCase()}
        </div>
        )}
      </div>
    </div>
      <div className="filter-pills">
        <button onClick={() => clearFilters(filteredBreeds)}>Clear Filters</button>
        {activeFilters.map((breed, index) => (
          <FilterPill key={index} breed={breed} handleRemove={handleRemoveFilter}/>
        ))}
      </div>
    <div className="dogs-container">
      <CardList dogs={filteredBreeds} dog_images={images}/>      
    </div>
    </>
  );
};

export default App
