var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
var Customers = require('../../../Models/userModel')

function handle_request(message, callback)
{
    Customers.findOne({email : message.email} , function(err, customer){
        if(err)
        {
            callback(null, 500);
        }
        else if(customer === null)
        {
            callback(null, 207);
        }
        else{
            bcrypt.compare(message.password, customer.password, (err, isPasswordTrue) => {
                if(err)
                {
                    callback(null, 500)
                }
                else
                {
                    if(isPasswordTrue)
                    {
                        delete customer.password;
                        callback(null, customer);
                    }
                    else
                    {
                        callback(null, 209)
                    }
                }
            })
        }
    })
    // callback(null, "something vague")
}
exports.handle_request = handle_request;