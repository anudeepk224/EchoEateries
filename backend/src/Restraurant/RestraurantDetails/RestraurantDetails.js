const e = require('express');
var express = require('express');
var router = express.Router();
var mysql = require('mysql')
let connection = require("../../../database")
var kafka = require("../../../kafka/client");
exports.getRestraurantDetails = (req, res) => {
    console.log("id is ", req.body)
    kafka.make_request("get_restraurant_details", req.body, (err, result) => {
        if(result === 500)
        {
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        else{
            res.writeHead(200,{
                'Content-Type' : 'applicaton/json'
            })
            res.end(JSON.stringify(result));
        }
    })
};

exports.updateRestraurantDetails = (req, res) => {
    kafka.make_request("update_restraurant_details", req.body, (err, result) => {
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
                'Content-Type' : 'text/plain'
            })
            res.end("Updated Info");
        }
    })
};
exports.updateRestrauProfilePic = (req, res) => {
    req.body.path = req.file.path;
    kafka.make_request("update_restraurant_profile_image", req.body, (err, result) => {
        if(err)
        {
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
        else {
            res.end(JSON.stringify(req.file))
        }
    })
};
exports.uploadRestraurantImages = (req, res) => {
    req.body.image = req.file.path;
    kafka.make_request("upload_restraurant_images", req.body, (err, result) => {
        if(result.code === 500)
        {
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        else if(result.code === 200)
        {
            res.end(JSON.stringify(req.file.path))
        }
    })  
};
exports.getRestraurantImages = (req, res) => {
    kafka.make_request("get_restraurant_images", req.body, (err, result) => {
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
                'Content-Type' : 'applicaton/json'
            })
            res.end(JSON.stringify(result.data));
        }
    })
}