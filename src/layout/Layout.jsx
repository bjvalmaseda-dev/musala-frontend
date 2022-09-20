import { Container } from '@mui/system';
import React from 'react';

const Layout = ({ children }) => {
  return (
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
    </Container>
  );
};

export default Layout;
