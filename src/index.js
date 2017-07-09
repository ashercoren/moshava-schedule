//REACT
import React from 'react'
import { render } from 'react-dom'

//REDUX
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'

import reducer from './reducers'
import App from './components/App';

//FIREBASE
import * as firebase from 'firebase';
var config = {
  apiKey: "AIzaSyAJQK0Kt9NgkRhJNoK4RX6B7pNT60hx31A",
  authDomain: "mosahava-schedule.firebaseapp.com",
  databaseURL: "https://mosahava-schedule.firebaseio.com",
  projectId: "mosahava-schedule",
  storageBucket: "mosahava-schedule.appspot.com",
  messagingSenderId: "188263799652"
};
firebase.initializeApp(config);

const middleware = [ thunk ];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(...middleware)
  )
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);