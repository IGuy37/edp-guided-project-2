
import {Link} from "react-router-dom";

const ListOfCharacters = (props) => {
    console.log(props); 
    return (
        <>
            <div>List of Characters</div>
            <div className="d-flex flex-row justify-content-start" style={{ gap: "20px", padding: "20px" }}>

                {
                    props.data.map((character) => (
                        <Link key={character._id} className = "nav-link" to={`/characters/${character.id}`} onClick={() => props.updateChar(character)}>{character.name}</Link>
                    ))
                }
            </div>
        </>
    );
};

export default ListOfCharacters