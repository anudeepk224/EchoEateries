var express = require('express');
var router = express.Router();
var mysql = require('mysql')
let connection = require("../../../database");
var kafka = require('../../../kafka/client');

exports.getAllRestraurants = (req, res) => {
    kafka.make_request("get_all_restraurants", req.body, (err, result) => {
        if(result === 500)
        {
            res.writeHead(500, {
                "Content-Type": "text/plain",
            });
            res.end("Error");
        }
        else{
            res.writeHead(200, {
                "Content-Type": "application/json",
            });
            res.end(JSON.stringify(result));
        }
    })
    // var query = "SELECT * FROM `Yelp`.`restraurant_table`;";
    // connection.query(query, function (err, result) {
    //     if (err) {
    //     res.writeHead(500, {
    //         "Content-Type": "text/plain",
    //     });
    //     res.end("Error");
    //     } 
    //     else {
            
    //         res.writeHead(200, {
    //             "Content-Type": "application/json",
    //         });
    //         res.end(JSON.stringify(result));
    //         console.log(result)
    //     }
    // });
}