var kafka = require('../../../kafka/client');

exports.addChat = (req, res) => {
    kafka.make_request("add_chat", req.body, (err, result) => {
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
                'Content-Type' : "text/plain"
            })
            res.end("Chat Successfully added")
        }
    })
}

exports.getRestraurantChats = (req, res) => {
    kafka.make_request("get_restraurant_chats", req.body, (err, result) => {
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

exports.getChat = (req, res) => {
    kafka.make_request("get_chat", req.body, (err, result) => {
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
exports.sendMessage = (req, res) => {
    console.log("Message sending ~~~~~~~~~~~~~~~`")
    kafka.make_request("send_message", req.body, (err, result) => {
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~`Result is ~~~~~~~~~~~~~~~~~` ", result);
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