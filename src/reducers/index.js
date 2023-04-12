import {combineReducers} from 'redux';
import authReducer from './authReducer';
import matchReducer from './matchReducer';
import chatReducer from './chatReducer';
export default combineReducers(
    {
        auth : authReducer,
        match : matchReducer,
        chat : chatReducer
    }
);