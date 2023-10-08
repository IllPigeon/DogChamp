import React from 'react'
import DogChampLogo from './assets/DogChampLogo.png'

//Logo and Title
 function Header() {
  return (
    <div className="header">
      <h1>
        DogChamp!
      </h1>
      <img src={DogChampLogo}></img>
    </div>
  )
}
export default Header;
