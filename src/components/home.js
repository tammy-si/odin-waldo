import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const characters = [
        {
          name: "Johnny Bravo",
          img_url: "https://wallpapers.com/images/hd/johnny-bravo-character-design-5xfg0ld6c7ze9la0.jpg"
        },
        {
          name: "Totoro",
          img_url: "https://i.pinimg.com/736x/30/3b/e3/303be33381955670073a574f5fd98314--my-neighbor-totoro-studio-ghibli.jpg"
        },
        {
          name: "R2D2",
          img_url: "https://upload.wikimedia.org/wikipedia/en/3/39/R2-D2_Droid.png"
        }
    ]
    
    return (
        <div class="home">
            <h1>Find these characters!</h1>
            <div class="characters">
                {characters.map(character => {
                    return (
                        <div className="character-info">
                            <li>{character.name}</li>
                            <img src={character.img_url}></img>
                        </div>
                    )
                })}
            </div>
            <button className="start-button" onClick={()=> navigate('/game')}>Start the Game</button>
        </div>
    )
}

export default Home;