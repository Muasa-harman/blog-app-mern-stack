import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from "react-redux"
import { PersistGate } from 'redux-persist/lib/integration/react';
import {persistor, store} from "@src/redux/store";
import ThemeProvider from "@src/components/ThemeProvider";
import App from "@src/App";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <PersistGate persistor={persistor}>
  <Provider store={store}>
    <ThemeProvider>
    <App />
    </ThemeProvider>
  </Provider>,
  </PersistGate>
)
