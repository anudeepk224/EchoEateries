var express = require('express');
var router = express.Router();
var mysql = require('mysql')
const date = require('date-and-time');
let connection = require("../../../database")
var kafka = require("../../../kafka/client");
const { response } = require('../../..');

exports.placeOrder = (req, res) => {
    kafka.make_request("place_order", req.body, (err, result) => {
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
            res.end("Order Placed")
        }
    });
}

exports.getCustomerOrders = (req, res) => {
    kafka.make_request("get_customer_orders", req.body, (err, result) => {
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

exports.filterCustomerOrders = (req, res) => {
    kafka.make_request("filter_customer_orders", req.body, (err, result) => {
        console.log("~~~~~~~~~~~~~~~~~~` result is ~~~~~~~~~~~~~~~~~", result)
        if(result.code === 500)
        {
            res.writeHead(404, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        else if(result.code === 200)
        {
            console.log("~~~~~~~~~~~~~~~~~~` result is ~~~~~~~~~~~~~~~~~", result)
            res.writeHead(200,{
                'Content-Type' : 'application/json'
            })
            res.end(JSON.stringify(result.data));
        }
    })
    // var query = "SELECT * FROM order_table WHERE user_id = '"+ req.body.user_id +"' AND status = '"+ req.body.filter +"'"
    // connection.query(query, (err, result) => {
    //     if(err)
    //     {
    //         console.log(err)
    //         res.writeHead(404, {
    //             "Content-Type" : "text/plain"
    //         })
    //         res.end("Server Side Error")
    //     }
    //     if(result)
    //     {
    //         res.writeHead(200,{
    //             'Content-Type' : 'application/json'
    //         })
    //         res.end(JSON.stringify(result))
    //     }
    // })
}