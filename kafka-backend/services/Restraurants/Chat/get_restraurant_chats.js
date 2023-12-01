var Chats = require("../../../Models/chatModel");
const {ObjectId} = require('mongodb');

function handle_request(message, callback)
{
    Chats.find({restraurant_id : ObjectId(message.restraurant_id)}, (err, chats) => {
        var response = {};
        if(err)
        {
            response.code = 500;
            response.data = err;
        }
        else
        {
            response.code = 200;
            response.data = chats
        }
        callback(null, response);
    })
}
exports.handle_request = handle_request;