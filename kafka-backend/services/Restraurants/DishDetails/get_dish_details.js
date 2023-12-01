const {ObjectId} = require('mongodb');
var Dishes = require('../../../Models/dishModel');

function handle_request(message, callback)
{
    console.log("Dish id is ---------", message)
    Dishes.findOne({_id : ObjectId(message.dish_id)}, (err, dish) => {
        if(err)
        {
            callback(null, 500);
        }
        else{
            callback(null, dish);
        }
    })
}
exports.handle_request = handle_request;