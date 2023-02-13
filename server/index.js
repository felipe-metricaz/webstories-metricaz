const express = require("express");
var bodyParser = require('body-parser');
const app = express();
const multer  = require('multer');
const fs = require("fs");
const path = require("path");

// setup multer for file upload
var storage = multer.diskStorage(
    {
        destination: './uploads',
        filename: function (req, file, cb ) {
            cb( null, file.originalname);
        }
    }
);

const upload = multer({ storage: storage } )

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// serving front end build files
app.use(express.static(__dirname + "/../uploads"));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});

// route for file upload
app.get("/img/:img", (req, res) => {
    if(!req.params.img){
        res.writeHead(404, {
                "Content-Type": "text/plain" });
            res.end("404 params Not Found");
            return;
    }
    var imgName = req.params.img;
    var filePath ='uploads/' + imgName;

    fs.exists(filePath, function (exists) {
         if (!exists) {
            res.writeHead(404, {
                "Content-Type": "text/plain" });

            res.end("404 Not Found" + filePath);
            return;
        }
        var ext = path.extname(imgName);
        var contentType = "text/plain";
        if (ext === ".png") {
            contentType = "image/png";
        }
        if (ext === ".jpg") {
            contentType = "image/jpg";
        }
        res.writeHead(200, {
            "Content-Type": contentType });
 
        fs.readFile(filePath,
            function (err, content) {
                res.end(content);
        });
    });
});
app.post("/uploadimage", upload.single('myFile'), (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log(req.file.originalname + " file successfully uploaded !!");
    res.sendStatus(200);
});
app.post("/savejson", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    var fileName = req.body.filename;
    var json = req.body.json;
    fs.writeFile('base/'+fileName+'.json', json, function (err) {
        if (err){
            res.sendStatus(500);
        };
        res.sendStatus(200);
    });
});
app.get("/getwebstores/:id", (req, res) => {
    if(!req.params.id){
        res.writeHead(404, {
                "Content-Type": "text/plain" });
        res.end("404 params Not Found");
        return;
    }
    var jsonName = req.params.id;
    var filePath ='base/' + jsonName+'.json';
    fs.exists(filePath, function (exists) {
         if (!exists) {
            res.json({});
            return;
        }
        var contentType = "application/json";
        res.writeHead(200, {
            "Content-Type": contentType });
 
        fs.readFile(filePath,
            function (err, content) {
                res.end(content);
        });
    });
});
app.get("/getclientes", (req, res) => {
    fs.exists('clientes.json', function (exists) {
         if (!exists) {
            res.json({});
            return;
        }
        var contentType = "application/json";
        res.writeHead(200, {
            "Content-Type": contentType });
 
        fs.readFile('clientes.json',
            function (err, content) {
                res.end(content);
        });
    });
});
app.post("/saveclientes", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var clientes = req.body.clientes;
    if(!clientes){
        res.sendStatus(500);
    }
    fs.writeFile('clientes.json', clientes, function (err) {
        if (err){
            res.sendStatus(500);
        };
        res.sendStatus(200);
    });
});

app.listen(3001, () => console.log("Listening on port 3001"));