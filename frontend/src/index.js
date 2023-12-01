import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../src/js/reducers/index'
import store from '../src/js/store/index'

// const composePlugin = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// const store = createStore(rootReducer, composePlugin(applyMiddleware(thunk)));
ReactDOM.render(
    <Provider store = {store}><App /></Provider>, document.getElementById('root'));

registerServiceWorker();;
