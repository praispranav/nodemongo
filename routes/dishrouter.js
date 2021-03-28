const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const Dishes = require("../modal/dishes")

const dishRouter = express.Router();
dishRouter.use(bodyParser.json())

dishRouter.route('/')
.get( (req,res,next) => {
    Dishes.find({}).then((dish)=>{
        res.statusCode = 200;
        res.setHeader('ContentType','application/json');
        res.json(dish)
    },((err)=> next(err)))
    .catch((err)=> next(err))
})
.post((req,res,next) =>{
    Dishes.create(req.body)
    .then((dish)=> 
    {
        console.log('Dish Created',dish);
        res.statusCode = 200;
        res.setHeader('ContentType','application/json');
        res.json(dish)
    },((err)=> next(err)))
    .catch((err)=>{console.log("data was Not added",err)})
})
.put((req,res,next) =>{
    res.statusCode = 403;
    res.end("<h1> PUT operation is not supported on /dishes </h1>")
})
.delete((req,res,next)=>{
    Dishes.remove({})
        .then((resp)=>{
            console.log("all items deleted");
            res.statusCode = 200;
            res.setHeader('ContentType','application/json');
            res.json(resp)
        },(err)=> next(err))
        .catch((err)=> next(err))
});


dishRouter.route('/:dishId')
.get( (req,res,next) => {
    Dishes.findById(req.params.dishId)
    .then((dish)=>{
        res.statusCode = 200;
        res.setHeader('ContentType','application/json');
        res.json(dish)
    },((err)=> next(err)))
    .catch((err)=> next(err))
})
.post((req,res,next) =>{
    res.statusCode = 403;
    res.end("<h1> Post operation is not supported on /dishes </h1>"+req.params.dishId)
})
.put((req,res,next) =>{
    Dishes.findByIdAndUpdate(req.params.dishId,{
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
    Dishes.findByIdAndRemove(req.params.dishId)
    .then((resp)=>{
        res.statusCode = 200
        res.setHeader = ('ContentType','application/json')
        res.json(resp)
    },(err)=> next(err))
    .catch((err)=> next(err))
});

dishRouter.route('/:dishId/comments')
.get( (req,res,next) => {
    Dishes.findById(req.params.dishId)
    .then((dish)=>{
        if (dish != null){
            res.statusCode = 200;
            res.setHeader('ContentType','application/json');
            dish.comments.push(req.body);
            dish.save()
            .then((dish)=>{
                res.statusCode = 200;
                res.setHeader('ContentType','application/json');
            },(err)=>next(err));
            res.json(dish.comments)
        }
        else{
            err = new Error('DIsh' +req.params.dishId +'Not Found');
            err.status = 404;
            return next(err);
        }
    },((err)=> next(err)))
    .catch((err)=> next(err))
})
.post((req,res,next) =>{
    Dishes.findById(req.params.dishId)
    .then((dish)=> 
    {
        if (dish != null){
            dish.comments.push(req.body);
            dish.save()
            .then((dish)=>{
                res.statusCode = 200;
                res.setHeader('ContentType','application/json');
                res.json(dish)
            },(err)=>next(err))
        }
        else{
            err = new Error('DIsh' +req.params.dishId +'Not Found');
            err.status = 404;
            return next(err);
        }
    },((err)=> next(err)))
    .catch((err)=>{console.log("data was Not added",err)})
})
.put((req,res,next) =>{
    res.statusCode = 403;
    res.end("<h1> PUT operation is not supported on /dishes </h1>")
})
.delete((req,res,next)=>{
    Dishes.findById(req.params.dishId)
        .then((resp)=>{
            if (dish != null){
                for (var i = (dish.comments.length - 1);i>=0;i--){
                    dish.comments.id(dish.commentw[i]._id).remove()
                    dish.save()
                    .then((dish)=>{
                        res.statusCode = 200;
                        res.setHeader('ContentType','application/json');
                        res.json(dish)
                    },(err)=>next(err))
                
                }
            }
            else{
                err = new Error('DIsh' +req.params.dishId +'Not Found');
                err.status = 404;
                return next(err);
            } 
        },(err)=> next(err))
        .catch((err)=> next(err))
});


dishRouter.route('/:dishId/comments/:commentId')
.get( (req,res,next) => {
    Dishes.findById(req.params.dishId)
    .then((dish)=> 
    {
        if (dish != null && dish.comments.id(req.params.commentId) != null){
            
            
                res.statusCode = 200;
                res.setHeader('ContentType','application/json');
                res.json(dish.comments.id(req.params.commentId))
            
        }
        else if(dish == null) {
            err = new Error('DIsh' +req.params.dishId +'Not Found');
            err.status = 404;
            return next(err);
        }
        else{
            err = new Error('Comment' +req.params.commentId + "donot Exists");
            err.statusCode = 404;
            return next(err)
        }
    },((err)=> next(err)))
    .catch((err)=>{console.log("data was Not added",err)})

})
.post((req,res,next) =>{
    res.statusCode = 403;
    res.end("<h1> Post operation is not supported on /comment  </h1>"+req.params.commentId)
})
.put((req,res,next) =>{
    Dishes.findById(req.params.dishId)
    .then((dish)=> 
    {
        if (dish != null && dish.comments.id(req.params.commentId != null)){
            if (req.body.rating){
                dish.comments.id(req.params.commentId).rating = req.body.rating;
            }
            if (reqq.body.comment){
                dish.comments.id(req.params.commentId).comment  = req.body.comment;
            }
            dish.comments.push(req.body);
            dish.save()
            .then((dish)=>{
                res.statusCode = 200;
                res.setHeader('ContentType','application/json');
                res.json(dish.comments.ir(req.params.commentId))
            },(err)=>next(err))
        }
        else if(dish == null) {
            err = new Error('DIsh' +req.params.dishId +'Not Found');
            err.status = 404;
            return next(err);
        }
        else{
            err = new Error('Comment' +req.params.commentId + "donot Exists");
            err.statusCode = 404;
            return next(err)
        }
    },((err)=> next(err)))
    .catch((err)=>{console.log("data was Not added",err)})
})
.delete((req,res,next)=>{
    Dishes.findById(req.params.dishId)
    .then((resp)=>{
        if (dish != null && dish.comments.id(req.params.commentId) != null){
            
                dish.comments.id(req.params.commentId).remove()
                dish.save()
                .then((dish)=>{
                    res.statusCode = 200;
                    res.setHeader('ContentType','application/json');
                    res.json(dish)
                },(err)=>next(err))
            
            
        }
        else if(dish == null) {
            err = new Error('DIsh' +req.params.dishId +'Not Found');
            err.status = 404;
            return next(err);
        }
        else{
            err = new Error('Comment' +req.params.commentId + "donot Exists");
            err.statusCode = 404;
            return next(err)
        }
    },(err)=> next(err))
    .catch((err)=> next(err)) 
});


module.exports = dishRouter;