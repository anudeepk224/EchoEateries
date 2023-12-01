const mongoose = require('mongoose');
const Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var reviewSchema = new Schema({
    user_id : {
        type : ObjectId,
        required : true
    },
    restraurant_id : {
        type : ObjectId,
        required : true
    },
    review_description : {
        type : String,
        required : true
    },
    review_ratings : {
        type : String,
        required : true
    },
    review_time : {
        type : Date,
        required : true
    },
},
{
    versionKey : false
});

const reviewModel = mongoose.model("review", reviewSchema);
module.exports = reviewModel;