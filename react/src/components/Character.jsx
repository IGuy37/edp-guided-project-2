import React, {useEffect} from "react";
import "../site.css"
import ListOfPlanets from "./ListOfPlanets";
import ListOfFilms from "./ListOfFilms";
import { useParams } from "react-router-dom";

export default function Character(props){        
    console.log(props);
    const character = props.data;
    const params = useParams();
    useEffect(() => {
        if(!character.id){
            props.updateChar({reloaded: true, id: params.id})
        }
    }, [])
    return(
        <>
            <h1>{character.name}</h1>
            <section id="generalInfo">
                <p>Height: {character.height} cm</p>
                <p>Mass: {character.mass} kg</p>
                <p>Born: {character.birth_year}</p>
            </section>
            <hr></hr>
            <section id="planets">
                <h2>Homeworld</h2>
                <ListOfPlanets data={props.planets} updatePlanet={props.updatePlanet}/>
            </section>
            <hr></hr>
            <section id="films">
                <h2>Films appeared in</h2>
                <ListOfFilms data={props.films} updateFilm={props.updateFilm}/>
            </section>
        </>
    );
}