import { useLocation } from "react-router-dom";
import {useState} from 'react'

function Scores() {
    const [name, setName] = useState("")
    const { state } = useLocation();
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name)
    }

    return (
        <div className="scores">
            <form className="enter-score" onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" value={name} onChange={handleNameChange}></input>
                <p className="last-score">{ str_pad_left(minutes, '0', 2) + ':' + str_pad_left(seconds , '0', 2) }</p>
                <input type='submit'></input>
            </form>
        </div>
    )
}

export default Scores;