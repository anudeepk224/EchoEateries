import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import CustomerProfile from './CustomerProfile/CustomerProfile';
import LandingPage from './LandingPage/LandingPage'
import Login from './Login/Login'
import RestrauSignUp from './RestrauSignUp/RestrauSignUp';
import SignUp from './SignUp/SignUp';
import UpdateProfile from './UpdateProfile/UpdateProfile';
import UploadPicture from './UploadPicture/UploadPicture';
import RestrauSignIn from './RestrauSignIn/RestrauSignIn';
import RestrauProfile from "./RestrauProfile/RestrauProfile"
import UpdateRestrauProfile from './UpdateRestrauProfile/UpdateRestrauProfile';
import AddDish from './AddDish/AddDish';
import CustomerHome from './CustomerHome/CustomerHome';
import RestraurantView from './RestraurantView/RestraurantView';
import DishDetails from './DishDetails/DishDetails';
import Cart from './Cart/Cart';
import CustomerOrders from './CustomerOrders/CustomerOrders';
import RestraurantOrder from './RestraurantOrder/RestraurantOrder';
import RestraurantReviews from './RestraurantReviews/RestraurantReviews';
import CustomerReviews from './CustomerReviews/CustomerReviews';
import RestraurantEvent from './RestraurantEvent/RestraurantEvent';
import CustomerEvents from './CustomerEvents/CustomerEvents';
import CustomerRegisteredEvents from './CustomerRegisteredEvents/CustomerRegisteredEvents';
import UploadRestraurantPictures from './UploadRestraurantPictures/UploadRestraurantPictures';
import ViewCustomerProfile from './ViewCustomerProfile/ViewCustomerProfile';
import RestraurantMessages from './RestraurantMessages/RestraurantMessages';
import CustomerChats from './CustomerChats/CustomerChats';
import AllCustomers from './AllCustomers/AllCustomers';
class Main extends Component {
    render(){
        return(
            <div>
                <Route path="/landingPage" component={LandingPage}/>
                <Route path="/login" component={Login}/>
                <Route path="/signUp" component={SignUp}/>
                <Route path="/customerProfile" component={CustomerProfile}/>
                <Route path = '/uploadPicture' component={UploadPicture} />
                <Route path = '/updateProfile' component = {UpdateProfile} />
                <Route path = "/restrauSignUp" component = {RestrauSignUp} />
                <Route path = "/restrauSignIn" component = {RestrauSignIn } />
                <Route path = "/restrauProfile" component = {RestrauProfile} />
                <Route path = "/updateRestrauProfile" component = {UpdateRestrauProfile} />
                <Route path = "/addDish" component = {AddDish} />
                <Route path = "/customerHome" component = {CustomerHome} />
                <Route path = "/restraurantDetails" component = {RestraurantView} />
                <Route path = '/dishDetails' component = {DishDetails} />
                <Route path = "/cart" component = {Cart} />
                <Route path = '/customerOrders' component = {CustomerOrders} />
                <Route path = '/restraurantOrders' component = {RestraurantOrder}/>
                <Route path = '/restraurantReviews' component = {RestraurantReviews} />
                <Route path = '/customerReviews' component = {CustomerReviews}/>
                <Route path = '/restraurantEvents' component = {RestraurantEvent} />
                <Route path = '/customerEvents' component = {CustomerEvents} />
                <Route path = '/customerRegisteredEvents' component = {CustomerRegisteredEvents} />
                <Route path = '/restraurantPictures' component = {UploadRestraurantPictures} />
                <Route path = '/viewCustomerProfile' component = {ViewCustomerProfile} />
                <Route path = "/restraurantMessages" component = {RestraurantMessages} />
                <Route path = "/customerMessages"  component = {CustomerChats} />
                <Route path = "/allCustomers" component = {AllCustomers} />
            </div>
        )
    }
}
export default Main;