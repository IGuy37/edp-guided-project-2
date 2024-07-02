
import {Link} from "react-router-dom";

const ListOfCharacters = (props) => {
    
    return (
        <>
            <div>List of Characters</div>
            <h5>Featured</h5>
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