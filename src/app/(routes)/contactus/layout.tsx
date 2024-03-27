import { Box, Container } from "@mui/material";

export default function TestLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return(
        <Container 
        sx={({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 6 },
        textAlign: { sm: 'center', md: 'left' },
        backgroundColor: 'white'
        })}
    >
        <Box
        sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}
        >
        {children}
        </Box>
    </Container>

    );
}