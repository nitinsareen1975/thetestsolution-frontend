import { combineReducers } from 'redux';
import adminReducer from "./admin-reducer";

const reducers = combineReducers({
    adminConfig: adminReducer
});

export default reducers;