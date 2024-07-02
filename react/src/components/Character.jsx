import React from "react";
import "../site.css"
import ListOfPlanets from "./ListOfPlanets";
import ListOfFilms from "./ListOfFilms";

export default function Character(props){

    const character = props.data;
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
                <ListOfPlanets data={props.planets}/>
            </section>
            <hr></hr>
            <section id="films">
                <h2>Films appeared in</h2>
                <ListOfFilms data={props.films}/>
            </section>
        </>
    );
}