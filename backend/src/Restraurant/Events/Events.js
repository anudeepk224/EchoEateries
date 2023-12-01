const { response } = require('express');
var kafka = require('../../../kafka/client'); 


exports.addEvent = (req, res) => {
    kafka.make_request("add_event", req.body, (err, result) => {
        if(result.code === 500)
        {
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        else if(result.code === 200)
        {
            console.log("response is ------------", result)
            res.writeHead(200, {
                'Content-Type' : 'text/plain'
            })
            res.end("Event added")
        }
    })
}

exports.getRestraurantEvents = (req, res) => {
    kafka.make_request("get_restraurant_events", req.body, (err, result) => {
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

exports.getUsersOfAnEvent = (req, res) => {
    var query  =  "SELECT * FROM user_table WHERE user_id IN (SELECT user_id FROM event_registration_table WHERE event_id = '"+ req.body.event_id +"')"
    connection.query(query, (err, result) => {
        if(err)
        {
            console.log(err)
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        else
        {
            res.writeHead(200, {
                'Content-Type' : 'application/json'
            })
            res.end(JSON.stringify(result))
        }
    })
}