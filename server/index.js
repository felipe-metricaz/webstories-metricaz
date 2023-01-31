const express = require("express");
const app = express();
const multer  = require('multer');
const fs = require("fs");
const path = require("path");

// setup multer for file upload
var storage = multer.diskStorage(
    {
        destination: './public/uploads',
        filename: function (req, file, cb ) {
            cb( null, file.originalname);
        }
    }
);

const upload = multer({ storage: storage } )

app.use(express.json());
// serving front end build files
app.use(express.static(__dirname + "/../public/uploads"));

// route for file upload
app.get("/img/:img", (req, res) => {
    if(!req.params.img){
        res.writeHead(404, {
                "Content-Type": "text/plain" });
            res.end("404 params Not Found");
            return;
    }
    var imgName = req.params.img;
    var filePath ='public/uploads/' + imgName;

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
app.post("/api/uploadfile", upload.single('myFile'), (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log(req.file.originalname + " file successfully uploaded !!");
    res.sendStatus(200);
});

app.listen(3001, () => console.log("Listening on port 3001"));