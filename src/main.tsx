import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.tsx'
import '@/index.css'
import { Provider } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import { configureStore } from '@reduxjs/toolkit';
import { api } from '@/state/api';

export const store = configureStore({
  reducer: { [api.reducerPath]: api.reducer },
  middleware: (getDefault) => getDefault().concat(api.middleware)
})
setupListeners(store.dispatch);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
