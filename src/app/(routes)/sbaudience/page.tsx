"use client"

import { Box, Divider } from "@mui/material";
import Hero from "./components_sbaudience/Hero";
import LogoCollection from "./components_sbaudience/LogoCollection";
import Features from "./components_sbaudience/Features";
import Testimonials from "./components_sbaudience/Testimonials";
import Highlights from "./components_sbaudience/Highlights";
import Pricing from "./components_sbaudience/Pricing";
import FAQ from "./components_sbaudience/FAQ";



export default function LandingPageSBAudience() {
  return (
    <>
      <Hero />
      <Box sx={{ bgcolor: 'background.default' }}>
        <LogoCollection />
        <Features />
        <Divider />
        <Testimonials />
        <Divider />
        <Highlights />
        <Divider />
        <Pricing />
        <Divider />
        <FAQ />
        <Divider />
      </Box>
    </>
  );
}
