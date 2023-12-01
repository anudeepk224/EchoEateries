const e = require('express');
var kafka = require('../../../kafka/client');

exports.getAllCustomers = (req, res) => {
    kafka.make_request("get_all_customers", req.body, (err, result) => {
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
                'Content-Type' : "application/json"
            })
            res.end(JSON.stringify(result.data));
        }
    })
}

exports.followCustomer = (req, res) => {
    kafka.make_request("follow_customer", req.body, (err, result) => {
        if(result.code === 500)
        {
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        else if(result.code === 299)
        {
            res.writeHead(299,{
                'Content-Type' : "text/plain"
            })
            res.end("Already following the customer");
        }
        else if(result.code === 200)
        {
            res.writeHead(200,{
                'Content-Type' : "text/plain"
            })
            res.end("Customer Followed");
        }
    })
}
exports.searchCustomer = (req, res) => {
    kafka.make_request("search_customer", req.body, (err, result) => {
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
                'Content-Type' : "application/json"
            })
            res.end(JSON.stringify(result.data));
        }
    })
}
exports.getCustomerFollowers = (req,res) => {
    kafka.make_request("get_customer_followers", req.body, (err, result) => {
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
                'Content-Type' : "application/json"
            })
            res.end(JSON.stringify(result.data));
        }
    })
}
exports.customerLocationfilter = (req, res) => {
    kafka.make_request("get_customet_location_filter", req.body, (err, result) => {
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
                'Content-Type' : "application/json"
            })
            res.end(JSON.stringify(result.data));
        }
    })
}