var Followers = require('../../../Models/followersModel');
const {ObjectId} = require('mongodb');

function handle_request(message, callback)
{
    Followers.findOne({customer_id : ObjectId(message.customer_id)}, (err, result) => {
        var response = {};
        if(err)
        {
            response.code = 500;
            response.data = err;
            callback(null, response);
        }
        else if(result !== null)
        {
            if(result.following.includes(ObjectId(message.follower)))
            {
                response.code = 299;
                callback(null, response);
            }
            else{
                var arr = result.following;
                arr.push(ObjectId(message.follower));
                Followers.updateOne({customer_id : ObjectId(message.customer_id)}, {$set : {
                    following : arr
                }} , (err, follower) => {
                    if(err)
                    {
                        response.code = 500;
                        response.data = err;
                        callback(null, response);
                    }
                    else{
                        response.code = 200;
                        callback(null, response);
                    }
                })
            }
        }
        else{
            var follower = {}
            follower.customer_id = message.customer_id;
            var arr = []
            arr.push(ObjectId(message.follower));
            follower.following = arr;
            Followers.create(follower, (err, final) => {
                if(err)
                {
                    response.code = 500;
                    response.data = err;
                    callback(null, response);
                }
                else{
                    response.code = 200;
                    callback(null, response);
                }
            })
        }
    })
}
exports.handle_request = handle_request;