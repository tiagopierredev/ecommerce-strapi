import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Routes from './routes';
import GlobalStyles from './styles/global';
import Header from './components/Header';
import { CartProvider } from './hooks/useCart';
import { StoreProvider } from './hooks/useStore';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <StoreProvider>
        <CartProvider>
          <GlobalStyles />
          <Header />
          <Routes />
          <ToastContainer autoClose={3000} />
        </CartProvider>
      </StoreProvider>
    </BrowserRouter>
  );
};

export default App;
