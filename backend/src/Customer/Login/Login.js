var express = require('express');
var kafka = require('../../../kafka/client')
const jwt = require('jsonwebtoken');
const { secret } = require('../../../Utils/config');
const { auth } = require("../../../Utils/passport");

exports.customerSignIn = (req, res) => {
    kafka.make_request("customer_sign_in", req.body, (err, result) => {
        if(err)
        {
            console.log(err);
        }
        else{
            if(result === 500)
            {
                res.writeHead(500, {
                    "Content-Type" : "text/plain"
                })
                res.end("Server Side Error")
            }
            else if(result === 207)
            {
                res.writeHead(207,{
                    'Content-Type' : 'text/plain'
                })
                res.end("Invalid user");
            }
            else if(result === 209)
            {
                res.writeHead(209,{
                    'Content-Type' : 'text/plain'
                })
                res.end("Wrong Password");
            }
            else{
                const payload = { _id: result._id, source : "customer"};
                const token = jwt.sign(payload, secret,  {
                    expiresIn: 1008000
                });
                result.token =  "JWT " + token;
                // 
                res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
                res.writeHead(200,{
                    'Content-Type' : 'applicaton/json'
                })
                res.end(JSON.stringify(result));
            }
        }
    })
}
