
global.base_dir = __dirname;
global.abs_path = function (path) {
    return base_dir + path;
}
global.include = function (file) {
    return require(abs_path('/' + file));
}

const define = include('define/define');
//import express
const express = require('express');
//assign express to app
const app = express();
//import mysql
const mysql = require('mysql');
//import cors
const cors = require('cors');
//import http
const http = require('http');
//import https
const https = require('https');

//import path == provides utilities for working with file and directory paths
const path = require('path');
//import util js
const utils = require('./utils');
//file system to read config file
const fs = require('fs');
//body parser
// const multer = require('multer');
// const upload = multer();


const options = idDevMode() ? null : { // letsencrypt로 받은 인증서 경로를 입력
    ca: fs.readFileSync(define.ca),
    key: fs.readFileSync(define.key),
    cert: fs.readFileSync(define.cert)
};

//add cors modules to app
app.use(cors());

const helmet = require("helmet");
app.use(helmet());
app.disable("x-powered-by");
app.use(helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
        "img-src": ["*"]
    }
}));

//add json modules to app
app.use(express.json());
//add using static file modules to app
app.use(express.static("build"));
//for parse x-www-form-unlencoded
// app.use(express.urlencoded({ extended: true }));
//for parsing form data
// app.use(upload.array());

function getServerMode() {
    const argsv = process.argv.slice();
    let mode;
    if (argsv.length > 2) {
        console.log(process.argv);
        mode = argsv[2];
    } else {
        mode = "prod";
    }
    return mode;
}
function idDevMode() {
    const argsv = process.argv.slice();
    if (argsv.length > 2) {
        if (argsv[2] === "dev") {
            return true;
        }
    }
    return false;
}

let HOST;
let PORT;

function getFileData() {
    const serverMode = getServerMode();
    let configFile;

    if (serverMode === "dev") {
        configFile = "./define/dbConfig_dev.json";
        HOST = define.URLDEV;
        PORT = define.PORTDEV;
    } else {
        configFile = "./define/dbConfig.json";
        PORT = define.PORT;
    }
    return fs.readFileSync(configFile);
}

//make database connection, assign db
const db = getConnection();

function getConnection() {
    try {
        // todo 동기화 처리
        console.log("# getConnection()====" + Date());
        const fileData = getFileData();
        // console.log(fileData)
        const config = JSON.parse(fileData);
        // console.log(config);

        const connection = mysql.createConnection({
            user: config.user,
            host: config.host,
            password: config.password,
            database: config.database,
            charset: "utf8mb4"
        });
        return connection;
    } catch (err) {
        console.error(err);
        return;
    }
}

//set listening port
http.createServer(app).listen(PORT, () => {
    console.log("Hello Server, port is " + PORT);
    // let v1 = process.argv.slice(2);

    console.log("args len= " + process.argv.slice().length);
    console.log("args = " + process.argv.slice());
});

https.createServer(options, app).listen(443, () => {
    if (options == null){
        return;
    }
    console.log("Hello https Server, port is " + PORT);
    // let v1 = process.argv.slice(2);
});
// http.createServer(app).listen(3000);
// https.createServer(options, app).listen(443);

//set index file as static built react file 
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.post('/login', (req, res) => {
    console.log(req.body);
    console.log(utils.getDatetime());
    res.send({
        token: 'test123'
    });
});

//make router, req handlers
app.post('/urls', (req, res) => {
    // console.log(req);
    // console.log(req.body);
    // 사용자는 쿠키로 확인
    // const userID = req.body.userID;
    const userID = 1;   // dev
    const url = req.body.url;
    const title = req.body.title;
    const iconImg = req.body.iconImg;
    const regdate = utils.getDatetime();

    //check
    console.log("post url, time: " + regdate);

    db.query(
        'INSERT INTO urls (user_id, url, title, icon_img, regdate) VALUES (?,?,?,?,?)',
        [userID, url, title, iconImg, regdate],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.status(200);
                res.statusMessage = "value inserted";
                res.send();
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

app.get("/urls/:page", (req, res) => {
    //TODO: add search condition(desc, folder ...etc)
    let result = new Object;
    const page = req.params.page;
    const limit = page * 15;

    console.log("get(/urls/:page:)" + utils.getDatetime());
    // for null check
    // db.query("SELECT count(*) AS count FROM urls WHERE deldate IS NULL AND url_id=0", (err, rows, fields) => {
    db.query("SELECT count(*) AS count FROM urls WHERE deldate IS NULL", (err, rows, fields) => {
        if (err) {
            console.log(err)
        } else {
            // console.log("@@##", rows);
            // console.log("@@##", fields);
            // console.log("@@##", rows);
            result.count = rows[0].count;
        }
    })
    // LIMIT += 15개씩 더해서 셀렉트 개수 추가
    //for null check
    // db.query("SELECT * FROM urls WHERE deldate IS NULL AND url_id=0 ORDER BY regdate DESC LIMIT ?", limit, (err, rows, fields) => {
    db.query("SELECT * FROM urls WHERE deldate IS NULL ORDER BY regdate DESC LIMIT ?", limit, (err, rows, fields) => {
        if (err) {
            console.log(err)
        } else {
            // console.log("rows = ", rows);
            // console.log("fields = ", fields);
            result.rows = rows;
            res.send(result)
        }
    });
});

// app.put("/employees", (req, res) => {
//     const id = req.body.id;
//     const wage = req.body.wage;
//     db.query("UPDATE employees SET wage = ? WHERE id = ?",
//         [wage, id], (err, result) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 res.send(result);
//             }
//         });
// });

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