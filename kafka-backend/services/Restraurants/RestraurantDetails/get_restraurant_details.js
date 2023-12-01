var express = require('express');
var Restraurants = require('../../../Models/restraurantModel');
const {ObjectId} = require('mongodb');

function handle_request(message, callback)
{
    Restraurants.findOne({_id : ObjectId(message.RestrauId)}, (err, restraurant) => {
        if(err)
        {
            callback(null, 500)
        }
        else{
            callback(null, restraurant);
        }
    })
}
exports.handle_request = handle_request;