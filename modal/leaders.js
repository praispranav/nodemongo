const mongoose = require('mongoose')
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const LeaderSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique:true
    },
    image:{
        type: String,
        required:true
    },
    price:{
        type: Currency,
        required:true
    },
    description:{
        type: String,
        required: true
    },
    featured:{
        type: Boolean,
        required:true
    }
},{
    timestamps: true
})

var Leader = mongoose.model('Leader', LeaderSchema);
module.exports = Leader;