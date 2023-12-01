const {ObjectId} = require('mongodb');
var Events = require('../../../Models/eventModel');

function handle_request(message, callback)
{
    Events.find({event_name : {$regex : '.*' + message.search + '.*'}}, (err, events) => {
        var response = {};
        if(err)
        {
            response.code = 500;
            response.data = err;
        }
        else{
            response.code = 200;
            response.data = events;
        }
        callback(null, response);
    })
}
exports.handle_request = handle_request