import React from "react";
import "../site.css"

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
                <p><span id="homeworld"></span></p>
            </section>
            <hr></hr>
            <section id="films">
                <h2>Films appeared in</h2>
                <ul></ul>
            </section>
        </>
    );
}