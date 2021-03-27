const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();
dishRouter.use(bodyParser.json())

dishRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get( (req,res,next) => {
    res.end('WIll send all dishes to you')
})
.post((req,res,next) =>{
    res.end('Will add the dish:' + req.body.name + 'with details:' + req.body.description)
})
.put((req,res,next) =>{
    res.statusCode = 403;
    res.end("<h1> PUT operation is not supported on /dishes </h1>")
})
.delete((req,res,next)=>{
    res.end("<h1>Delecting all the dishes...</h1>")
});


dishRouter.route('/:dishId')
.get( (req,res,next) => {
    res.end('WIll send all dishes to you'+ req.params.dishId +"to You")
})
.post((req,res,next) =>{
    res.statusCode = 403;
    res.end("<h1> Post operation is not supported on /dishes </h1>"+req.params.dishId)
})
.put((req,res,next) =>{
    res.write("<h1>Updating the dish....(Put) </h1>"+req.params.dishId)
    res.end('Will Update the dish:' +req.body.name+'with details '+ req.body.description)
})
.delete((req,res,next)=>{
    res.end("<h1>Delecting details of the dishs...</h1>"+req.params.dishId)
});


module.exports = dishRouter;