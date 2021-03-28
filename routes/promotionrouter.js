const express= require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const proMotions = require("../modal/promotions")

const proMotionsRouter = express.Router();
proMotionsRouter.use(bodyParser.json());

proMotionsRouter.route('/')
.get( (req,res,next) => {
    proMotions.find({}).then((proM)=>{
        res.statusCode = 200;
        res.setHeader('ContentType','application/json');
        res.json(proM)
    },((err)=> next(err)))
    .catch((err)=> next(err))
})
.post((req,res,next) =>{
    proMotions.create(req.body)
    .then((proM)=> 
    {
        console.log('proM Created',proM);
        res.statusCode = 200;
        res.setHeader('ContentType','application/json');
        res.json(proM)
    },((err)=> next(err)))
    .catch((err)=>{console.log("data was Not added",err)})
})
.put((req,res,next) =>{
    res.statusCode = 403;
    res.end("<h1> PUT operation is not supported on /proMotion </h1>")
})
.delete((req,res,next)=>{
    proMotion.remove({})
        .then((resp)=>{
            console.log("all items deleted");
            res.statusCode = 200;
            res.setHeader('ContentType','application/json');
            res.json(resp)
        },(err)=> next(err))
        .catch((err)=> next(err))
});


proMotionsRouter.route('/:promoId')
.get( (req,res,next) => {
    proMotions.findById(req.params.promoId)
    .then((dish)=>{
        res.statusCode = 200;
        res.setHeader('ContentType','application/json');
        res.json(dish)
    },((err)=> next(err)))
    .catch((err)=> next(err))
})
.post((req,res,next) =>{
    res.statusCode = 403;
    res.end("<h1> Post operation is not supported on /proMotions </h1>"+req.params.promoId)
})
.put((req,res,next) =>{
    proMotions.findByIdAndUpdate(req.params.promoId,{
        $set: req.body
    },{new: true})
    .then((dish)=>{
        res.statusCode = 200;
        res.setHeader('ContentType','application/json');
        res.json(dish);
    },(err)=> next(err))
    .catch((err)=>next(err))
})
.delete((req,res,next)=>{
    proMotions.findByIdAndRemove(req.params.promoId)
    .then((resp)=>{
        res.statusCode = 200
        res.setHeader = ('ContentType','application/json')
        res.json(resp)
    },(err)=> next(err))
    .catch((err)=> next(err))
});

module.exports = proMotionsRouter;