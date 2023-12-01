const e = require('express');
var express = require('express');
var router = express.Router();
var mysql = require('mysql')
let connection = require("../../../database");
var kafka = require('../../../kafka/client');


exports.addDish = (req, res) => {
    kafka.make_request("add_dish", req.body, (err, result) => {
        if(err)
        {
            console.log(err)
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        else if(result === 500)
        {
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        else if(result === 200)
        {
            res.writeHead(200,{
                'Content-Type' : "text/plain"
            })
            res.end("Successfully added")
        }
    })
}

exports.getDishDetails = (req, res) => {
    console.log("dish is ==============", req.body)
    kafka.make_request("get_dish_details", req.body, (err, result) => {
        if(err)
        {
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        else{
            res.writeHead(200, {
                "Content-Type" : "application/json"
            })
            res.end(JSON.stringify(result));
        }
    })
}

exports.updateDish = (req, res) => {
    console.log("~~~~~~~~~~~~~~~~~~~~~~~Dish to be updated is ~~~~~~~~~~~~~~~~~~~~: ", req.body)
    kafka.make_request("update_dish_details", req.body, (err, result) => {
        if(result === 500)
        {
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        else if(result === 200)
        {
            res.writeHead(200,{
                'Content-Type' : "text/plain"
            })
            res.end("Successfully Updated")
        }
    })
}

exports.getDishes = (req, res) => {
    kafka.make_request("get_dishes", req.body, (err, result) => {
        if(result === 500)
        {
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        else{
            res.writeHead(200, {
                "Content-Type" : "application/json"
            })
            res.end(JSON.stringify(result))
        }
    })
}