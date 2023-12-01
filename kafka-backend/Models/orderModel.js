const mongoose = require('mongoose');
const Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var orderSchema = new Schema({
    user_id : {
        type : ObjectId,
        required : true
    },
    restraurant_id : {
        type : ObjectId,
        required : true
    },
    items : {
        type : String,
        required : true
    },
    status : {
        type : String,
        required : true
    },
    amount : {
        type : String,
        required : true
    },
    time_placed : {
        type : Date,
        required : true
    },
    order_type : {
        type : String,
        required : true
    },
},
{
    versionKey : false
});

const orderModel = mongoose.model("order", orderSchema);
module.exports = orderModel;