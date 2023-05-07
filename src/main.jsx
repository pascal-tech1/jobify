import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '../src/App';
import '../src/assets/css/index.css';
const container = document.getElementById('root');
const root = createRoot(container);
import { store } from './store';
import { Provider } from 'react-redux';

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
