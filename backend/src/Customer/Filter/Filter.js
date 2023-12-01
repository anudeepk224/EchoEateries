const e = require('express');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
let connection = require("../../../database");
var kafka = require('../../../kafka/client');

exports.search = (req, res) => {
    kafka.make_request("search", req.body, (err, result) => {
        console.log("`~~~~~~~~~~~~~ result is ~~~~~~~~~~~~", result)
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
            res.end(JSON.stringify(result.data));
        }
    })
    // var query = "SELECT * FROM restraurant_table WHERE restraurant_id IN (SELECT restraurant_id from dish_table where lower(REPLACE(dish_name, ' ', '')) LIKE lower(REPLACE('%"+req.body.search+"%', ' ', '')))"
    // connection.query(query, (err, result) => {
    //     if(err)
    //     {
    //         // console.log(err)
    //         res.writeHead(500, {
    //             "Content-Type" : "text/plain"
    //         })
    //         res.end("Server Side Error")
    //     }
    //     if(result)
    //     {
    //         var restrauQuery = "SELECT * from restraurant_table where lower(REPLACE(restraurant_name, ' ', '')) LIKE lower(REPLACE('%"+req.body.search+"%', ' ', ''))";
    //         connection.query(restrauQuery, (err, restrauResult) => {
    //             if(err) throw err;
    //             if(restrauResult)
    //             {
    //                 for(var i = 0; i < restrauResult.length; i++)
    //                 {
    //                     result.push(restrauResult[i]);
    //                 }
    //                 result  = result.filter((item, index,arr)=>{
    //                     const c = arr.map(item=> item.restraurant_id);
    //                     return  index === c.indexOf(item.restraurant_id)
    //                 })                        
    //                 res.writeHead(200, {
    //                     'Content-Type' : 'application/json'
    //                 })
    //                 res.end(JSON.stringify(result))
    //             }
    //         })
            
    //     }
    // })
}

exports.finalFilter = (req, res) => {
    kafka.make_request("final_filter", req.body, (err, result) => {
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
            res.end(JSON.stringify(result.data));
        }
    })
    // console.log("searching ------", req.body);
    // var delivery_query = ''
    // var takeout_query = ''
    // var dinein_query = ''
    // var neighborhood_query = ''
    // var location_query = ''
    // if(req.body.delivery === 'yes')
    //     delivery_query = " AND delivery = '"+ req.body.delivery +"'"

    // if(req.body.takeOut === 'yes')
    //     takeout_query = " AND takeout = '"+ req.body.takeOut +"'"

    // if(req.body.dineIn === 'yes')
    //     dinein_query = " AND dine_in = '"+ req.body.dineIn +"'"

    // if(req.body.neighorhoods && req.body.neighorhoods.length > 0) {
    //     for(let i=0; i<req.body.neighorhoods.length; i++) {
    //         req.body.neighorhoods[i] = "'" + req.body.neighorhoods[i] + "'"
    //         // neighborhood_query = "'" + req.body.neighorhoods[i] + "'"
    //     }
    //     neighborhood_query = " AND neighborhood IN " + "(" + req.body.neighorhoods + ")"
    // }
    // if(req.body.location)
    // {
    //     console.log('hi location')
    //     location_query = "AND lower(REPLACE(location , ' ', '')) LIKE lower(REPLACE('%"+ req.body.location +"%', ' ', ''))"
    // }
    // var query = "SELECT * FROM restraurant_table WHERE restraurant_id IN" + 
    //             "(SELECT restraurant_id from dish_table where lower(REPLACE(dish_name, ' ', '')) LIKE lower(REPLACE('%"+req.body.search+"%', ' ', '')))" + 
    //             delivery_query + takeout_query + dinein_query + neighborhood_query + location_query
    // console.log(query);
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
    //         var restrauQuery = "SELECT * from restraurant_table where lower(REPLACE(restraurant_name, ' ', '')) LIKE lower(REPLACE('%"+req.body.search+"%', ' ', ''))" + 
    //                             delivery_query + takeout_query + dinein_query + neighborhood_query + location_query; 
    //         connection.query(restrauQuery, (err, restrauResult) => {
    //             if(err)
    //             {
    //                 console.log(err)
    //                 res.writeHead(500, {
    //                     "Content-Type" : "text/plain"
    //                 })
    //                 res.end("Server Side Error")
    //             }
    //             if(restrauResult)
    //             {
    //                 for(var i = 0; i < restrauResult.length; i++)
    //                 {
    //                     result.push(restrauResult[i]);
    //                 }
    //                 result  = result.filter((item, index,arr)=>{
    //                     const c = arr.map(item=> item.restraurant_id);
    //                     return  index === c.indexOf(item.restraurant_id)
    //                 })                        
    //                 res.writeHead(200, {
    //                     'Content-Type' : 'application/json'
    //                 })
    //                 res.end(JSON.stringify(result))
    //             }
    //         })
            
    //     }
    // })
}