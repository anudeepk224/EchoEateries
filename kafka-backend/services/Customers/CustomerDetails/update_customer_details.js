var express = require('express');
const {ObjectId} = require('mongodb');
var Customers = require('../../../Models/userModel')

function handle_request(message, callback)
{
    Customers.updateOne({_id : ObjectId(message.user_id)}, { $set : {
        first_name : message.first_name,
        last_name : message.last_name,
        email : message.email,
        phone_number : message.phone_number,
        nick_name : message.nick_name,
        birth_day : message.birth_day,
        headline :  message.headline, 
        city : message.city, 
        state : message.state,
        country : message.country,
        zip_code : message.zip_code, 
        things_i_love : message.things_i_love, 
        blog : message.blog, 
        favourites : message.favourites, 
        address :  message.address,
        location : message.address + ", " + message.city + ", " + message.state + ", " + message.country + ", " + message.zip_code,
        coords : message.coords
    }}, (err, result) => {
        if(err)
        {
           callback(null, 500);
        }
        else{
            console.log(result)
            callback(null, 200)
        }
    })
}
exports.handle_request = handle_request;