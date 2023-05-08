import "./app.css"
import "./egor-klyuchnyk-small.jpg"
import Dropdown from "./components/dropdown";
import React, {useEffect, useState} from "react";
import { query, collection, where, getDocs } from "firebase/firestore"; 
import { db } from "./firebase";
import Message from "./components/message";
import { useNavigate } from 'react-router-dom';

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
  const [curr_x, setCurrX] = useState(0);
  const [curr_y, setCurrY] = useState(0);
  const [correct, setCorrect] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(false);
  // this handles the users score/time
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(()=> {     
      setTime(time + 1);
    }, 1000);
    return () => { // this runs as the clean up function for the useEffect
      clearInterval(timer)
   }
  }, [time]);

  const navigate = useNavigate();
  useEffect(()=> {
    // no characters left
    if (charactersLeft.length == 0) {
      // go to scores section so user could enter score
      navigate('/scores', { state: {time: time} })
    }
  }, [charactersLeft])

  useEffect(() => {
    // get rid of the display Message after 2 seconds
    if (displayMessage) {
      setTimeout(() => {
        setDisplayMessage(false);
      }, 2000)
    }
  }, [displayMessage])


  const handleImageClick = (e) => {
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
    // set the dropdown location to where the mouse actually clicked
    document.getElementById("dropdown").style.top = y + "px";
    document.getElementById("dropdown").style.left = x + "px";
    // set the curr X and curr Y to keep track of where the user clicked
    setCurrX(px);
    setCurrY(py);
  }

  async function handleButtonClick (character) {
    let characterData;
    // get the character that was passed in
    const q = query(collection(db, "Characters"), where("name", "==", character));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      characterData = doc.data();
    });
    // check if user clicked location is in the range
    if (curr_x >= characterData.x_target && curr_x <= characterData.x_target_end && curr_y >= characterData.y_target && curr_y <= characterData.y_target_end) {
      // in the range, can update character's left state
      let newCharactersLeft = charactersLeft.filter(char => char.name !== character)
      setCharactersLeft(newCharactersLeft)
      setCorrect(true);
    } else {
      setCorrect(false);
    }
    setDisplayMessage(true);
  } 

  function str_pad_left(string, pad, length) {
    return (new Array(length + 1).join(pad) + string).slice(-length);
  }
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  return (
    <div className="App">
      <header>
        <h1>Find the characters</h1>
        { str_pad_left(minutes, '0', 2) + ':' + str_pad_left(seconds , '0', 2) }
        { displayMessage ? <Message correct={correct}/> : null }
      </header>
      <img src={require('./egor-klyuchnyk-small.jpg')} alt='Waldo image' onClick={handleImageClick}></img>
      <Dropdown charactersLeft = {charactersLeft} handleButtonClick={handleButtonClick}/>
    </div>
  );
}

export default App;
