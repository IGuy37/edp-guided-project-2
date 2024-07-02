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

app.get("/api/planets", async (req, res) => {
    console.log("Server is running!");
    res.json({hello: "Hello Worlds!"})
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});