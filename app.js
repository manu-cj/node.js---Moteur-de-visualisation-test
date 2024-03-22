const express = require("express");
const app = express();

app.get('/', (req, res) => {
    res.status(200).sendFile("./Views/index.html", {root: __dirname});
})

app.get('/about', (req, res) => {
    res.status(200).sendFile("./Views/about.html", {root: __dirname});
})

app.use((req, res) => {
    res.status(404).sendFile("./Views/404.html", {root: __dirname});
})

app.listen(8000);
console.log("Attente des requêtes sur le port 8000");