import express from "express";
import { promises as fs } from 'fs';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionNames = process.env.MONGO_DB_COLLECTION.split(',');

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(cors());

app.get('/api/characters', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionNames[0]);
        console.log(collectionNames)
        const characters = await collection.find({}).toArray();
        res.json(characters);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... Error fetching characters");
    }
});

app.get('/api/films', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionNames[1]);
        console.log(collectionNames)
        const films = await collection.find({}).toArray();
        res.json(films);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... Error fetching films");
    }
});


app.get("/api/planets", async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionNames[2]);
        console.log(collectionNames)
        const planets = await collection.find({}).toArray();
        res.json(planets);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Hmmm, something smells... Error fetching planets");
    }
});

app.get("/api/characters/:id", async (req, res) => {
    try {
        const characterId = +req.params.id;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionNames[0]);
        const characters = await collection.find({'id': characterId}).toArray();
        res.json(characters);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error fetching characters/id');
    }
});

app.get("/api/films/:id", async (req, res) => {
    try {
        const filmId = +req.params.id;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionNames[1]);
        const films = await collection.find({'id': filmId}).toArray();
        res.json(films);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error fetching film/id');
    }
});

app.get("/api/planets/:id", async (req, res) => {
    try{
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collectionNo = 2;
        const collection = db.collection(collectionNames[collectionNo]);
        const planetId = +req.params.id;
        const planet = await collection.find({id: planetId}).toArray();
        client.close();
        res.json(planet);
    }
    catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error fetching planet');
    }
    
});

app.get("/api/films/:id/characters", async (req, res) => {
    try{
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collectionFilmToCharNo = 3;
        const collectionFilmToChar = db.collection(collectionNames[collectionFilmToCharNo]);
        const filmId = +req.params.id;
        let characterIds = await (collectionFilmToChar.find({"film_id": filmId}).toArray())
        characterIds = characterIds.map((obj) => obj.character_id);
        if(characterIds.length === 0){
            client.close();
            res.status(404).send("This is not the film ID you're looking for...");
            return;
        }
        console.log(characterIds);
        const collectionCharNo = 0;
        const collectionChar = db.collection(collectionNames[collectionCharNo]);
        let chars = [];
        for(const charId of characterIds){
            const char = await collectionChar.find({id: charId}).toArray();
            console.log(char);
            chars = chars.concat(char);
        }
        client.close();
        res.json(chars);
    }
    catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error fetching characters');
    }
    
});

app.get("/api/films/:id/planets", async (req, res) => {
    try{
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collectionFilmToPlanetNo = 4;
        const collectionFilmToPlanet = db.collection(collectionNames[collectionFilmToPlanetNo]);
        const filmId = +req.params.id;
        let planetIds = await (collectionFilmToPlanet.find({"film_id": filmId}).toArray())
        planetIds = planetIds.map((obj) => obj.planet_id);
        if(planetIds.length === 0){
            client.close();
            res.status(404).send("This is not the film ID you're looking for...");
            return;
        }
        console.log(planetIds);
        const collectionPlanetNo = 2;
        const collectionPlanet = db.collection(collectionNames[collectionPlanetNo]);
        let planets = [];
        for(const planetId of planetIds){
            const planet = await collectionPlanet.find({id: planetId}).toArray();
            console.log(planet);
            planets = planets.concat(planet);
        }
        client.close();
        res.json(planets);
    }
    catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error fetching planets');
    }
    
});

app.get("/api/characters/:id/films", async (req, res) => {
    try{
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collectionFilmToCharNo = 3;
        const collectionFilmToChar = db.collection(collectionNames[collectionFilmToCharNo]);
        const charId = +req.params.id;
        let filmIds = await (collectionFilmToChar.find({"character_id": charId}).toArray())
        filmIds = filmIds.map((obj) => obj.film_id);
        if(filmIds.length === 0){
            client.close();
            res.status(404).send("This is not the character ID you're looking for...");
            return;
        }
        console.log(filmIds);
        const collectionFilmNo = 1;
        const collectionFilm = db.collection(collectionNames[collectionFilmNo]);
        let films = [];
        for(const filmId of filmIds){
            const film = await collectionFilm.find({id: filmId}).toArray();
            console.log(film);
            films = films.concat(film);
        }
        client.close();
        res.json(films);
    }
    catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error fetching films');
    }
    
});

app.get("/api/planets/:id/films", async (req, res) => {
    try{
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collectionPlanetToFilmNo = 4;
        const collectionPlanetToFilm = db.collection(collectionNames[collectionPlanetToFilmNo]);
        const planetId = +req.params.id;
        let filmIds = await (collectionPlanetToFilm.find({"planet_id": planetId}).toArray())
        filmIds = filmIds.map((obj) => obj.film_id);
        if(filmIds.length === 0){
            client.close();
            res.status(404).send("This is not the planet ID you're looking for...");
            return;
        }
        console.log(filmIds);
        const collectionFilmNo = 1;
        const collectionFilm = db.collection(collectionNames[collectionFilmNo]);
        let films = [];
        for(const filmId of filmIds){
            const film = await collectionFilm.find({id: filmId}).toArray();
            console.log(film);
            films = films.concat(film);
        }
        client.close();
        res.json(films);
    }
    catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error fetching films');
    }
    
});

app.get("/api/planets/:id/characters", async (req, res) => {
    try{
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collectionCharacterNo = 0;
        const collectionCharacter = db.collection(collectionNames[collectionCharacterNo]);
        const planetId = +req.params.id;
        const characters = await (collectionCharacter.find({"homeworld": planetId}).toArray())
        if(characters.length === 0){
            client.close();
            res.status(404).send("This is not the planet ID you're looking for...");
            return;
        }
        client.close();
        res.json(characters);
    }
    catch (err) {
        console.error('Error:', err);
        res.status(500).send('Hmm, something doesn\'t smell right... Error fetching characters');
    }
    
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});