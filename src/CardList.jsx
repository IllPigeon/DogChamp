import React from 'react'
import {useState, useEffect} from 'react'
import DogCard from './DogCard';

export default function CardList({ dogs, dog_images}) {

    const [filteredBreeds, setFilteredBreeds] = useState([]);
    const [breed, setBreed] = useState('');

    // useEffect(() => {
    //     setFilteredBreeds(filterBreeds(dogs));
    // }, [dogs]);

    // const filterBreeds = (dogs) => {
    //     dogs.filter((dog) => {
    //     })
    // };

  //map each dog breed to its own individual list row, pass in image and breed name to dog card.
  return (
    <div>
        {dogs.map(breed => (
          <div>
            <h3>{breed}</h3>
            <div>
              {dog_images[breed] && dog_images[breed].map((image, index) => (
                <DogCard breed={breed} breedImage={image} index={index}/>
              ))}
            </div>
          </div>
      ))}
        {/* {filteredBreeds.map((breed) => (
            <DogEntry breed={breed}/>
        ))} */}
    </div>
  )
};
