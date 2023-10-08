import React from 'react'

export default function DogCard({ breed, breedImage, index }) {

    return (
    <div className="dog-card">
        <a href={breedImage} target="_blank">
            <img key={index} src={breedImage} alt={`${breed} ${index}`}/>
        </a>
    </div>
    )
}
