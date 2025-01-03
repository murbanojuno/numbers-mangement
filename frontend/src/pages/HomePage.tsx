import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import heroImg from '../assets/hero_image.webp';
import Title from '../components/UI/Title';
export default function HomePage() {
  return (
    <Box textAlign="center" mt={10}>
        <Title title="Effortlessly Manage Your Company Numbers" subtitle="Welcome to the Numbers Management Application" />
      <Box mt={4}>
        <img
          src={heroImg}
          alt="Office"
          style={{ height: '400px',  marginTop: 20, borderRadius: 8 }}
        />
      </Box>
    </Box>
  );
}
