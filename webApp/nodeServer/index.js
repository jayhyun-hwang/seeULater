
//import express
const express = require('express');
//assign express to app
const app = express();
//import mysql
const mysql = require('mysql');
//import cors
const cors = require('cors');
//import path == provides utilities for working with file and directory paths
const path = require('path');
//import util js
const utils = require('./utils');

//add cors modules to app
app.use(cors());
//add json modules to app
app.use(express.json());
//add using static file modules to app
app.use(express.static("build"));

//make database connection, assign db
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'wogus0501',
    database: 'seeulater'
});

//set listening port
app.listen(3001, () => {
    console.log("Hello Server, port is 3001");
});

//set index file as static built react file 
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});


//make router, req handlers
app.post('/url', (req, res) => {
    console.log(req.body);
    const userID = req.body.userID;
    const url = req.body.url;
    const regdate = utils.getDatetime();

    //check
    console.log("post url, time: "+regdate);

    db.query(
        'INSERT INTO urls (user_id, url, regdate) VALUES (?,?,?)',
        [userID, url, regdate],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values Inserted");
            }
        }
    );
});

app.get("/employees", (req, res) => {
    db.query("SELECT * FROM employees", (err, result) => {
        if (err) {
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

app.put("/employees", (req, res)=> {
    const id = req.body.id;
    const wage = req.body.wage;

    db.query("UPDATE employees SET wage = ? WHERE id = ?",
    [wage, id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.delete("/employees/:id", (req, res) => {
    const id = req.params.id;
    db.query("delete from employees where id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});