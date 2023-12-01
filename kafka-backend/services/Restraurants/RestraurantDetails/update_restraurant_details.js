var express = require('express');
var Restraurants = require('../../../Models/restraurantModel');
const {ObjectId} = require('mongodb');

function handle_request(message, callback)
{
    Restraurants.updateOne({_id : ObjectId(message.restraurant_id)}, {$set : {
        owner_name : message.owner_name, 
        email : message.email,
        phone_number : message.phone_number,
        restraurant_name : message.restraurant_name, 
        description : message.description, 
        location : message.location, 
        zip_code : message.zip_code,
        weekdays_timings : message.weekdays_timings, 
        weekend_timings : message.weekend_timings, 
        cusine : message.cusine, 
        takeout : message.takeout, 
        delivery : message.delivery, 
        dine_in : message.dine_in,
        coords : message.coords
    }}, (err, result) => {
        if(err)
        {
            console.log("Error is ---------------------------------",err);
            callback(null, 500);
        }
        else
        {
            console.log("result is ------------------------------",result);
            callback(null, 200);
        }
    })
}
exports.handle_request = handle_request;