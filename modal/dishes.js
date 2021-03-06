const mongoose = require('mongoose');
const Schema  = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const commentSchema = new Schema({
    rating:{
        type: Number,
        min:1,
        max:5,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    }
},{
    timestamps: true
}
)

const dishSchema = new Schema({
    name:{
        type: String,
        unique:true,
        required:true
    },
    description:{
        type: String,
        required: true
    },
    images:{
        type: String,
        required:true
    },
    category:{
        type: String,
        required: true
    },
    label:
    {
        type:String,
        require:true
    },
    price:{
        type: Currency,
        min:0,
        required:true
    },
    featured:{
        type: Boolean,
        default:false},
    comments: [commentSchema]
},{
 timestamps: true   
}
)
var Dishes = mongoose.model('Dish',dishSchema)
module.exports  = Dishes;