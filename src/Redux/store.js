import {createStore,  applyMiddleware, compose} from "redux";
import thunk from 'redux-thunk';
import rootReducer from "./reducer";
// import thunkMiddleware from "redux-thunk";

const composeEnhancer=compose;
export const store=createStore(rootReducer,applyMiddleware(thunk));
