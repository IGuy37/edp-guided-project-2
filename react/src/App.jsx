import React, {useState, useEffect} from "react";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ListOfCharacters from "./components/ListOfCharacters";
import Character from "./components/Character";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams
} from "react-router-dom";


export default function App() {
  const [characters, setCharacters] = useState([]);
  const [currentCharacter, setCurrentCharacter] = useState({});

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
        console.error('Error fetching socks:', error);
      }
    };

    fetchData();
  }, []);

  const fetchCharacter = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/characters/id`);
      if (!response.ok) {
        throw new Error('Data could not be fetched!');
      }
      const json_response = await response.json();
      setCharacters(json_response);
    } catch (error) {
      console.error('Error fetching socks:', error);
    }
  }


  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListOfCharacters data={characters} updateChar={setCurrentCharacter}/> }/>
        <Route path="/characters/:id" element={<Character data={currentCharacter}/>} />
      </Routes>
    </Router>
  )
}