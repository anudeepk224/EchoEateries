const {ObjectId} = require('mongodb');
const dishModel = require('../../../Models/dishModel');
const restraurantModel = require('../../../Models/restraurantModel');

function handle_request(message, callback)
{
    var deliveryQuery = "";
    var takeoutQuery = "";
    var dineInQuery = "";
    var neighborhoodLength = 0
    if(message.neighorhoods != undefined)
    {
        neighborhoodLength = message.neighorhoods.length;
    }
    if(message.delivery === 'yes')
    {
        deliveryQuery = 'yes';
    }
    if(message.takeOut === 'yes')
    {
        takeoutQuery = "yes"; 
    }
    if(message.dineIn === 'yes')
    {
        dineInQuery = "yes";
    }
    var response = {}
    dishModel.find({dish_name : {$regex : '.*' + message.search + '.*' }}, (err, result) => {
        if(err)
        {
            response.code = 500;
            response.data = err;
            callback(null, response);
        }
        else
        {
            var finalRestraurants = []
            if(result.length > 0)
            {  
                var count = 0
                result.map(i => {
                    if(neighborhoodLength > 0)
                    {
                        restraurantModel.findOne({_id : ObjectId(i.restraurant_id), location : {$regex : '.*' + message.location + '.*'}, 
                        delivery : {$regex : '.*' + deliveryQuery + '.*'}, 
                        takeout : {$regex : '.*' + takeoutQuery + '.*'}, 
                        dine_in : {$regex : '.*' + dineInQuery + '.*'}, 
                        neighborhood : {$in : message.neighorhoods}}, (err, restraurant) => {
                            count++;
                            if(err)
                            {
                                response.code = 500;
                                response.data = err;
                                callback(null, response);
                            }
                            if(restraurant !== null)
                            {
                                finalRestraurants.push(restraurant);
                            }
                            if(count === result.length)
                            {
                                restraurantModel.find({restraurant_name : {$regex : '.*' + message.search + '.*' }, location : {$regex : '.*' + message.location + '.*'}, 
                                delivery : {$regex : '.*' + deliveryQuery + '.*'}, 
                                takeout : {$regex : '.*' + takeoutQuery + '.*'}, 
                                dine_in : {$regex : '.*' + dineInQuery + '.*'}, 
                                neighborhood : {$in : message.neighorhoods}}, (err, freshRestraurants) => {
                                    if(err)
                                    {
                                        response.code = 500;
                                        response.data = err;
                                        callback(null, response);
                                    }
                                    else{
                                        
                                        finalRestraurants = finalRestraurants.concat(freshRestraurants);
                                        finalRestraurants = finalRestraurants.reduce((unique, o) => {
                                            if(!unique.some(obj => obj._id.toString() === o._id.toString())) {
                                                unique.push(o);
                                            }
                                            return unique;
                                        },[]);
                                        response.code = 200;
                                        response.data = finalRestraurants;
                                        callback(null, response);
                                    }
                                })
                            }
                        })
                    }
                    else{
                        restraurantModel.findOne({_id : ObjectId(i.restraurant_id), location : {$regex : '.*' + message.location + '.*'}, 
                        delivery : {$regex : '.*' + deliveryQuery + '.*'}, 
                        takeout : {$regex : '.*' + takeoutQuery + '.*'}, 
                        dine_in : {$regex : '.*' + dineInQuery + '.*'}}, (err, restraurant) => {
                            count++;
                            if(restraurant !== null)
                            {
                                finalRestraurants.push(restraurant);
                            }
                            if(count === result.length)
                            {
                                restraurantModel.find({restraurant_name : {$regex : '.*' + message.search + '.*' }, location : {$regex : '.*' + message.location + '.*'}, 
                                delivery : {$regex : '.*' + deliveryQuery + '.*'}, 
                                takeout : {$regex : '.*' + takeoutQuery + '.*'}, 
                                dine_in : {$regex : '.*' + dineInQuery + '.*'}}, (err, freshRestraurants) => {
                                    finalRestraurants = finalRestraurants.concat(freshRestraurants);
                                    finalRestraurants = finalRestraurants.reduce((unique, o) => {
                                        if(!unique.some(obj => obj._id.toString() === o._id.toString())) {
                                            unique.push(o);
                                        }
                                        return unique;
                                    },[]);
                                    response.code = 200;
                                    response.data = finalRestraurants;
                                    callback(null, response);
                                })
                                
                            }
                        })
                    }
                    
                })
                
            }
            else{
                if(neighborhoodLength > 0)
                {
                    restraurantModel.find({restraurant_name : {$regex : '.*' + message.search + '.*' }, location : {$regex : '.*' + message.location + '.*' }, 
                    delivery : {$regex : '.*' + deliveryQuery + '.*'}, 
                    takeout : {$regex : '.*' + takeoutQuery + '.*'}, 
                    dine_in : {$regex : '.*' + dineInQuery + '.*'}, 
                    neighborhood : {$in : message.neighorhoods}}, (err, freshRestraurants) => {
                        response.code = 200;
                        response.data = freshRestraurants;
                        callback(null, response);
                    })
                }
                else{
                    restraurantModel.find({restraurant_name : {$regex : '.*' + message.search + '.*' }, location : {$regex : '.*' + message.location + '.*' }, 
                    delivery : {$regex : '.*' + deliveryQuery + '.*'}, 
                    takeout : {$regex : '.*' + takeoutQuery + '.*'}, 
                    dine_in : {$regex : '.*' + dineInQuery + '.*'}}, (err, freshRestraurants) => {
                        response.code = 200;
                        response.data = freshRestraurants;
                        callback(null, response);
                    })
                }
            }
        }
    })
}
exports.handle_request = handle_request;