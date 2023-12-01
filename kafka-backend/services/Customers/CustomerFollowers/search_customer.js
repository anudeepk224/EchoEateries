var Customers = require('../../../Models/userModel');

function handle_request(message, callback)
{
    Customers.find({first_name : {$regex : '.*' + message.search + '.*'}}, (err, customers) => {
        var response = {}
        if(err)
        {
            response.code = 500;
            response.data = err;
            callback(null, response);
        }
        else{
            Customers.find({nick_name : {$regex : '.*' + message.search + '.*'}}, (err, freshCustomers) => {
                if(err)
                {
                    response.code = 500;
                    response.data = err;
                    callback(null, response);
                }
                else
                {
                   customers = customers.concat(freshCustomers);
                   customers = customers.reduce((unique, o) => {
                    if(!unique.some(obj => obj._id.toString() === o._id.toString())) {
                        unique.push(o);
                    }
                    return unique;
                    },[]);
                    response.code = 200;
                    response.data = customers;
                    callback(null, response);
                }
            })
        }
    })
}
exports.handle_request = handle_request;