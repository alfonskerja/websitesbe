import React from 'react';
import { Box, Container } from '@mui/material';
import MapContainer from '@/src/components/Googlemap';

const Distributors = () => {
  return (
    <div className='pt-28'>
      <Box>
        <Container>
          <MapContainer/>
        </Container>
      </Box>
    </div>
  );
};

export default Distributors;