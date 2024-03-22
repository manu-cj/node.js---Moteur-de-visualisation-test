const express = require("express");
const app = express();


//Définition du monteur d'affichage
app.set('view engine', 'ejs');
app.set('views', 'src');


const hourConnect = Date().toString();
    const notes = [{titre: 'creation contenue', desc: 'avancer dans le cours'},
    {titre: 'node.js', desc: 'avancer vers le sql'},]

app.get('/', (req, res) => {
    
    res.status(200).render('index', {hourConnect, notes});
})

app.get('/about', (req, res) => {
    res.status(200).render('about', {hourConnect, notes});
})

app.use((req, res) => {
    res.status(404).render('404', {hourConnect, notes});
})

app.listen(8000);
console.log("Attente des requêtes sur le port 8000");