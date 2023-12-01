const mongoose = require('mongoose');
const Schema = mongoose.Schema, ObjectId = Schema.ObjectId;
// const {ObjectId} = require('mongodb')

var dishSchema = new Schema({
    restraurant_id : {
        type : ObjectId,
        required : true
    },
    dish_name : {
        type : String,
        requried : true
    },
    description : {
        type : String,
        requried : true
    },
    photo : {
        type : String,
        requried : true
    },
    price : {
        type : String,
        requried : true
    },
    dish_type : {
        type : String,
        requried : true
    },
    dish_ingredients : {
        type : String,
        requried : true
    },
},
{
    versionKey : false
});

const dishModel = mongoose.model('dish', dishSchema);
module.exports = dishModel;