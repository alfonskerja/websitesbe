"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Hero from './(routes)/components/Hero';
import LogoCollection from './(routes)/components/LogoCollection';
import Highlights from './(routes)/components/Highlights';
import Features from './(routes)/components/Features';

export default function LandingPageSBAcoustics() {
  return (
    <>
      <Hero />
      <Box sx={{ bgcolor: 'background.default' }}>
      <LogoCollection />
        <Features />
        {/* <Divider />
        <Testimonials /> */}
        <Divider />
        <Highlights />
        {/* <Divider /> */}
        {/* <Pricing /> */}
        {/* <Divider /> */}
        {/* <FAQ /> */}
        <Divider />
      </Box>
    </>
  );
}
