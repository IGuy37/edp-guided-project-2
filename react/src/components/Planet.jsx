import React, { useEffect } from "react";
import "../site.css"
import ListOfFilms from "./ListOfFilms";
import ListOfCharacters from "./ListOfCharacters";
import { useParams } from "react-router-dom";

export default function Planet(props){

    const planet = props.data;
    console.log({"planetProps" : props});
    const params = useParams();
    useEffect(() => {
        if(!planet.id){
            props.updatePlanet({reloaded: true, id: params.id})
        }
    }, [])
    
    return(
        <>
            <h1>{planet.name}</h1>
            <section id="generalInfo">
                <p>Population: {planet.population}</p>
                <p>Gravity: {planet.gravity}</p>
                <p>Climate: {planet.climate}</p> 
                <p>Terrain: {planet.terrain}</p>
            </section>
            <hr></hr>
            <section id="characters">
                <h2>Characters Featured</h2>
                <ListOfCharacters data={props.chars} updateChar={props.updateChar}/>
            </section>
            <hr></hr>
            <section id="films">
                <h2>Films Featured</h2>
                <ListOfFilms data={props.films} updateFilm={props.updateFilm}/>
            </section>
        </>
    );
}