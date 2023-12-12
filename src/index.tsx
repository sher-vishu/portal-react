import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux'
import store from './app/store'
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './themes/theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
     <Provider store={store}>
    <Auth0Provider
    domain="dev-piol0jhkl6euzkgj.us.auth0.com"
    clientId="z0aiByxQ9pyy2oFNIzrS5PqUeMuBqVeg"
    authorizationParams={{
      redirect_uri: 'http://localhost:3000/'
    }}
  >
     <ChakraProvider theme={theme}>
    <App />
    </ChakraProvider>
    </Auth0Provider>
    </Provider>
  </React.StrictMode>
);

