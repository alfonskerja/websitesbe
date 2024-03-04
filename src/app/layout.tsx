"use client"

import { Urbanist } from 'next/font/google'
import './globals.css'
import Navbar from '../components/navbar'
import React from 'react'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import getLPTheme from './(routes)/components/getLPTheme'
import { usePathname } from 'next/navigation'
import Footer from '../components/footer'

const font = Urbanist({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const SBAcoustics_Theme = createTheme(getLPTheme('light'));
  const SBAudience_Theme = createTheme(getLPTheme('dark'));

  const titleName = pathname.includes("sbaudience") ? 'SB Audience' : 'SB Acoustics';

  return (
    <html lang="en">
      <head>
      <title>{titleName}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Welcome to SB Acoustics Website" />
        <meta name="keywords" content="SB Acoustics, SB Audience, SB Automotives" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body 
        className={font.className}
        style={{backgroundColor: pathname.includes("sbaudience") ? 'black' : 'white'}}
      >
    <ThemeProvider theme= {pathname.includes("sbaudience") ? SBAudience_Theme : SBAcoustics_Theme} >
      <CssBaseline />
      <Navbar/>
          {children}
        <Footer/>
    </ThemeProvider>
      </body>
    </html>
  )
}
