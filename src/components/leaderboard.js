import {useEffect, useState} from 'react'
import { db } from '../firebase';
import { collection, query, orderBy,getDocs } from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom';


function InputScore() {
    const navigate = useNavigate()
    const [data, setData] = useState([]);
    // get the leaderboard in order from lowest to highest
    useEffect(() => {
        var tempData = [];
        const fetchData = async () => {
            const scoresRef = collection(db, "scores")
            const q = query(scoresRef, orderBy('timeInSeconds'))
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                tempData = [...tempData, doc.data()];
            })
            setData(tempData);
        }
        fetchData()
            .catch(console.error);
    }, [])

    return (
        <div className="leaderboard">
            <h1>Leaderboard</h1>
            <button onClick={() => navigate('/')}>Play again</button>
            {data.map(score => {
                return (
                    <div className='score-info'>
                        <p>{score.name}</p>
                        <p>{score.timeInSeconds}</p>
                    </div>
                );
            })}
        </div>
    )
}

export default InputScore;