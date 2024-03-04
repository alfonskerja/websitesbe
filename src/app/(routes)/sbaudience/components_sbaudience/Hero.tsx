import * as React from 'react';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function Hero() {
  return (
    <Box
      id="hero"
      sx={() => ({
        width: '100%',
        backgroundImage:`url(/images/sbaudience/hero.jpg)`,
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
            color={"white"}
          >
            Welcome to&nbsp;
            <Typography
              component="span"
              color={"red"}
              style={{fontSize:"5vw"}} 
            >
              SB Audience
            </Typography>
          </Typography>
          <Typography variant="body1" style={{fontSize:"2vw",  fontStyle:"oblique"}} textAlign="left" color="text.primary" paddingBottom={'10%'}>
            Pro Speakers
          </Typography>
        </Stack>
        <Box
          id="image"
          sx={(theme) => ({
            mt: { xs: 8, sm: 10 },
            alignSelf: 'center',
            height: { xs: 200, sm: 700 },
            width: '100%',
            backgroundImage:
              theme.palette.mode === 'light'
                ? 'url("/static/images/templates/templates-images/hero-light.png")'
                : 'url("/static/images/templates/templates-images/hero-dark.png")',
            backgroundSize: 'cover',
            borderRadius: '10px',
            outline: '1px solid',
            outlineColor:
              alpha('#FF0000', 0.3),
            boxShadow:
              `0 0 24px 12px ${alpha('#FF0000', 0.2)}`,
          })}
        />
      </Container>
    </Box>
  );
}
