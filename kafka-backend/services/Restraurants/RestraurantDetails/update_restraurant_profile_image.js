var express = require('express');
const {ObjectId} = require('mongodb');
var Restraurants = require('../../../Models/restraurantModel');

function handle_request(message, callback)
{
    Restraurants.updateOne({_id : ObjectId(message.restrauId)}, {$set : {
        photo : message.path
    }}, (err, result) => {
        if(err)
        {
            callback(null, 500)
        }
        else{
            callback(null, 200)
        }
    })
}
exports.handle_request = handle_request;