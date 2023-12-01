const {ObjectId} = require('mongodb');
var Events = require('../../../Models/eventModel');

function handle_request(message, callback)
{
    message.restraurant_id = ObjectId(message.restraurant_id);
    Events.create(message, (err, result) => {
        var response = {};
        if(err)
        {
            response.code = 500;
            response.data = err;
        }
        else {
            
            response.code = 200;
        }
        callback(null, response);
    })
}
exports.handle_request = handle_request;