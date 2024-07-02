import express from "express";

const PORT = 3001;
const app = express();

app.get("/api/planets", async (req, res) => {
    console.log("Server is running!");
    res.json({hello: "Hello Worlds!"})
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});