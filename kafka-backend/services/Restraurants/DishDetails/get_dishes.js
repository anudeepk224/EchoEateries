const {ObjectId} = require('mongodb');
var Dishes = require('../../../Models/dishModel');

function handle_request(message, callback)
{
    Dishes.find({restraurant_id : ObjectId(message.restraurant_id)}, (err, dishes) => {
        if(err)
        {
            callback(null, 500)
        }
        else{
            callback(null, dishes);
        }
    })
}
exports.handle_request = handle_request;