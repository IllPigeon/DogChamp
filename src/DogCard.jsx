import React from 'react'

export default function DogCard({breed, breedImage, index }) {

    return (
    <div>
        <img key={index} src={breedImage} alt={`${breed} ${index}`} />
    </div>
    )
}
