const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const {ObjectId} = require('mongodb')

var usersSchema = new Schema({
    first_name : {
        type : String,
        required : true
    },
    last_name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    zip_code : {
        type : Number,
        required : true
    },
    day : {
        type : Number,
        required : false
    },
    month : {
        type : String,
        required : false
    },
    year : {
        type : Number,
        required : false
    },
    user_type : {
        type : String,
        required : false
    },
    phone_number : {
        type : Number,
        required : false
    },
    headline : {
        type : String,
        required : false
    },
    profile_photo : {
        type : String,
        required : false
    },
    yelping_since : {
        type : Date,
        required : false
    },
    total_reviews : {
        type : Number,
        required : false
    },
    nick_name : {
        type : String,
        required : false
    },
    things_i_love : {
        type : String,
        required : false
    },
    blog : {
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
    country : {
        type : String,
        required : false
    },
    favourites : {
        type : String,
        required : false
    },
    birth_day : {
        type : Date,
        required : false
    },
    address : {
        type : String,
        required : false
    },
    location : {
        type : String,
        required : false
    },
    coords : {
        type : Object,
        required : false
    }
},
{
    versionKey: false
});

const userModel = mongoose.model('user', usersSchema);
module.exports = userModel;