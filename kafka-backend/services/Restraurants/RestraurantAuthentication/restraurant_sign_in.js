var express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var Restraurants = require('../../../Models/restraurantModel');


function handle_request(message, callback)
{
    console.log("Inside the correct function")
    Restraurants.findOne({email : message.email}, (err, restraurant) => {
        console.log("Restraurant found ", restraurant)
        if(err)
        {
            callback(null, 500);
        }
        else if(restraurant === null)
        {
            callback(callback, 400);
        }
        else{
            console.log("request password is : ", message.password)
            bcrypt.compare(message.password, restraurant.password, (err, isPasswordTrue) => {
                console.log("Is password true?" , isPasswordTrue)
                if(err)
                {
                    callback(null, 500);
                }
                else if(isPasswordTrue)
                {
                    delete restraurant.password;
                    callback(null, restraurant);
                }
                else if(!isPasswordTrue)
                {
                    callback(null, 400);
                }
            })
        }
    })
}
exports.handle_request = handle_request;