const { RESTRAURANT_SIGN_IN } = require("../constants/action-types");
const initialState = {
    
};

function rootReducer(state = initialState, action)
{
    console.log("Hi inside new reducer")
    console.log("Hi in the correct reducersss")
    if(action.type === RESTRAURANT_SIGN_IN)
    {
        console.log("Hi in the correct reducersss")
        return Object.assign({}, state, {
            message : action.data.message,
            restraurant_id : action.data.restraurant_id
        })
    }
    return state;
}

export default rootReducer;