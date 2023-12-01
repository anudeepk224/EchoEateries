const {ObjectId} = require('mongodb');
var Events = require('../../../Models/eventModel');

function handle_request(message, callback)
{
    Events.find({restraurant_id : ObjectId(message.restraurant_id)}, (err, events) => {
        var response = {}
        if(err)
        {
            response.code = 500;
        }
        else{
            response.code = 200;
            response.data = events;
        }
        callback(null, response);
    })
}
exports.handle_request = handle_request;