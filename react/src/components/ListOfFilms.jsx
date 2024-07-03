import {Link} from "react-router-dom";

const ListOfFilms = (props) => {
    console.log(props);
    return (
        <>
            <div>List of Films</div>
            <div className="d-flex flex-row justify-content-start" style={{ gap: "20px", padding: "20px" }}>

                {
                    props.data.map((film) => (
                        <Link key={film._id} className = "nav-link" to={`/films/${film.id}`} onClick={() => props.updateFilm(film)}>{film.title}</Link>
                    ))
                }
            </div>
        </>
    );
};

export default ListOfFilms