import {applyMiddleware, compose, createStore} from 'redux';
import thunk, {ThunkMiddleware} from 'redux-thunk';
import rootReducer from './reducers';
import {AuthActionTypes} from "./actions/types/AuthActionTypes";
import {RegisterActionTypes} from "./actions/types/RegisterActionTypes";

const initialState = {};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export type AppState = ReturnType<typeof rootReducer>;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk as ThunkMiddleware<AppState, AuthActionTypes, RegisterActionTypes>))
);

export default store;
