/* The Redux store and one reducer is here.
If there are several/too many reducers, put them in a reducer folder.
The same can be said about the action(s) and action creator(s) -> action folder. */

import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Immutable from 'immutable';
import { createAction } from 'redux-actions';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import App from './app';
import { APP_CONTAINER_SELECTOR } from '../shared/config';
import { isProd } from '../shared/util';


/* Actions */
const SAY_HELLO = 'SAY_HELLO';
// Make the action creator sayHello who creates actions of type SAY_HELLO
// sayHello('Sal') returns { type: SAY_HELLO, payload: 'Sal' }
// Equivalent to the shorthand: export const sayHello = createAction(SAY_HELLO);
export const sayHelloAC = (payload) => (
    {
        type: SAY_HELLO,
        payload: payload
    }
);


/* Reducer */
// Answers to store.dispatch(ACTION);
const initialState = Immutable.fromJS({
    message: 'Initial reducer message',
    generation: 0,
    running: false,
    grid: new Array(10),
});
// action: { type: string, payload: any } (Flux Standard Action)
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SAY_HELLO:
            return state.set('message', action.payload);
        default:
            return state;
    }
};


/* Store */
// I would rather do reducer composition (in reducer) instead of using combineReducers({att: reducer});
const store = createStore(reducer,
    isProd ? undefined : window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


/* Rendering */
const rootEl = document.querySelector(APP_CONTAINER_SELECTOR);

const wrapApp = (AppComponent, reduxStore) => (
    <Provider store={reduxStore}>
        <AppContainer>
            <AppComponent />
        </AppContainer>
    </Provider>
);

ReactDOM.render(wrapApp(App, store), rootEl);

// Hot Module Replacement
if (module.hot) {
    module.hot.accept('./app', () => {
        const NextApp = require('./app').default;
        ReactDOM.render(wrapApp(NextApp, store), rootEl);
    })
}
