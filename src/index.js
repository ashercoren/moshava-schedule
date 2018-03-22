//REACT
import React from 'react'
import { render } from 'react-dom'

import App from './components/App';
import DataProvider from './context';

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

render(
  <DataProvider>
    <App />
  </DataProvider>,
  document.getElementById('root')
);