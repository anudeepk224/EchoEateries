const {ObjectId} = require('mongodb');
const dishModel = require('../../../Models/dishModel');
const restraurantModel = require('../../../Models/restraurantModel');

function handle_request(message, callback)
{
    dishModel.find({dish_name : {$regex : '.*' + message.search + '.*' }}, (err, result) => {
       var response = {};
       if(err)
       {
           response.code = 500;
           response.data = err;
       } 
       else{
           var restraurants = [];
            for(let i = 0; i < result.length; i++)
            {
                restraurantModel.findOne({_id : ObjectId(result[i].restraurant_id)}, (err, restraurant) => {
                    if(err)
                    {
                        response.code = 500;
                        response.data = err;
                    }
                    else{
                        restraurants.push(restraurant);
                        if(restraurants.length === result.length)
                        {
                            restraurantModel.find({restraurant_name : {$regex : '.*' + message.search + '.*'}}, (err, freshRestraurants) => {
                                if(err)
                                {
                                    response.code = 500;
                                    response.data = err;
                                }
                                else
                                {
                                    restraurants = restraurants.concat(freshRestraurants);
                                    restraurants  = restraurants.filter((item, index,arr)=>{
                                        const c = arr.map(item=> item._id);
                                        return  index === c.indexOf(item._id)
                                    })    
                                    response.code = 200;
                                    response.data = restraurants;
                                    callback(null, response);    
                                }
                            })
                        }
                    }
                })
            }
            
       }
    })
}
exports.handle_request = handle_request;