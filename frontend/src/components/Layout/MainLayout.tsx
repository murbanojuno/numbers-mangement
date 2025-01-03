import React, { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import Box from '@mui/material/Box';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const appBarHeight = 64;
  return (
    <Box
      display="flex"
      width="100%"
      flexDirection="column"
      minHeight="100vh"
    >
        <Header />
        <Box
            component="main"
            flexGrow={1}
            sx={{
            mt: `${appBarHeight}px`,
            backgroundColor: 'grey.100',
            }}
        >
            {children}
        </Box>
        <Footer />
    </Box>
  );
};
