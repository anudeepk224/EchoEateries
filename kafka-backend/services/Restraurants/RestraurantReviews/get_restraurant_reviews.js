const {ObjectId} = require('mongodb');
var Reviews = require('../../../Models/reviewModel');

function handle_request(message, callback)
{
    Reviews.find({restraurant_id : ObjectId(message.restraurant_id)}, (err, reviews) => {
        var response = {}
        if(err)
        {
            response.code = 500;
            response.data = err;
        }
        else{
            response.code = 200;
            response.data = reviews;
        }
        callback(null, response);
    })
}
exports.handle_request = handle_request;