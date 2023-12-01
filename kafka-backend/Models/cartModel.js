const mongoose = require('mongoose');
const Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var cartSchema = new Schema({
    dish_id : {
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
    quantity : {
        type : Number,
        required : true
    },
    is_active : {
        type : String,
        required : true
    },
},
{
    versionKey : false
});

const cartModel = mongoose.model('cart', cartSchema);
module.exports = cartModel;