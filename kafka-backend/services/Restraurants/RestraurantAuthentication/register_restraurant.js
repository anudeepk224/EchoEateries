var express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var Restraurants = require('../../../Models/restraurantModel');

function handle_request(message, callback)
{
    Restraurants.findOne({email : message.email}, (err, restraurant) => {
        if(err)
        {
            callback(null, 500);
        }
        else if(restraurant !== null)
        {
            callback(null, 299);
        }
        else 
        {
            bcrypt.hash(message.password, saltRounds, function(err, hash){
                if(err)
                {
                    callback(null, 500);
                }
                else{
                    message.password = hash;
                    Restraurants.create(message, (err, result) => {
                        if(err)
                        {
                            callback(null, 500);
                        }
                        else{
                            callback(null, 200);
                        }
                    })
                }
            })
        }
    })
}
exports.handle_request = handle_request;