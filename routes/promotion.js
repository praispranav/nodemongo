const express= require('express');
const bodyParser = require('body-parser');

const proMotion = express.Router();
proMotion.use(bodyParser.json());

proMotion.route('/')
.get( (req,res,next) => {
    res.end('WIll send all proMotion to youto You')
})
.post((req,res,next) =>{
    res.statusCode = 403;
    res.end('Will Update the dish:' +req.body.name+'with details '+ req.body.description)
})
.put((req,res,next) =>{
    res.write("<h1>Updating the dish....(Put) </h1>"+req.params.proMotion)
    res.end("<h1> Put operation is not supported on /proMotion </h1>"+req.params.proMotion)
})
.delete((req,res,next)=>{
    res.end("<h1>Delect Is Not Supported...</h1>"+req.params.proMotion)
});

proMotion.route('/:proMotion')
.get( (req,res,next) => {
    res.end('WIll send proMotion to you having id : '+ req.params.proMotion +"to You")
})
.post((req,res,next) =>{
    res.statusCode = 403;
    res.end("<h1> Post operation is Not supported </h1>"+req.params.proMotion)
})
.put((req,res,next) =>{
    res.write("<h1>Updating the proMotion....(Put) </h1>"+req.params.proMotion)
    res.end('Will Update the proMotion:' +req.body.name+'with details '+ req.body.description)
})
.delete((req,res,next)=>{
    res.end("<h1>Delecting details of the proMotions...</h1>"+req.params.proMotion)
});

module.exports = proMotion;