import {createStore,  applyMiddleware, compose} from "redux";
import {thunk} from 'redux-thunk';
import rootReducer from "./reducer";

const composeEnhancer=compose;
export const store=createStore(rootReducer,applyMiddleware(thunk));