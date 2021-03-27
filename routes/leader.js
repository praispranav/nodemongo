const express = require('express');
const bodyParser = require('body-parser');

const leader = express.Router();
leader.use(bodyParser.json())

leader.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get( (req,res,next) => {
    res.end('WIll send all leader to you')
})
.post((req,res,next) =>{
    res.end('Will add the leader:' + req.body.name + 'with details:' + req.body.description)
})
.put((req,res,next) =>{
    res.statusCode = 403;
    res.end("<h1> PUT operation is not supported on /leader </h1>")
})
.delete((req,res,next)=>{
    res.end("<h1>Delecting all the leader...</h1>")
});


leader.route('/:leader')
.get( (req,res,next) => {
    res.end('WIll send all leader to you'+ req.params.leader +"to You")
})
.post((req,res,next) =>{
    res.statusCode = 403;
    res.end("<h1> Post operation is not supported on /leader </h1>"+req.params.leader)
})
.put((req,res,next) =>{
    res.write("<h1>Updating the Leader....(Put) </h1>"+req.params.leader)
    res.end('Will Update the leader:' +req.body.name+'with details '+ req.body.description)
})
.delete((req,res,next)=>{
    res.end("<h1>Delecting details of the leader...</h1>"+req.params.leader)
});


module.exports = leader;