
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
//file system to read config file
const fs = require('fs');
//body parser
// const multer = require('multer');
// const upload = multer();
const define = require('./define');

//add cors modules to app
app.use(cors());
//add json modules to app
app.use(express.json());
//add using static file modules to app
app.use(express.static("build"));
//for parse x-www-form-unlencoded
// app.use(express.urlencoded({ extended: true }));
//for parsing form data
// app.use(upload.array());

//make database connection, assign db
const db = getConnection();

function getConnection() {
    try {
        const fileData = fs.readFileSync('dbConfig.json');
        // console.log(fileData)
        const config = JSON.parse(fileData);
        // console.log(config);
        const connection = mysql.createConnection({
            user: config.user,
            host: config.host,
            password: config.password,
            database: config.database
        });
        return connection;
    } catch (err) {
        console.error(err);
        return;
    }
}

//set listening port
app.listen(define.PORT, () => {
    console.log("Hello Server, port is "+define.PORT);
});

//set index file as static built react file 
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});


//make router, req handlers
app.post('/urls', (req, res) => {
    // console.log(req);
    console.log(req.body);
    const userID = req.body.userID;
    const url = req.body.url;
    const regdate = utils.getDatetime();

    //check
    console.log("post url, time: " + regdate);

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

app.post('/getChromeEx', (req, res) => {
    const userID = 1;
    const url = req.body.url;
    // const url = req.query.url
    const regdate = utils.getDatetime();

    //check
    console.log("getChromeEx post url, time: " + regdate);

    db.query(
        'INSERT INTO urls (user_id, url, regdate) VALUES (?,?,?)',
        [userID, url, regdate],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});
// app.get('/getChromeEx', (req, res) => {
    
//     // const userID = req.body.userID;
//     // todo: 쿠키값으로 사용자 확인해야함
//     const userID = 1;
//     // const url = req.body.url;
//     const url = req.query.url
//     const regdate = utils.getDatetime();

//     //check
//     console.log("getChromeEx post url, time: " + regdate);

//     db.query(
//         'INSERT INTO urls (user_id, url, regdate) VALUES (?,?,?)',
//         [userID, url, regdate],
//         (err, result) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 res.send(result);
//             }
//         }
//     );
// });

app.get("/urls", (req, res) => {
    db.query("SELECT * FROM urls WHERE deldate IS NULL", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.put("/employees", (req, res) => {
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

app.delete("/urls/:url_id", (req, res) => {
    const url_id = req.params.url_id;
    const deldate = utils.getDatetime();

    db.query("UPDATE urls SET deldate = ? WHERE url_id = ?", [deldate, url_id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});