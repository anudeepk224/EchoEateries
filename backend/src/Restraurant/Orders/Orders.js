const e = require('express');
var express = require('express');
var router = express.Router();
var mysql = require('mysql')
let connection = require("../../../database");
var kafka = require("../../../kafka/client");

exports.getRestraurantOrders = (req, res) => {
    kafka.make_request("get_restraurant_orders", req.body, (err, result) => {
        if(result.code === 500)
        {
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        else if(result.code === 200)
        {
            res.writeHead(200,{
                'Content-Type' : 'application/json'
            })
            res.end(JSON.stringify(result.data));
        }
    })
}

exports.updateOrderStatus = (req, res) => {
    kafka.make_request("update_order_status", req.body, (err, result) => {
        if(result.code === 500)
        {
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        else if(result.code === 200)
        {
            res.writeHead(200, {
                'Content-Type' : 'text/plain'
            })
            res.end("Status Updated")
        }
    })
}

exports.filterRestraurantOrders = (req, res) => {
    kafka.make_request("filter_restraurant_orders", req.body, (err, result) => {
        if(result.code === 500)
        {
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        else if(result.code === 200)
        {
            res.writeHead(200,{
                'Content-Type' : 'application/json'
            })
            res.end(JSON.stringify(result.data))
        }
    })
}