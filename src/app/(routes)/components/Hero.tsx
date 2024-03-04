import * as React from 'react';
import { Paper, alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Carousel from 'react-material-ui-carousel'

var items = [
    {
        name: 'url("/images/sbacoustics/hero2.jpg")',
        description: "Slide 1"
    },
    {
      name: 'url("/images/sbacoustics/hero3.jpg")',
        description: "Slide 2"
    }
]





export default function Hero() {
  function onclickhandle(event: Event){
    console.log("aaaaaaaaaaaa", event)
  }
  return (
    <Box
      id="hero"
      sx={() => ({
        width: '100%',
        backgroundImage:`url(/images/sbacoustics/hero2.jpg)`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        
        <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
          <Typography
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignSelf: 'left',
              textAlign: 'left',
              paddingTop: '10%'
            }}
            style={{fontSize:"5vw"}} 
          >
            Welcome to&nbsp;
            <Typography
              component="span"
              color={"red"}
              style={{fontSize:"5vw"}} 
            >
              SB&nbsp;Acoustics
            </Typography>
          </Typography>
          <Typography variant="body1" style={{fontSize:"2vw",  fontStyle:"oblique"}} textAlign="left" color="text.primary" paddingBottom={'10%'}>
            Building Your Sound
          </Typography>
        </Stack>
        <Box
          id="image"
          sx={{
            mt: { xs: 8, sm: 10 },
            alignSelf: 'center',
            width: '100%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            borderRadius: '10px',
            outline: '1px solid',
            outlineColor:
              alpha('#FF6B6B', 0.3),
            boxShadow:
              `0 0 12px 8px ${alpha('#FF6B6B', 0.2)}`
          }}
        >
        <Carousel 
          autoPlay={true}
          stopAutoPlayOnHover={true}
          animation='slide'
          duration={400}
          cycleNavigation={true}
          indicators={false}
        >
          {items.map( (item, i) => 
          <div>
            <Box
            id="image"
            sx={{
              alignSelf: 'center',
              height: { xs: 200, sm: 700 },
              width: '100%',
              backgroundImage: item.name,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              borderRadius: '10px',
            }}
          >
            {/* <div>
              {item.description}
            </div> */}
            </Box>
          </div>
          )}
        </Carousel>
        </Box>
      </Container>
    </Box>
  );
}
