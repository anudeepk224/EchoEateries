const {ObjectId} = require('mongodb');
var Events = require('../../../Models/eventModel');
var EventRegistration = require('../../../Models/eventRegistrationModel');

function handle_request(message, callback)
{
    EventRegistration.find({user_id : ObjectId(message.user_id)} , (err, result) => {
        var response = {};
        if(err)
        {
            response.code = 500;
            response.data = err;
        }
        else{
            var events = [];
            for(let i = 0; i < result.length; i++)
            {
                Events.findOne({_id : ObjectId(result[i].event_id)}, (err, event) => {
                    if(err)
                    {
                        response.code = 500;
                        response.data = err;
                        callback(null, response);
                    }
                    else{
                        events.push(event);
                        if(events.length === result.length)
                        {
                            response.code = 200;
                            response.data = events;
                            callback(null, response);
                        }
                    }
                })
            }
        }
    })
}
exports.handle_request = handle_request;