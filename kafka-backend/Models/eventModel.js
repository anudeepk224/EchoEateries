const mongoose = require('mongoose');
const Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var eventSchema = new Schema({
    restraurant_id : {
        type : ObjectId,
        required : true
    },
    event_name : {
        type : String,
        required : true
    },
    event_date : {
        type : String,
        required : true
    },
    event_time : {
        type : String,
        required : true
    },
    event_description : {
        type : String,
        required : true
    },
    event_hashtag : {
        type : String,
        required : true
    },
    event_location : {
        type : String,
        required : true
    },
},
{
    versionKey : false
});

const eventModel = mongoose.model("event", eventSchema);
module.exports = eventModel;