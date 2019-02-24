// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import ServiceContext from '@/context/ServiceContext';
import ApiService from '@/services/ApiService';
import StorageService from '@/services/StorageService';
import { isNil } from 'ramda';
import App from '@/layout/App';

const root = document.getElementById('root');

if (!isNil(root)) {
  ReactDOM.render(
    <ServiceContext.Provider value={{ api: ApiService, storage: StorageService }}>
      <App />
    </ServiceContext.Provider>,
    root,
  );
}
