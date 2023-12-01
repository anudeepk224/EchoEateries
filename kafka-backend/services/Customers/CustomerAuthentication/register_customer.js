var express = require('express');
var router = express.Router();
const date = require('date-and-time');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var Customers = require('../../../Models/userModel')
// var database = require('../database')
function handle_request(message, callback){

    Customers.findOne({email : message.email}, (err, customer) => {
        if(err)
        {
            callback(null, 500);
        }
        else if(customer !== null)
        {
            callback(null, 299);
        }
        else{
            const now = new Date();
            var datetime = date.format(now, 'YYYY/MM/DD HH:mm:ss');
            datetime = datetime.substring(0, datetime.indexOf(" "));
            message.location = message.zip_code
            bcrypt.hash(message.password, 10, (err, hash) => {
                console.log(hash)
                // encryptedPassword = hash
                var customer = message;
                customer.password = hash
                customer.yelping_since = datetime
                Customers.create(customer, (error, result) => {
                    if(error)
                    {
                       callback(null, 500);
                    }
                    else {
                        callback(null, 200);
                    }
                })
            });
        }
    })
}
exports.handle_request = handle_request;