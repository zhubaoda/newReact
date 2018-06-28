import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css'; 
import MyRouter from './router';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
  <BrowserRouter>
    <MyRouter />
  </BrowserRouter>), document.getElementById('root'));
registerServiceWorker();
