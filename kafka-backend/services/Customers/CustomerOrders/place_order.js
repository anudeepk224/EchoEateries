const {ObjectId} = require('mongodb');
var Orders = require('../../../Models/orderModel');
const date = require('date-and-time');
var Carts = require('../../../Models/cartModel');

function handle_request(message, callback)
{
    const now = new Date();
    var datetime = date.format(now, 'YYYY/MM/DD HH:mm:ss');
    console.log("___________________________ Message for order is __________________________", message);
    var items = message.items.toString();
    message.items = items;
    message.user_id = ObjectId(message.user_id);
    message.restraurant_id = ObjectId(message.restraurant_id);
    message.time_placed = datetime;
    
    Orders.create(message, (err, order) => {
        var response = {}
        if(err)
        {
            // callback(null, 500);
            response.code = 500;
        }
        if(order)
        {
            var items = message.items.split(",");
            for(var i in items)
            {
                console.log("________________ Item is --------------",items[i]);
                Carts.updateOne({_id : ObjectId(items[i])}, {$set : {
                    is_active : "no"
                }}, (err, result) => {
                    if(err)
                    {
                        // callback(null, 500);
                        response.code = 500;
                    }
                })
            }
            response.code = 200;
            callback(null, response);
        }
    })
}
exports.handle_request = handle_request;