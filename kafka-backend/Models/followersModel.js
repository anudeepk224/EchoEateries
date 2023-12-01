const mongoose = require('mongoose');
const Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var followersSchema = new Schema({
    customer_id : {
        type : ObjectId,
        required : true
    },
    following : {
        type : Array,
        required : true
    }
},
{
    versionKey : false
});

const followersModel = mongoose.model("followers", followersSchema);
module.exports = followersModel;