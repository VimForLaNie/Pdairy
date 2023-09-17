import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Appunion from './Appunion';
import reportWebVitals from './reportWebVitals';
import User from './User';

const statuss = localStorage.getItem('statuss'); // Retrieve the status from localStorage
const loginStatus = localStorage.getItem('loginStatus');
ReactDOM.render(
  <React.StrictMode>
    {loginStatus !== 'Success' ?  <User /> : null}
    {loginStatus === 'Success' ? (statuss === 'farmer' ? <App /> : <Appunion />) : null}

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
