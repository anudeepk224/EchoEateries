var Chats = require("../../../Models/chatModel");
const {ObjectId} = require('mongodb');

function handle_request(message, callback)
{
    Chats.findOne({_id : ObjectId(message.chat_id)}, (err, chat) => {
        var response = {}
        if(err)
        {
            response.code = 500;
            response.data = err;
        }
        else if(chat !== null)
        {
            response.code = 200;
            response.data = chat;
        }
        callback(null, response);
    })
}
exports.handle_request = handle_request;