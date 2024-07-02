import React from "react";
import "../site.css"
import ListOfFilms from "./ListOfPlanets";
import ListOfCharacters from "./ListOfCharacters";

export default function Planet(props){

    const planet = props.data;
    return(
        <>
            <h1>{planet.title}</h1>
            <section id="generalInfo">
                <p>Height: {planet.height} cm</p>
                <p>Mass: {planet.mass} kg</p>
                <p>Born: {planet.birth_year}</p>
            </section>
            <hr></hr>
            <section id="planets">
                <h2>Characters Featured</h2>
                <ListOfCharacters data={props.chars}/>
            </section>
            <hr></hr>
            <section id="films">
                <h2>Films Featured</h2>
                <ListOfFilms data={props.films}/>
            </section>
        </>
    );
}