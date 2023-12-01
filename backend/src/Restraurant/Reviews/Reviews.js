var express = require('express');
const { KafkaClient } = require('kafka-node');
var router = express.Router();
var mysql = require('mysql');
let connection = require("../../../database");
var kafka = require('../../../kafka/client');

exports.getRestraurantReviews = (req, res) => {
    kafka.make_request("get_restraurant_reviews", req.body, (err, result) => {
        if(result.code === 500)
        {
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error");
        }
        else if(result.code === 200)
        {
            res.writeHead(200, {
                'Content-Type' : 'application/json'
            })
            res.end(JSON.stringify(result.data));
        }
    })
    // var query = "SELECT * FROM review_table WHERE restraurant_id = '"+ req.body.restraurant_id +"'";
    // connection.query(query, (err, result) => {
    //     if(err)
    //     {
    //         console.log(err)
    //         res.writeHead(500, {
    //             "Content-Type" : "text/plain"
    //         })
    //         res.end("Server Side Error")
    //     }
    //     if(result)
    //     {
    //         res.writeHead(200, {
    //             'Content-Type' : 'application/json'
    //         })
    //         res.end(JSON.stringify(result))
    //     }
    // })
}