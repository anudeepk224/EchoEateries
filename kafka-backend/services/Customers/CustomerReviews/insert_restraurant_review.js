const {ObjectId} = require('mongodb');
var Reviews = require('../../../Models/reviewModel');
const date = require('date-and-time');
const userModel = require('../../../Models/userModel');
const restraurantModel = require('../../../Models/restraurantModel');

function handle_request(message, callback)
{
    const now = new Date();
    var datetime = date.format(now, 'YYYY/MM/DD HH:mm:ss');
    message.review_time = datetime;
    Reviews.create(message, (err, result) => {
       var response = {};
       if(err)
       {
           response.code = 500;
           response.data = err;
       }
       else{
           userModel.findOne({_id : ObjectId(message.user_id)}, (err, user) => {
               if(err)
               {
                    response.code = 500;
                    response.data = err;
                    callback(null, response);
               }
               else{
                   var review = 0
                   if(user.total_reviews)
                   {
                        review = parseInt(user.total_reviews) + 1;
                   }
                   else
                   {
                        review = 1;
                   }
                   userModel.updateOne({_id : ObjectId(message.user_id)}, {$set : {
                    total_reviews : review
                   }} , (err, result) => {
                       console.log("~~~~~~~~~~~~~~~~~~~~~` result of user update is ~~~~~~~~~~~~~~~~~~~~~~~", result);
                       if(err)
                       {
                            response.code = 500;
                            response.data = err;
                            callback(null, response);
                       }
                       else{
                           restraurantModel.findOne({_id : ObjectId(message.restraurant_id)}, (err, restraurant) => {
                               if(err)
                               {
                                    response.code = 500;
                                    response.data = err;
                               }
                               else{
                                   var rating = 0;
                                   var count = 0;
                                   if(restraurant.reviews_count)
                                   {
                                        count = restraurant.reviews_count;
                                   }
                                   if(restraurant.reviews)
                                   {
                                       rating = restraurant.reviews;
                                   }
                                   rating = ((rating * count) + message.review_ratings);
                                   count++;
                                   rating = rating / count;
                                   restraurantModel.updateOne({_id : ObjectId(message.restraurant_id)}, ({$set : {
                                        reviews_count : count,
                                        reviews : rating
                                   }}), (err, result) => {
                                    console.log("~~~~~~~~~~~~~~~~~~~~~` result of restraurant update is ~~~~~~~~~~~~~~~~~~~~~~~", result);
                                       if(err)
                                       {
                                            response.code = 500;
                                            response.data = err;
                                            callback(null, response);
                                       }
                                       else{
                                        var review = {
                                            reviews_count : count,
                                            reviews_rating : rating
                                        }
                                        response.code = 200;
                                        response.data = review;
                                        callback(null, response);
                                       }
                                   })
                               }
                           })
                       }
                   })
               }
           })
       } 
    })
}
exports.handle_request = handle_request;