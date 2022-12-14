import { Container } from '@mui/system';
import ToastContextProvider from '@contexts/ToastContext';
import React from 'react';
import Toast from '@components/Toast';

const Layout = ({ children }) => {
  return (
    <ToastContextProvider>
      <Container
        sx={{
          background: 'whitesmoke',
          width: '80vw',
          height: '90vh',
          borderRadius: '16px',
          marginTop: '40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {children}
        <Toast />
      </Container>
    </ToastContextProvider>
  );
};

export default Layout;
