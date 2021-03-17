const express = require('express');
const Cors = require('cors');
const bodyParser =require('body-parser');
var path= require('path');

const server = express();

server.use(Cors());


//server.use(Express.static(__dirname))
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

server.use(express.static(path.resolve(__dirname,'build')));
server.get("/", (req, res) => {res.send();
    console.log("Home Page")
});



server.get("/*", (req, res) =>{ 
    res.send()
    //console.log("Home Page")
});
var Port = process.env.PORT


server.listen(Port, ()=>{
    console.log("server is running on", Port);
})