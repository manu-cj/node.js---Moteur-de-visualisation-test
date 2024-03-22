const express = require("express");
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const connection = require("express-myconnection");

const optionBd = {
    host : 'localhost',
    user: 'root',
    password: '',
    database: 'node'
};

const app = express();

//Définition du middleware pour connexion avec la bdd
app.use(myConnection(mysql, optionBd, 'single'));

//Définition du monteur d'affichage
app.set('view engine', 'ejs');
app.set('views', 'src');


app.get('/', (req, res) => {
    req.getConnection((error, connection) => {
        if (error) {
            console.log(error);
        } else {
            connection.query('SELECT * FROM list', [], (error, resultat) => {
                if (error) {
                    console.log(error);
                } else {
                    res.status(200).render('index', { resultat });
                }
            });
        }
    });
});

app.get('/about', (req, res) => {
    res.status(200).render('about', {hourConnect, notes});
})

app.use((req, res) => {
    res.status(404).render('404', {hourConnect, notes});
})

app.listen(8000);
console.log("Attente des requêtes sur le port 8000");