import React from 'react'
import DogCard from './DogCard';

export default function CardList({ dogs, dog_images}) {

  //map each dog breed to its own individual list row, pass in image and breed name to dog card.
  return (
    <div className="dog-cards-list">
        {dogs.map(breed => (
          <>
          <div className="breed-title">
              <h3>{breed.toUpperCase()}</h3>
          </div>
          <div className="cards-container">
            <div>
              {dog_images[breed] && dog_images[breed].map((image, index) => (
                <DogCard breed={breed} breedImage={image} index={index}/>
              ))}
          </div>
          </div>
          </>
      ))}
    </div>
  )
};
