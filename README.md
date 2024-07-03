# Travelers EDP Guided Project #2
In this Guided Project, we took a previous project written in vanilla JS, CSS, and HTML and converted it to use the MERN stack (MongoDB, Express, Node, and React). We developed our own Star Wars API (SWAPI) based on an existing SWAPI (https://github.com/olaekdahl/swapi) and created a React frontend to allow users to browse the through the API.

## Learning Goals
By completing this project we:
- Imported JSON data from the existing SWAPI into MongoDB
- Created a Node+Express server to serve the data from the SWAPI
- Created a React frontend to show the data to the user
- Used React Router to allow users to learn more about a particular film, character, or planet in the Star Wars Universe 

## How to Run
Clone the code from this repository. Ensure you have NPM and MongoDB installed, and MongoDB is running. Also, clone the following GitHub repository (https://github.com/olaekdahl/swapi) into the root of your C drive (or edit `JSON_DIR` in `mongoimport.sh` to point to where you cloned your repository). Run the following in the root of the project:

```bash
chmod +x mongoimport.sh
./mongoimport.sh
cd server
npm install
npm run start
```
In a separate terminal starting in the root directory, run:

```bash
cd react
npm install
npm run dev
```
Note that `npm install` is only necessary the first time as it initializes dependencies.