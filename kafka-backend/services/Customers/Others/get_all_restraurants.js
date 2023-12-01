const {ObjectId} = require('mongodb');
var Restraurants = require('../../../Models/restraurantModel');

function handle_request(message, callback)
{
    Restraurants.find({}, (err, restraurants) => {
        if(err)
        {
            callback(null, 500);
        }
        else{
            console.log("Restraurants found-------", restraurants);
            callback(null, restraurants);
        }
    })
}
exports.handle_request = handle_request; 