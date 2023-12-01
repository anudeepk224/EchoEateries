var express = require('express');
const {ObjectId} = require('mongodb');
var Customers = require('../../../Models/userModel')

function handle_request(message, callback)
{
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Message is ", ObjectId(message.UserId))
    Customers.findOne({_id : ObjectId(message.UserId)}, (err, customer) => {
        console.log("--------------------------Customer is ____________________________", customer)
        if(err)
        {
            callback(null, 500);
        }
        else if(customer !== null)
        {
            console.log("Customer found")
            callback(null, customer);
        }
    })
}

exports.handle_request = handle_request;