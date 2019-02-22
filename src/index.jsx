// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { isNil } from 'ramda';
import App from '@/layout/App';

const root = document.getElementById('root');

if (!isNil(root)) {
  ReactDOM.render(<App />, root);
}
