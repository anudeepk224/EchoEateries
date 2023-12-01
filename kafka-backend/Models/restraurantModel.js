const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var restraurantSchema = new Schema({
    owner_name : {
        type : String,
        required : false
    },
    restraurant_name : {
        type : String,
        required : false
    },
    email : {
        type : String,
        required : false
    },
    password : {
        type : String,
        required : false
    },
    zip_code : {
        type : Number,
        required : false
    },
    location : {
        type : String,
        required : false
    },
    description : {
        type : String,
        required : false
    },
    phone_number : {
        type : String,
        required : false
    },
    weekdays_timings : {
        type : String,
        required : false
    },
    photo : {
        type : String,
        required : false
    },
    weekend_timings : {
        type : String,
        required : false
    },
    cusine : {
        type : String,
        required : false
    },
    delivery : {
        type : String,
        required : false
    },
    takeout : {
        type : String,
        required : false
    },
    reviews : {
        type : String,
        required : false
    },
    dine_in : {
        type : String,
        required : false
    },
    reviews_count : {
        type : Number,
        required : false
    },
    neighborhood : {
        type : String,
        required : false
    },
    city : {
        type : String,
        required : false
    },
    state : {
        type : String,
        required : false
    },
    coords : {
        type : Object,
        required : false
    }
}, {
    versionKey : false
})

const restraurantModel = mongoose.model('restraurant', restraurantSchema);
module.exports = restraurantModel;