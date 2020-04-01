import {applyMiddleware, compose, createStore} from 'redux';
import thunk, {ThunkMiddleware} from 'redux-thunk';
import rootReducer from './reducers';
import {AuthActionTypes} from "./actions/AuthActionTypes";

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
  composeEnhancers(applyMiddleware(thunk as ThunkMiddleware<AppState, AuthActionTypes>))
);

export default store;
