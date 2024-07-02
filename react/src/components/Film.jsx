import React from "react";
import "../site.css"
import ListOfPlanets from "./ListOfPlanets";
import ListOfCharacters from "./ListOfCharacters";

export default function Film(props){

    const film = props.data;
    return(
        <>
            <h1>{film.title}</h1>
            <section id="generalInfo">
                <p>Height: {film.height} cm</p>
                <p>Mass: {film.mass} kg</p>
                <p>Born: {film.birth_year}</p>
            </section>
            <hr></hr>
            <section id="planets">
                <h2>Planets Featured</h2>
                <ListOfPlanets data={props.planets}/>
            </section>
            <hr></hr>
            <section id="films">
                <h2>Characters Featured</h2>
                <ListOfCharacters data={props.chars}/>
            </section>
        </>
    );
}