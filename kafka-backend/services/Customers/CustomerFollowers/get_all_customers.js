var Customers = require('../../../Models/userModel');

function handle_request(message, callback)
{
    Customers.find({}, (err, customers) => {
        var response = {};
        if(err)
        {
            response.code = 500;
            response.data = err
        }
        else
        {
            response.code = 200;
            response.data = customers
        }
        callback(null, response);
    })
}

exports.handle_request = handle_request;