import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import './index.css';
import reportWebVitals from './reportWebVitals';
import configureStore from './configureStore';
import Main from './main';

// We use hash history because this example is going to be hosted statically.
// Normally you would use browser history.
const history = createBrowserHistory();
const initialState = window.INITIAL_REDUX_STATE

const store = configureStore(history, initialState);

ReactDOM.render(
  <React.StrictMode>
    <Main store={store} history={history} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
