var Chats = require("../../../Models/chatModel");
const date = require('date-and-time');
const {ObjectId} = require('mongodb');

function handle_request(message, callback)
{
    Chats.findOne({customer_id : ObjectId(message.customer_id), restraurant_id : ObjectId(message.restraurant_id)}, (err, result) => {
        if(err)
        {
            response.code = 500;
            response.data = err;
        }
        else if(result === null)
        {
            const now = new Date();
            var datetime = date.format(now, 'YYYY/MM/DD HH:mm:ss');
            message.created_date = datetime;
            Chats.create(message, (err, chat) => {
                var response = {};
                if(err)
                {
                    response.code = 500;
                    response.data = err;
                }
                else{
                    
                    response.code = 200;
                }
                callback(null, response);
            })
        }
    })
   
}
exports.handle_request = handle_request;