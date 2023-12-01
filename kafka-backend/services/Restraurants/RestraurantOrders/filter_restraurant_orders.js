const {ObjectId} = require('mongodb');
var Orders = require('../../../Models/orderModel');


function handle_request(message, callback)
{
    var current = [
        'delivered',
        'picked up'
    ]
    var response = {};
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ message is+++++++++++++++++++", message)
    switch(message.filter)
    {
        case "current" : 
            current = [
                'delivered',
                'picked up',
                'canceled'
            ]
            Orders.find({restraurant_id : ObjectId(message.restraurant_id),status : {$nin : current}}, (err, orders) => {
                if(err)
                {
                    response.code = 500;
                    response.data = err;
                }
                else{
                    response.code = 200;
                    response.data = orders
                }
                console.log("~~~~~~~~~~~~~~~~~~reponse is: ~~~~~~~~~~~~~~~~`",response);
                callback(null, response);
            })
            break;
        case "past" : 
            console.log("__________---------------Inside past----------------");
            Orders.find({restraurant_id : ObjectId(message.restraurant_id), status : {$in : current}}, (err, orders) => {
                if(err)
                {
                    console.log("error is -----------------", err);
                    response.code = 500;
                    response.data = err;
                }
                else{
                    console.log("Orders are -----------------", orders)
                    response.code = 200;
                    response.data = orders
                }
                console.log("~~~~~~~~~~~~~~~~~~reponse is: ~~~~~~~~~~~~~~~~`",response);
                callback(null, response);
            })
            break;
        case "currentDelivery":
            current = [
                'delivered',
                'picked up',
                'canceled'
            ]
            Orders.find({restraurant_id : ObjectId(message.restraurant_id), order_type : "delivery", status : {$nin : current}}, (err, orders) => {
                if(err)
                {
                    response.code = 500;
                    response.data = err;
                }
                else{
                    response.code = 200;
                    response.data = orders
                }
                console.log("~~~~~~~~~~~~~~~~~~reponse is: ~~~~~~~~~~~~~~~~`",response);
                callback(null, response);
            })
            break;
        case "currentTakeout":
            current = [
                'delivered',
                'picked up',
                'canceled'
            ]
            Orders.find({restraurant_id : ObjectId(message.restraurant_id), order_type : "takeout", status : {$nin : current}}, (err, orders) => {
                if(err)
                {
                    response.code = 500;
                    response.data = err;
                }
                else{
                    response.code = 200;
                    response.data = orders
                }
                callback(null, response);
            })
            break;
        case "pastDelivery": 
            Orders.find({restraurant_id : ObjectId(message.restraurant_id), order_type : "delivery", status : {$in : current}}, (err, orders) => {
                if(err)
                {
                    response.code = 500;
                    response.data = err;
                }
                else{
                    response.code = 200;
                    response.data = orders
                }
                callback(null, response);
            })
            
            break;
        case "pastTakeout": 
            Orders.find({restraurant_id : ObjectId(message.restraurant_id), order_type : "takeout", status : {$in : current}}, (err, orders) => {
                if(err)
                {
                    response.code = 500;
                    response.data = err;
                }
                else{
                    response.code = 200;
                    response.data = orders
                }
                callback(null, response);
            })
            
            break;
        case "canceled":
            Orders.find({restraurant_id : ObjectId(message.restraurant_id), status : "canceled"}, (err, orders) => {
                if(err)
                {
                    response.code = 500;
                    response.data = err;
                }
                else{
                    response.code = 200;
                    response.data = orders
                }
                callback(null, response);
            })
            break;
    }
   
}

exports.handle_request = handle_request;