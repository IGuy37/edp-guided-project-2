import React, {useState, useEffect} from "react";
import './site.css'
import ListOfCharacters from "./components/ListOfCharacters";
import Character from "./components/Character";
import Film from "./components/Film";
import Planet from "./components/Planet";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams
} from "react-router-dom";


export default function App() {
  const [characters, setCharacters] = useState([]);
  const [films, setFilms] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [currentCharacter, setCurrentCharacter] = useState({});
  const [currentPlanet, setCurrentPlanet] = useState({});
  const [currentFilm, setCurrentFilm] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/characters`);
        if (!response.ok) {
          throw new Error('Data could not be fetched!');
        }
        const json_response = await response.json();
        setCharacters(json_response);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if(!currentCharacter.id) {
        //TODO: Check if URL has id. If not, don't try to fetch. If so, use that instead and fetch the appropriate character.
        return;
      }
      try {
        const responseFilms = await fetch(`${import.meta.env.VITE_API_URL}/characters/${currentCharacter.id}/films`);
        if (!responseFilms.ok) {
          throw new Error('Films could not be fetched!');
        }
        const json_responseFilms = await responseFilms.json();
        setFilms(json_responseFilms);
        const responsePlanets = await fetch(`${import.meta.env.VITE_API_URL}/planets/${currentCharacter.homeworld}`);
        if (!responsePlanets.ok) {
          throw new Error('Planets could not be fetched!');
        }
        const json_responsePlanets = await responsePlanets.json();
        setPlanets(json_responsePlanets);


      } catch (error) {
        console.error('Error fetching films & planets for character:', error);
      }
    };

    fetchData();
  }, [currentCharacter]);

  useEffect(() => {
    const fetchData = async () => {
      if(!currentPlanet.id) {
        //TODO: Check if URL has id. If not, don't try to fetch. If so, use that instead and fetch the appropriate planet.
        return;
      }
      try {
        const responseCharacters = await fetch(`${import.meta.env.VITE_API_URL}/planets/${currentPlanet.id}/characters`);
        if (!responseCharacters.ok) {
          throw new Error('Characters could not be fetched!');
        }
        const json_responseCharacters = await responseCharacters.json();
        setCharacters(json_responseCharacters);
        const responseFilms = await fetch(`${import.meta.env.VITE_API_URL}/planets/${currentPlanet.id}/films`);
        if (!responseFilms.ok) {
          throw new Error('Films could not be fetched!');
        }
        const json_responseFilms = await responseFilms.json();
        setFilms(json_responseFilms);


      } catch (error) {
        console.error('Error fetching characters & films for planet:', error);
      }
    };

    fetchData();
  }, [currentPlanet]);

  useEffect(() => {
    const fetchData = async () => {
      if(!currentFilm.id) {
        //TODO: Check if URL has id. If not, don't try to fetch. If so, use that instead and fetch the appropriate film.
        return;
      } 
      try {
        const responseCharacters = await fetch(`${import.meta.env.VITE_API_URL}/films/${currentFilm.id}/characters`);
        if (!responseCharacters.ok) {
          throw new Error('Characters could not be fetched!');
        }
        const json_responseCharacters = await responseCharacters.json();
        setCharacters(json_responseCharacters);
        const responsePlanets = await fetch(`${import.meta.env.VITE_API_URL}/films/${currentFilm.id}/planets`);
        if (!responsePlanets.ok) {
          throw new Error('Planets could not be fetched!');
        }
        const json_responsePlanets = await responsePlanets.json();
        setPlanets(json_responsePlanets);


      } catch (error) {
        console.error('Error fetching characters & planets for film:', error);
      }
    };

    fetchData();
  }, [currentFilm]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListOfCharacters data={characters} updateChar={setCurrentCharacter}/> }/>
        <Route path="/characters/:id" element={<Character 
                                                  data={currentCharacter} 
                                                  films={films}
                                                  planets={planets} 
                                                  updateFilm={setCurrentFilm} 
                                                  updatePlanet={setCurrentPlanet}/>} />
        <Route path="/planets/:id" element={<Planet 
                                                  data={currentPlanet}
                                                  chars={characters} 
                                                  films={films}
                                                  updateChar={setCurrentCharacter} 
                                                  updateFilm={setCurrentFilm}/>} />
        <Route path="/films/:id" element={<Film 
                                                  data={currentFilm}
                                                  chars={characters}
                                                  planets = {planets} 
                                                  updateChar={setCurrentCharacter} 
                                                  updatePlanet={setCurrentPlanet}/>} />
      </Routes>
    </Router>
  )
}