import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Box, Stack, useTheme } from '@mui/material';
import logo from '../../assets/logo.png';
import LinkButton from '../UI/LinkButton';


type NavButton = {
    label: string;
    path: string;
};

const navButtons: NavButton[] = [
    { label: 'Home', path: '/' },
    { label: 'Register', path: '/register' },
    { label: 'Numbers', path: '/numbers' },
]

export const Header: React.FC = () => {
    const { palette } = useTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const isActive = (path: string) => location.pathname === path;
  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'white'}}> 
      <Toolbar>
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <img
            src={logo}
            alt="Company Logo"
            style={{ height: '40px' }}
          />
        </Box>
        <Stack direction={"row"} spacing={4} sx={{ flexGrow: 1 }}>
           {
            navButtons.map(({ label, path }) => (
                <LinkButton key={label} label={label} path={path} />
            ))
           }
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
