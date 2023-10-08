import React from 'react'
import DogCard from './DogCard';

function CardList({ dogs, dog_images}) {


  //map each dog breed to its own individual list row, pass in image and breed name to dog card.
  return (
    <>
        {dogs.map(breed => (
          <>
          <div className="breed-title">
              <h3>{breed.toUpperCase()}</h3>
          </div>
          <div className="cards-container">
            
              {
              // Checks to see if dog the breed image exists, and then maps them to an index.
              dog_images[breed] && dog_images[breed].map((image) => (
                <div key={breed} className = "dog-card-row">
                  <DogCard breed={breed} breedImage={image}/>
                </div>
              ))}
          </div>
          </>
      ))}
    </>
  )
};
export default CardList;
