var express = require('express');
var router = express.Router();
var mysql = require('mysql')
let connection = require("../../../database");
var kafka = require('../../../kafka/client');

exports.addItemToCart = (req, res) => {
    // console.log(req.body)
    req.body.is_active = 'yes'
    kafka.make_request('add_item_to_cart', req.body, (err, result) => {
        if(err)
        {
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        else if(result === 200)
        {
            res.writeHead(200, {
                'Content-Type' : 'text/plain'
            })
            res.end("Item Inserted")
        }
    })
}

exports.getUserCartDetails = (req, res) => {
    kafka.make_request("get_user_cart_details", req.body, (err, result) => {
        if(result === 500)
        {
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        else {
            console.log("cart items are ------", result);
            res.writeHead(200, {
                'Content-Type' : 'application/json'
            })
            res.end(JSON.stringify(result))
        }
    })
}

exports.deleteCartItem = (req, res) => {
    kafka.make_request("delete_cart_item", req.body, (err, result) => {
        if(err)
        {
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
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
                'Content-Type' : 'text/plain'
            })
            res.end("Item Deleted")
        }
    })
    // var query = "DELETE FROM cart_table WHERE cart_id = '"+ req.body.cart_id +"' ";
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
    //         res.writeHead(200,{
    //             'Content-Type' : 'text/plain'
    //         })
    //         res.end("Item Deleted")
    //     }
       
    // })
}

exports.setCartItemQuantity = (req, res) => {
    kafka.make_request("set_cart_item_quantity", req.body, (err, result) => {
        if(result === 500)
        {
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        else if(result === 200)
        {
            res.writeHead(200, {
                'Content-Type' : 'text/plain'
            })
            res.end("Quantity Updated")
        }
    })
}

exports.getCartItemDetails = (req, res) => {
    kafka.make_request("get_cart_item_details", req.body, (err, result) => {
        
        if(result === 500)
        {
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        else{
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ result is~~~~~~~~~~~~~~~~~~~~~~~`", result)
            res.writeHead(200, {
                'Content-Type' : 'application/json'
            })
            res.end(JSON.stringify(result));
        }
    });
}