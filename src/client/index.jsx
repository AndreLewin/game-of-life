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
const SET_RUNNING = 'SET_RUNNING';
export const setRunningAC = createAction(SET_RUNNING);

/* Reducer */
// Answers to store.dispatch(ACTION);
const initialState = Immutable.fromJS({
    generation: 1,
    running: false,
    grid: new Array(10),
});

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_RUNNING:
            return state.set('running', action.payload);
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
