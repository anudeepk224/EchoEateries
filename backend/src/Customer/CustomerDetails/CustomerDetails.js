var kafka = require('../../../kafka/client')
const { checkAuth } = require("../../../Utils/passport");
var jwt = require('jsonwebtoken');
var passport = require('passport');
var requireAuth = passport.authenticate('jwt', { session: false });


exports.getCustomerDetails = (req, res) => {
    kafka.make_request('get_customer_details', req.body, (err, result) => {
        if(result === 500)
        {
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        else
        {
            res.writeHead(200,{
                'Content-Type' : 'applicaton/json'
            })
            res.end(JSON.stringify(result));
        }
    })
}

exports.updateCustomerDetails = (req, res) => {
    kafka.make_request("update_customer_details", req.body, (err, result) => {
        if(result === 500)
        {
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        else if(result === 200)
        {
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            res.end("Updated Info");
        }
    })
}
exports.uploadProfileImage =  function(req, res){
    req.body["path"] = req.file.path;
    kafka.make_request("upload_profile_image", req.body, (err, result) => {
        if(result === 500)
        {
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            
            res.end("Server Side Error")
        }
        else {
            res.end(JSON.stringify(req.file))
        }
    })
}