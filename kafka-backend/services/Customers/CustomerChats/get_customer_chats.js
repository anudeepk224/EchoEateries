var Chats = require("../../../Models/chatModel");
const {ObjectId} = require('mongodb');

function handle_request(message, callback)
{
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~ MEssage is ~~~~~~~~~~~~~~~~`", message);
    Chats.find({customer_id : ObjectId(message.customer_id)}, (err, chats) => {
        var response = {};
        if(err)
        {
            response.code = 500;
            response.data = err;
        }
        else
        {
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Customer chats are ~~~~~~~~~~~~~~~~~~~~~~~`", chats)
            response.code = 200;
            response.data = chats
        }
        callback(null, response);
    })
}
exports.handle_request = handle_request;