import "./app.css"
import "./egor-klyuchnyk-small.jpg"
import Dropdown from "./components/dropdown";
import React, {useState} from "react";

function App() {
  const [charactersLeft, setCharactersLeft] = useState([
    {
      name: "Johnny Bravo",
    },
    {
      name: "Totoro"
    },
    {
      name: "R2D2"
    }
  ])

  const handleImageClick = (e) => {
    console.log('here')
    // from this stackoverflow answer https://stackoverflow.com/questions/34867066/javascript-mouse-click-coordinates-for-image
    const image = e.target;
    let rect = image.getBoundingClientRect();
    var left=rect.left;
    var top=rect.top;
    var x = e.pageX - left - window.scrollX;
    var y = e.pageY - top - window.scrollY;
    var cw=image.clientWidth
    var ch=image.clientHeight
    var iw=image.naturalWidth
    var ih=image.naturalHeight
    // px and py is the pixels on the original image
    var px=x/cw*iw
    var py=y/ch*ih
    // display dropdown for character
    document.getElementById("dropdown").style.display = 'flex';
    // set the dropdown location
    document.getElementById("dropdown").style.top = y + "px";
    document.getElementById("dropdown").style.left = x + "px";
    // clicked on johnny
    if (px >= 700 && px <= 800 && py >= 950 && py <= 1050) {
      console.log("Johnny");
    } else {
      console.log("Not Johnny")
    }
  }

  const handleButtonClick = (character) => {
    // get the character that was passed in
    console.log(character)
  } 

  return (
    <div className="App">
      <header>
        <h1>Find the characters</h1>
      </header>
      <img src={require('./egor-klyuchnyk-small.jpg')} alt='Waldo image' onClick={handleImageClick}></img>
      <Dropdown charactersLeft = {charactersLeft} handleButtonClick={handleButtonClick}/>
    </div>
  );
}

export default App;