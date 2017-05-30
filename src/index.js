//REACT
import React from 'react'
import { render } from 'react-dom'

//REDUX
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';

import reducer from './reducers'
import App from './components/App';

const middleware = [ createLogger() ]
const store = createStore(
  reducer,
  applyMiddleware(...middleware)
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);