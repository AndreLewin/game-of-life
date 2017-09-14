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
import { createRandomGrid, createEmptyGrid } from './helpers'

/* Actions */
const PLAY_GAME = 'PLAY_GAME';
export const playGameAC = createAction(PLAY_GAME);
const PAUSE_GAME = 'PAUSE_GAME';
export const pauseGameAC = createAction(PAUSE_GAME);
const CLEAR_GRID = 'CLEAR_GRID';
export const clearGridAC = createAction(CLEAR_GRID);
const RANDOMISE_GRID = 'RANDOMISE_GRID';
export const randomiseGridAC = createAction(RANDOMISE_GRID);

/* Reducer */
// Answers to store.dispatch(ACTION);
const initialState = Immutable.fromJS({
    generation: 1,
    running: false,
    grid: createRandomGrid()
});

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case PLAY_GAME:
            return state.set('running', true);
        case PAUSE_GAME:
            return state.set('running', false);
        case CLEAR_GRID:
            return state.set('grid', createEmptyGrid()).set('generation', 1).set('running', false);
        case RANDOMISE_GRID:
            return state.set('grid', createRandomGrid()).set('generation', 1).set('running', false);
        default:
            return state;
    }
};


/* Store */
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
