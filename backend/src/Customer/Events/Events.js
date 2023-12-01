var express = require('express');
var router = express.Router();
const date = require('date-and-time');
var mysql = require('mysql');
let connection = require("../../../database");
var kafka = require("../../../kafka/client");

exports.getAllEvents = (req, res) => {
    kafka.make_request("get_all_events", req.body, (err, result) => {
        if(result.code === 500)
        {
            console.log(err)
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error");
        }
        if(result.code === 200)
        {
            res.writeHead(200, {
                'Content-Type' : 'application/json'
            })
            res.end(JSON.stringify(result.data));
        }
    })
}

exports.registerForAnEvent = (req, res) => {
    kafka.make_request("register_for_an_event", req.body, (err, result) => {
        if(result.code === 500)
        {
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        else if(result.code === 299)
        {
            res.writeHead(299, {
                'Content-Type' : 'text/plain'
            })
            res.end("User Already registered")
        }
        else if(result.code === 200)
        {
            res.writeHead(200, {
                'Content-Type' : 'text/plain'
            })
            res.end("Registered to event")
        }
    })
}

exports.getUserEvents = (req, res) => {
    kafka.make_request("get_user_events", req.body, (err, result) => {
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
                'Content-Type' : 'application/json'
            })
            res.end(JSON.stringify(result.data))
        }
    })
}

exports.searchEvents = (req, res) => {
    kafka.make_request("search_events", req.body, (err, result) => {
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
                'Content-Type' : 'application/json'
            })
            res.end(JSON.stringify(result.data))
        }
    })   
}