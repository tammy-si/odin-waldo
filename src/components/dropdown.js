function Dropdown (props) {

    return (
        <div className="dropdown" id="dropdown">
            {props.charactersLeft.map(character => {
                return <li>{character.name}</li>
            })}
        </div>
    )
}

export default Dropdown