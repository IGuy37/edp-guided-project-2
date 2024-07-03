import React, {useState, useEffect} from "react";
import './site.css'
import ListOfCharacters from "./components/ListOfCharacters";
import Character from "./components/Character";
import Film from "./components/Film";
import Planet from "./components/Planet";

import {
  BrowserRouter as Router,
  Route,
  Routes
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
      try{
        if(currentCharacter.reloaded) {
          const characterId = currentCharacter.id;
          if(!characterId) return; //quit if no char id in URL
          const responseCharacter = await fetch(`${import.meta.env.VITE_API_URL}/characters/${characterId}`);
          if (!responseCharacter.ok) {
          throw new Error('Character could not be fetched!');
          }
          const json_responseCharacter = await responseCharacter.json();
          setCurrentCharacter(json_responseCharacter[0]);
        }
        const responseFilms = await fetch(`${import.meta.env.VITE_API_URL}/characters/${currentCharacter.id}/films`);
        if (!responseFilms.ok) {
          throw new Error('Films could not be fetched!');
        }
        const json_responseFilms = await responseFilms.json();
        //console.log(json_responseFilms);
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
      //console.log({params})
      if(currentPlanet.reloaded) {
        
        const planetId = currentPlanet.id;
        if(!planetId) return; //quit if no planet id in URL
        const responsePlanet = await fetch(`${import.meta.env.VITE_API_URL}/planets/${planetId}`);
        if (!responsePlanet.ok) {
          throw new Error('Planet could not be fetched!');
        }
        const json_responsePlanet = await responsePlanet.json();
        //console.log({json_responsePlanet});
        setCurrentPlanet(json_responsePlanet[0]);
        //console.log(currentPlanet);
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
      
      try {
        if(currentFilm.reloaded) {
          console.log("Hello!");
          const filmId = currentFilm.id;
          const responseFilm= await fetch(`${import.meta.env.VITE_API_URL}/films/${filmId}`);
          if (!responseFilm.ok) {
            throw new Error('Film could not be fetched!');
          }
          const json_responseFilm = await responseFilm.json();
          
          setCurrentFilm(json_responseFilm[0]);
        } 
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
        <Route path="/" element={
          <section id="characters">
            <ListOfCharacters data={characters} updateChar={setCurrentCharacter}/>
          </section> }/>
        <Route path="/characters/:id" element={<Character 
                                                  data={currentCharacter} 
                                                  films={films}
                                                  planets={planets}
                                                  updateChar={setCurrentCharacter} 
                                                  updateFilm={setCurrentFilm} 
                                                  updatePlanet={setCurrentPlanet}/>} />
        <Route path="/planets/:id" element={<Planet 
                                                  data={currentPlanet}
                                                  chars={characters} 
                                                  films={films}
                                                  updateChar={setCurrentCharacter} 
                                                  updateFilm={setCurrentFilm}
                                                  updatePlanet={setCurrentPlanet}/>} />
        <Route path="/films/:id" element={<Film 
                                                  data={currentFilm}
                                                  chars={characters}
                                                  planets = {planets} 
                                                  updateChar={setCurrentCharacter}
                                                  updateFilm={setCurrentFilm} 
                                                  updatePlanet={setCurrentPlanet}/>} />
      </Routes>
    </Router>
  )
}