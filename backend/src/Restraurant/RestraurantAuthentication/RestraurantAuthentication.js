var express = require('express');
var router = express.Router();
var mysql = require('mysql')
const bcrypt = require('bcrypt');
const saltRounds = 10;
let connection = require("../../../database")
var kafka = require("../../../kafka/client")
const jwt = require('jsonwebtoken');
const { secret } = require('../../../Utils/config');

exports.registerRestraurant = (req, res) => {
    kafka.make_request('register_restraurant', req.body, (err, result) => {
        if(result === 500)
        {
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        else if(result === 299)
        {
            res.writeHead(299,{
                'Content-Type' : 'text/plain'
            })
            res.end("Restraurant exists");
        }
        else if(result === 200)
        {
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            res.end("Successful Registration");
        }
    })
}

exports.restraurantSignIn = (req, res) => {
    kafka.make_request("restraurant_sign_in", req.body, (err, result) => {
        if(result === 500)
        {
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        else if(result === 400)
        {
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Invalid user");
        }
        else{
            const payload = { _id: result._id, source : "restraurant"};
            const token = jwt.sign(payload, secret,  {
                expiresIn: 1008000
            });
            result.token = "JWT " + token;
            res.writeHead(200,{
                'Content-Type' : 'applicaton/json'
            })
            res.end(JSON.stringify(result));
        }
    })
}