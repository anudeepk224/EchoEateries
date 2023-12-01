const {ObjectId} = require('mongodb');
var Images = require("../../../Models/imagesModel");

function handle_request(message, callback)
{
    Images.find({restraurant_id : ObjectId(message.restraurant_id)}, (err, images) => {
        var response = {};
        if(err)
        {
            response.code = 500;
            response.data = err;
        }
        else
        {
            response.code = 200;
            response.data = images
        }
        callback(null, response);
    })
}
exports.handle_request = handle_request;