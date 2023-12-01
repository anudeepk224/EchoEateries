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
            callback(null, response);
        }
        else{
            var arr =[]
            if(chat.messages)
            {
                chat.messages.push(message.text);
                arr = chat.messages
            }
            else
            {
                arr.push(message.text);
            }
            Chats.updateOne({_id : ObjectId(message.chat_id)}, {$set : {
                messages : arr
            }}, (err, result) => {
                if(err)
                {
                    response.code = 500;
                    response.data = err;
                    callback(null, response);
                }
                else
                {
                    chat.messages = arr;
                    response.code = 200;
                    response.data = chat;
                    callback(null, response);
                }
            })
        }
    })
}

exports.handle_request = handle_request;