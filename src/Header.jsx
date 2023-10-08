import React from 'react'
import DogChampLogo from './assets/DogChampLogo.png'
export default function Header() {
  return (
    <div className="header">
      <h1>
        DogChamp!
      </h1>
      <img src={DogChampLogo}></img>
    </div>
  )
}
