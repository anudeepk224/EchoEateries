const mongoose = require('mongoose');
var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 500,
    bufferMaxEntries: 0
};
var connectionString =  "mongodb+srv://root:root@yelp.heu0j.mongodb.net/yelp_proto?retryWrites=true&w=majority"
let mongoConnection = mongoose.connect(connectionString, options).then(() => {
    console.log("Mongo connected")
})
module.exports = mongoConnection;