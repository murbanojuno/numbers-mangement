import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Stack,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../../assets/logo.png';
import LinkButton from '../UI/LinkButton';

// Navigation button labels and paths
type NavButton = {
  label: string;
  path: string;
};

const navButtons: NavButton[] = [
  { label: 'Home', path: '/' },
  { label: 'Register', path: '/register' },
  { label: 'Numbers', path: '/numbers' },
];

export const Header: React.FC = () => {
  const theme = useTheme(); // Access the app's theme
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if screen size is mobile
  const navigate = useNavigate(); // Navigation helper
  const [drawerOpen, setDrawerOpen] = useState(false); // Drawer state for mobile menu

  // Open or close the drawer
  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'white', boxShadow: 1 }}>
      <Toolbar>
        {/* Logo - navigates to Home */}
        <Box
          sx={{ flex: 1, display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          <img src={logo} alt="Company Logo" style={{ height: '40px' }} />
        </Box>

        {isMobile ? (
          // Mobile view - Show drawer with menu icon
          <>
            <IconButton
              edge="end"
              sx={{ color: theme.palette.text.primary }}
              onClick={() => toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>

            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={() => toggleDrawer(false)}
            >
              <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={() => toggleDrawer(false)}
                onKeyDown={() => toggleDrawer(false)}
              >
                <List>
                  {navButtons.map(({ label, path }) => (
                    <ListItem key={label} onClick={() => navigate(path)}>
                      <ListItemText primary={label} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>
          </>
        ) : (
          // Desktop view - Show navigation buttons in a row
          <Stack direction="row" spacing={4}>
            {navButtons.map(({ label, path }) => (
              <LinkButton key={label} label={label} path={path} />
            ))}
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
};
