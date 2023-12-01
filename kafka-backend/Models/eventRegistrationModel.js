const mongoose = require('mongoose');
const Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var eventRegsitrationSchema = new Schema({
    event_id : {
        type : ObjectId,
        required : true
    },
    restraurant_id : {
        type : ObjectId,
        required : true
    },
    user_id : {
        type : ObjectId,
        required : true
    },
    registration_time : {
        type : Date,
        required : true
    },
},
{
    versionKey : false
});

const eventRegistrationModel = mongoose.model("eventRegistration", eventRegsitrationSchema);
module.exports = eventRegistrationModel;