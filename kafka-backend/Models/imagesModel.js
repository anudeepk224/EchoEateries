const mongoose = require('mongoose');
const Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var imagesSchema = new Schema({
    restraurant_id : {
        type : ObjectId,
        required : true
    },
    image : {
        type : String,
        required : true
    }
},
{
    versionKey : false
});

const imagesModel = mongoose.model('images', imagesSchema);
module.exports = imagesModel;