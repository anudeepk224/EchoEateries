var express = require('express');
const {ObjectId} = require('mongodb');
var Dishes = require('../../../Models/dishModel');

function handle_request(message, callback)
{
    var dish = message;
    dish.restraurant_id = ObjectId(message.restraurant_id);
    Dishes.create(dish, (err, result) => {
        if(err)
        {
            callback(null, 500);
        }
        else{
            callback(null, 200);
        }
    })
}
exports.handle_request = handle_request;