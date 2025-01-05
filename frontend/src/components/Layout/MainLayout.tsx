import React, { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import Box from '@mui/material/Box';

interface MainLayoutProps {
  children: ReactNode;
}

const appBarHeight = 64; // Offset for the header height

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
    >
      <Header />
      <Box
        component="main"
        flexGrow={1} // Content area fills available space
        sx={{
          mt: `${appBarHeight}px`, // Prevent overlap with the header
          backgroundColor: 'grey.100',
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};
