import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import configureStore from './utils/configureStore';
import { initialState } from './store';
import { BrowserRouter } from 'react-router-dom';
import config from './constants/config';
import http, { setupInterceptors } from './utils/http';
import { httpMock } from './utils/httpMock';

export const store = configureStore(initialState);

setupInterceptors(store, http);
setupInterceptors(store, httpMock);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename={config.BASENAME}>
      <App />
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
