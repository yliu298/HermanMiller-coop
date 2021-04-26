import ReactDOM from 'react-dom';
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import {createStore, applyMiddleware, compose, combineReducers} from 'redux'
import rootReducer from './reducers'
import reducers from './reducers'
import App from './App'
import thunk from "redux-thunk";
import {BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {syncHistoryWithStore} from "react-router-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'


//redux devtools
const composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(

    <Provider store={store}>
        {/*<React.StrictMode>*/}
        {/*    <BrowserRouter>*/}
                <App />
        {/*    </BrowserRouter>*/}
        {/*</React.StrictMode>,*/}
    </Provider>,


document.getElementById('root')
)


