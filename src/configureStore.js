// import { createBrowserHistory } from 'history'
// import { applyMiddleware, compose, createStore } from 'redux'
// import { routerMiddleware } from 'connected-react-switch'
// import createRootReducer from './reducers'
// import thunk from "redux-thunk";
//
// export const history = createBrowserHistory()
// //redux devtools
// // const composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
// // const store = createStore(reducers, );
//
// export default function configureStore(preloadedState) {
//     const store = createStore(
//         createRootReducer(history), // root reducer with switch state
//         preloadedState,
//         compose(
//             applyMiddleware(
//                 , // for dispatching history actions
//                 thunk
//                 // ... other middlewares ...
//             ),
//         ),
//     )
//
//     return store
// }