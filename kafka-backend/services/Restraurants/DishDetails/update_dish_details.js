const {ObjectId} = require('mongodb');
var Dishes = require('../../../Models/dishModel');

function handle_request(message, callback)
{
    console.log("message is -------", message)
    Dishes.updateOne({_id : ObjectId(message.dish_id)}, {$set : {
        dish_name : message.dish_name, 
        dish_type : message.dish_type, 
        price : message.price, 
        description : message.description, 
        photo : message.photo, 
        dish_ingredients : message.dish_ingredients
    }}, (err, result) => {
        if(err)
        {
            callback(null, 500);
        }
        else{
            console.log("result is -------------", result)
            callback(null, 200);
        }
    })
}
exports.handle_request = handle_request;