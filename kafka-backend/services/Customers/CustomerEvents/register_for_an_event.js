const {ObjectId} = require('mongodb');
var EventRegistration = require('../../../Models/eventRegistrationModel');
const date = require('date-and-time');

function handle_request(message, callback)
{

    console.log("~~~~~~~~~~~~message ___________ is~~~~~~~~~~~~~~`", message);
   EventRegistration.findOne({event_id : ObjectId(message.event_id), user_id : ObjectId(message.user_id)}, (err, result) => {
       var response = {};
       if(err)
       {
           response.code = 500;
           response.data = err;
           callback(null, response);
       }
       else if(result !== null)
       {
           response.code = 299;
           response.data = "Already Registered";
           callback(null, response);
       }
       else {
            const now = new Date();
            var datetime = date.format(now, 'YYYY/MM/DD HH:mm:ss');
            message.registration_time = datetime;
            EventRegistration.create(message, (err, finalresult) => {
                if(err)
                {
                    response.code = 500;
                    response.data = err;
                }
                else{
                    response.code = 200;
                    response.data = finalresult;
                }
                callback(null, response);
            })
           
       }
       
   })
}
exports.handle_request = handle_request;