function Dropdown (props) {

    return (
        <div className="dropdown" id="dropdown">
            {props.charactersLeft.map(character => {
                return <button onClick={() => props.handleButtonClick(character.name)}>{character.name}</button>
            })}
        </div>
    )
}

export default Dropdown