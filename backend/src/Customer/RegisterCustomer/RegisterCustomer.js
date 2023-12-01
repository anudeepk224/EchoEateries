var express = require('express');
var router = express.Router();
const date = require('date-and-time');
var mysql = require('mysql')
const bcrypt = require('bcrypt');
const saltRounds = 10;
let connection = require("../../../database")
var Customers = require('../../../Models/userModel')
var kafka = require('../../../kafka/client')

exports.RegisterCustomer = (req, res) => {
    kafka.make_request('register_customer', req.body, (err, result) => {
        if(result === 500)
        {
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        else if(result === 299)
        {
            res.writeHead(299, {
                "Content-Type" : "text/plain"
            })
            res.end("User exists")
        }
        else if(result === 200)
        {
            res.writeHead(200, {
                "Content-Type" : "text/plain"
            })
            res.end("User Registered")
        }
    })
}


// exports.RegisterCustomer = (req, res) => {
//     let body = req.body;
//     kafka.make_request('register_user', body, function(err, result){
//         if(err)
//         {
//             console.error(err);
//         }
//         else{
//             console.log(result)
//             res.send(result)
//         }
//     })
// }
// module.exports = router;