import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const Footer: React.FC = () => {
  return (
    <Box
      component="footer" // Use the HTML <footer> element to semantically define this section.
      sx={{
        bgcolor: 'primary.background',
        textAlign: 'center',
        p: 2,
        mt: 'auto',
      }}
    >
      {/* Display the current year dynamically and a brand message */}
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} - Powered by Vodafone
      </Typography>
    </Box>
  );
};
