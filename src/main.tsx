import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Global } from '@emotion/react';
import reset from './reset';
import App from './App';
import { LoginContextProvider } from './contexts/Login';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Global styles={reset} />
    <LoginContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LoginContextProvider>
  </React.StrictMode>
);
