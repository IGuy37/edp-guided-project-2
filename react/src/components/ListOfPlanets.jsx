import {Link} from "react-router-dom";

const ListOfPlanets = (props) => {
    
    return (
        <>
            <div>List of Planets</div>
            <div className="d-flex flex-row justify-content-start" style={{ gap: "20px", padding: "20px" }}>

                {
                    props.data.map((planet) => (
                        <Link key={planet._id} className = "nav-link" to={`/planets/${planet.id}`} onClick={() => props.updatePlanet(planet)}>{planet.name}</Link>
                    ))
                }
            </div>
        </>
    );
};

export default ListOfPlanets