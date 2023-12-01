const mongoose = require('mongoose');
const Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var chatSchema = new Schema({
    restraurant_id : {
        type : ObjectId,
        required : true
    },
    customer_id : {
        type : ObjectId,
        required : true
    },
    created_date : {
        type : Date,
        required : true
    },
    messages : {
        type : Array,
        required : false
    }
},
{
    versionKey : false
});

const chatModel = mongoose.model('chat', chatSchema);
module.exports = chatModel;