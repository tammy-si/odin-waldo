import { useLocation, useNavigate } from "react-router-dom";
import {useState} from 'react';
import { doc, setDoc, collection, addDoc } from "firebase/firestore"; 
import { db } from "../firebase";
import Leaderboard from "./leaderboard";


function Scores() {
    const [name, setName] = useState("")
    const { state } = useLocation();
    const navigate = useNavigate();
    const time = state.time;

    // for formatting the time
    function str_pad_left(string, pad, length) {
        return (new Array(length + 1).join(pad) + string).slice(-length);
      }
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    async function handleSubmit (e) {        
        e.preventDefault();
        await addDoc(collection(db, "scores"), {
            name: name,
            timeInSeconds: time
        });
        navigate('/leaderboard')
    }

    return (
        <div className="input-score">
            <form className="enter-score" onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" value={name} onChange={handleNameChange}></input>
                <p className="last-score">{ str_pad_left(minutes, '0', 2) + ':' + str_pad_left(seconds , '0', 2) }</p>
                <input type='submit'></input>
            </form>
        </div>
    )
}

export default Scores;