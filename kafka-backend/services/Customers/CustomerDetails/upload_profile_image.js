var express = require('express');
const {ObjectId} = require('mongodb');
var Customers = require('../../../Models/userModel')

function handle_request(message, callback)
{
    Customers.updateOne({_id : ObjectId(message.UserId)}, {$set : { profile_photo : message.path}}, (err, result) => {
        if(err)
        {
            callback(null, 500);
        }
        else
        {
            callback(null, 200);
        }
    })
}

exports.handle_request = handle_request;