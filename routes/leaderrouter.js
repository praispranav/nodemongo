const express= require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const Leader = require("../modal/leaders")

const LeaderRouter = express.Router();
LeaderRouter.use(bodyParser.json());

LeaderRouter.route('/')
.get( (req,res,next) => {
    Leader.find({}).then((lead)=>{
        res.statusCode = 200;
        res.setHeader('ContentType','application/json');
        res.json(lead)
    },((err)=> next(err)))
    .catch((err)=> next(err))
})
.post((req,res,next) =>{
    Leader.create(req.body)
    .then((lead)=> 
    {
        console.log('proM Created',lead);
        res.statusCode = 200;
        res.setHeader('ContentType','application/json');
        res.json(lead)
    },((err)=> next(err)))
    .catch((err)=>{console.log("data was Not added",err)})
})
.put((req,res,next) =>{
    res.statusCode = 403;
    res.end("<h1> PUT operation is not supported on /Leader </h1>")
})
.delete((req,res,next)=>{
    Leader.remove({})
        .then((resp)=>{
            console.log("all items deleted");
            res.statusCode = 200;
            res.setHeader('ContentType','application/json');
            res.json(resp)
        },(err)=> next(err))
        .catch((err)=> next(err))
});


LeaderRouter.route('/:leadId')
.get( (req,res,next) => {
    Leader.findById(req.params.leadId)
    .then((lead)=>{
        res.statusCode = 200;
        res.setHeader('ContentType','application/json');
        res.json(lead)
    },((err)=> next(err)))
    .catch((err)=> next(err))
})
.post((req,res,next) =>{
    res.statusCode = 403;
    res.end("<h1> Post operation is not supported on /Leader </h1>"+req.params.leadId)
})
.put((req,res,next) =>{
    Leader.findByIdAndUpdate(req.params.leadId,{
        $set: req.body
    },{new: true})
    .then((lead)=>{
        res.statusCode = 200;
        res.setHeader('ContentType','application/json');
        res.json(lead);
    },(err)=> next(err))
    .catch((err)=>next(err))
})
.delete((req,res,next)=>{
    Leader.findByIdAndRemove(req.params.leadId)
    .then((resp)=>{
        res.statusCode = 200
        res.setHeader = ('ContentType','application/json')
        res.json(resp)
    },(err)=> next(err))
    .catch((err)=> next(err))
});

module.exports = LeaderRouter;