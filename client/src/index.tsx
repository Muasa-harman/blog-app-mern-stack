import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {store,persistor} from "./redux/store.js";
import {Provider} from "react-redux"
import { PersistGate } from 'redux-persist/lib/integration/react';
import ThemeProvider from './components/ThemeProvider.js';
import App from "./App";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <PersistGate persistor={persistor}>
  <Provider store={store}>
    <ThemeProvider>
    <App />
    </ThemeProvider>
  </Provider>,
  </PersistGate>
)
