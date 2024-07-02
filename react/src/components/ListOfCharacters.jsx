
import Character from "./Character";

const ListOfCharacters = (props) => {
    return (
        <>
            <div>List of Characters</div>
            <h5>Featured</h5>
            <div className="d-flex flex-row justify-content-start" style={{ gap: "20px", padding: "20px" }}>

                {
                    props.data.map((character) => (
                        <Character key={character._id} data={character} />
                    ))
                }
            </div>
        </>
    );
};

export default ListOfCharacters