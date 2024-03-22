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

//Extraction des données du formulaire
app.use(express.urlencoded({extended: false}))

app.post("/notes", (req, res) => {
    let id = req.body.id === "" ? null : req.body.id;
    let titre = req.body.titre;
    let description = req.body.description;

    let reqSql = id === null ? 
    'INSERT INTO list (id, titre, description) VALUES (?, ?, ?)' : 
    "UPDATE list SET titre = ?, description = ? WHERE id = ?";

let data = id == null ? [null, titre, description] : [titre, description, id]

    req.getConnection((error, connection) => {
        if (error) {
            console.log(error);
        } else {
            connection.query(reqSql,
                data,
             (error, resultat) => {
                if (error) {
                    console.log(error);
                } else {
                    res.status(300).redirect('/');
                }
            });
        }
    });
});


app.delete("/notes/:id", (req, res) => {
    let id = req.params.id;
    req.getConnection((error, connection) => {
        if (error) {
            console.log(error);
        }else {
            connection.query("DELETE FROM list WHERE id = ?", [id], (error, resultat) => {
                if (error) {
                    console.log(error);
                }else {
                    res.status(200).json({routeRacine: '/'});
                }
            })
        }
    })
})

app.get('/about', (req, res) => {
    res.status(200).render('about');
})

app.use((req, res) => {
    res.status(404).render('404');
})

app.listen(8000);
console.log("Attente des requêtes sur le port 8000");