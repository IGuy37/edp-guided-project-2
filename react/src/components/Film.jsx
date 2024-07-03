import React, {useEffect} from "react";
import "../site.css"
import ListOfPlanets from "./ListOfPlanets";
import ListOfCharacters from "./ListOfCharacters";
import {useParams} from "react-router-dom";

export default function Film(props){
    const film = props.data;
    const params = useParams();
    useEffect(() => {
        if(!film.id){
            props.updateFilm({reloaded: true, id: params.id})
        }
    }, [])
    
    if(!film.id){
        props.updateFilm({test: true, id: params.id})
    }
    console.log(props);
    return(
        <>
            <h1>{film.title}</h1>
            <section id="generalInfo">
                <p>Title: {film.title}</p>
                <p>Director: {film.director}</p>
                <p>Producer: {film.producer}</p>
                <p>Release Date: {film.release_date}</p>
            </section>
            <hr></hr>
            <section id="planets">
                <h2>Planets Featured</h2>
                <ListOfPlanets data={props.planets} updatePlanet={props.updatePlanet}/>
            </section>
            <hr></hr>
            <section id="films">
                <h2>Characters Featured</h2>
                <ListOfCharacters data={props.chars} updateChar={props.updateChar}/>
            </section>
        </>
    );
}