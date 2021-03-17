import { createStore } from "redux";
import { AuthReducer } from './reducers';

var store = createStore(AuthReducer)

export default store