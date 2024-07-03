import React from "react";
import "../site.css"
import ListOfFilms from "./ListOfFilms";
import ListOfCharacters from "./ListOfCharacters";

export default function Planet(props){

    const planet = props.data;
    console.log(props);
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
            <section id="planets">
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