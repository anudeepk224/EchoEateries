//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
// var mysql = require('mysql')
const bcrypt = require('bcrypt');
const saltRounds = 10;
var path = require('path');
const date = require('date-and-time');
const mongoConnection = require('./config')
// let connection = require("./database")
app.set('view engine', 'ejs');
var kafka = require('./kafka/client')
// var mongoose = require('mongoose')
module.exports = app
//use cors to allow cross origin resource sharing
app.use(express.static('public'))
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
// app.use(cors({ origin: 'http://13.57.8.34:3000', credentials: true }));

app.use(bodyParser.json());
const fs = require('fs')
const multer = require("multer");
const DIR = './public/profile_images';
const { response } = require('express');
const e = require('express');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, Math.random() + '-' + fileName)
        //  uuidv4() +
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});
const dish_DIR = './public/restrau_dish_images'
const dish_storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, dish_DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, Math.random() + '-' + fileName)
        //  uuidv4() + 
    }
});

var dish_upload = multer({
    storage: dish_storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // res.setHeader('Access-Control-Allow-Origin', 'http://13.57.8.34:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });


var customerLoginRouter = require('./src/Customer/Login/Login');
var registerCustomerRouter = require('./src/Customer/RegisterCustomer/RegisterCustomer');
var customerDetailsRouter = require('./src/Customer/CustomerDetails/CustomerDetails');
var restraurantAuthenticationRouter = require('./src/Restraurant/RestraurantAuthentication/RestraurantAuthentication');
var restraurantDetailsRouter = require('./src/Restraurant/RestraurantDetails/RestraurantDetails');
var dishRouter = require('./src/Restraurant/DishDetails/DishDetails');
var othersRouter = require('./src/Customer/Others/Others');
var cartRouter = require('./src/Customer/Cart/Cart');
var customerOrderRouter = require('./src/Customer/Orders/Orders');
var restraurantOrderRouter = require('./src/Restraurant/Orders/Orders');
var customerReviewsRouter = require('./src/Customer/Reviews/Reviews');
var customerEventsRouter = require('./src/Customer/Events/Events');
var restraurantReviewsRouter = require('./src/Restraurant/Reviews/Reviews');
var restraurantEventsRouter = require('./src/Restraurant/Events/Events');
var customerFilterRouter = require('./src/Customer/Filter/Filter')
var restraurantChatRouter = require('./src/Restraurant/Chat/Chat');
var customerChatRouter = require('./src/Customer/Chats/Chats')
var customerFollowersRouter = require('./src/Customer/Followers/Followers');

var passport = require('passport');
var requireAuth = passport.authenticate('jwt', {session: false});

app.post('/signIn', customerLoginRouter.customerSignIn);
app.post('/registerUser', registerCustomerRouter.RegisterCustomer);
app.post("/getUserDetails", requireAuth,customerDetailsRouter.getCustomerDetails);
app.post("/updateUserInfo", requireAuth, customerDetailsRouter.updateCustomerDetails);
app.post("/registerRestraurant", restraurantAuthenticationRouter.registerRestraurant);
app.post("/restrauSignIn", restraurantAuthenticationRouter.restraurantSignIn);
app.post("/getRestrauDetails", requireAuth, restraurantDetailsRouter.getRestraurantDetails);
app.post("/updateRestrauDetails", requireAuth, restraurantDetailsRouter.updateRestraurantDetails);
app.post("/addDish", requireAuth, dishRouter.addDish);
app.post("/getDishDetails" , requireAuth, dishRouter.getDishDetails)
app.post("/updateDish", requireAuth, dishRouter.updateDish);
app.post("/getDishes" , requireAuth, dishRouter.getDishes);
app.get("/getAllRestraurants", requireAuth, othersRouter.getAllRestraurants);
app.post("/addItemToCart", requireAuth,cartRouter.addItemToCart);
app.post("/getUserCartDetails", requireAuth, cartRouter.getUserCartDetails);
app.post('/deleteCartItem', requireAuth, cartRouter.deleteCartItem);
app.post("/setCartItemQuantity", requireAuth, cartRouter.setCartItemQuantity);
app.post("/getCartItemDetails", requireAuth, cartRouter.getCartItemDetails);
app.post("/placeOrder", requireAuth, customerOrderRouter.placeOrder);
app.post("/getUserOrders", requireAuth, customerOrderRouter.getCustomerOrders);
app.post("/filterCustomerOrders", requireAuth, customerOrderRouter.filterCustomerOrders);
app.post("/getRestraurantOrders", requireAuth, restraurantOrderRouter.getRestraurantOrders);
app.post("/updateOrderStatus", requireAuth, restraurantOrderRouter.updateOrderStatus);
app.post("/filterRestraurantOrders", requireAuth, restraurantOrderRouter.filterRestraurantOrders);
app.post("/insertRestraurantReview", requireAuth, customerReviewsRouter.insertRestraurantReview);
app.post("/getUserReviews", requireAuth, customerReviewsRouter.getCustomerReviews);
app.post("/getRestraurantReviews", requireAuth, restraurantReviewsRouter.getRestraurantReviews);
app.post("/addEvent", requireAuth, restraurantEventsRouter.addEvent);
app.post("/getRestraurantEvents", requireAuth, restraurantEventsRouter.getRestraurantEvents);
app.post('/getUsersOfAnEvent', requireAuth, restraurantEventsRouter.getUsersOfAnEvent);
app.post("/getEvents", requireAuth, customerEventsRouter.getAllEvents);
app.post("/registerUserForEvent", requireAuth, customerEventsRouter.registerForAnEvent);
app.post("/getUserEvents" , requireAuth, customerEventsRouter.getUserEvents);
app.post("/searchEvents", requireAuth, customerEventsRouter.searchEvents);
app.post("/search", requireAuth, customerFilterRouter.search);
app.post("/finalFilter", requireAuth, customerFilterRouter.finalFilter);
app.post("/uploadPhoto", upload.single('Image'),  customerDetailsRouter.uploadProfileImage);
app.post("/uploadRestrauProfilePic", upload.single('Image'), restraurantDetailsRouter.updateRestrauProfilePic);
app.post("/uploadRestraurantImages", dish_upload.single('Image'), restraurantDetailsRouter.uploadRestraurantImages);
app.post("/getRestraurantImages", requireAuth, restraurantDetailsRouter.getRestraurantImages);
app.post("/addRestraurantChat", requireAuth, restraurantChatRouter.addChat);
app.post("/getRestraurantChats", requireAuth, restraurantChatRouter.getRestraurantChats);
app.post("/getChat", requireAuth, restraurantChatRouter.getChat)
app.post("/sendMessage", requireAuth, restraurantChatRouter.sendMessage);
app.post("/getCustomerChats", customerChatRouter.getCustomerChats);
app.get("/getAllCustomers", requireAuth, customerFollowersRouter.getAllCustomers);
app.post("/followCustomer", requireAuth, customerFollowersRouter.followCustomer);
app.post("/searchCustomer", requireAuth, customerFollowersRouter.searchCustomer);
app.post("/getCustomerFollowers", requireAuth, customerFollowersRouter.getCustomerFollowers);
app.post("/getCustometLocationFilter", requireAuth, customerFollowersRouter.customerLocationfilter);



var Customers = require('./Models/userModel');
app.get("/getProfileImage/:userid", (req, res) => {
    Customers.findOne({_id : req.params.userid}, (err, result) => {
        if(err)
        {
            console.log(err)
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        if(result !== undefined)
        {
            if(result.profile_photo)
            {
                res.sendFile( __dirname + "/" + result.profile_photo);
            }
            else{
                res.sendFile(__dirname +"/public/profile_images/user.png")
            }
        }

    })
})

app.get("/getRestrauProfileImage/:restrauId", (req, res) => {
    var query = "SELECT photo FROM restraurant_table WHERE restraurant_id = '"+ req.params.restrauId +"'";
    connection.query(query, (err, result) => {
        if(err)
        {
            console.log(err)
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        if(result)
        {
            if(result[0].photo === null)   
            {
                res.sendFile(__dirname +"/public/profile_images/user.png")
            }
            else{
                res.sendFile( __dirname + "/" + result[0].photo);
            }
        }
        
        
    })
   
})
app.get("/getDishImage/:dishId", (req, res) => {
    var query = "SELECT photo FROM dish_table WHERE dish_id = '"+ req.params.dishId +"'";
    connection.query(query, (err, result) => {
        if(err)
        {
            console.log(err)
            res.writeHead(500, {
                "Content-Type" : "text/plain"
            })
            res.end("Server Side Error")
        }
        if(result[0].photo === null)  
        {
            res.sendFile(__dirname +"/public/profile_images/user.png")
        }
        else{
            res.sendFile( __dirname + "/" + result[0].photo);
        }
        
    })
   
});
app.post("/uploadDishImage", dish_upload.single('Image'), function(req, res){
    res.writeHead(200, {
        'Content-Type' : 'application/json'
    })
    res.end(JSON.stringify(req.file.path))
})








app.listen(8080)
console.log("Server Listening on port 8080");








