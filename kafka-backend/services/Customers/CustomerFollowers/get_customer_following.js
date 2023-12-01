var Followers = require("../../../Models/followersModel");
var Customers = require("../../../Models/userModel");
const {ObjectId} = require('mongodb');

function handle_request(message, callback)
{
    Followers.findOne({customer_id : ObjectId(message.customer_id)}, (err, followers) => {
        var response = {}
        if(err)
        {
            response.code = 500;
            response.data = err;
            callback(null, response);
        }
        else 
        {
            var following = followers.following;
            var customers = []
            for(let i in following)
            {
                let follower = following[i];
                Customers.findOne({_id : follower}, (err, customer) => {
                    if(err)
                    {
                        response.code = 500;
                        response.data = err;
                        callback(null, response);
                    }
                    else
                    {
                        customers.push(customer)
                        if(customers.length === following.length)
                        {
                            response.code = 200;
                            response.data = customers;
                            callback(null, response);
                        }
                    }
                })
            }
        }
    })
}
exports.handle_request =  handle_request;