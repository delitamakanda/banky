import { ThemeProvider, CssBaseline, Box, useScrollTrigger, Fab, Fade } from "@mui/material"
import { KeyboardArrowUp } from "@mui/icons-material";
import React, { useMemo } from "react"
import { themeSettings } from "@/theme"
import { createTheme, useTheme } from "@mui/material/styles"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from "@/scenes/navbar";
import Dashboard from "@/scenes/dashboard";
import Predictions from "@/scenes/predictions";
import About from "@/scenes/about";
import Login from "@/scenes/login";
import Register from "@/scenes/register";
import NotFound from "@/scenes/notfound";
import Contact from "@/scenes/contact";
import Page from "@/scenes/page";
import Balance from "@/scenes/balance";

interface Props {
  children: React.ReactElement,
  window?: () => Window,
}

function ScrollTop(props: Props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
    target: window ? window() : undefined,
  });

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const anchor = ((e.target as HTMLDivElement).ownerDocument || document).querySelector('#back-to-top-anchor');
  
    if (anchor) {
      anchor.scrollIntoView({ behavior:'smooth', block: 'center' });
    }
  }

  return (
    <Fade in={trigger}>
      <div onClick={handleClick} role="presentation">
        {children}
      </div>
    </Fade>
  )
}

function App(props: Props) {
  const theme = useMemo(() => createTheme(themeSettings), [])

  return (
    <div className="app" id="back-to-top-anchor">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem" color="white">
            <Navbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Register />} />
              <Route path="/predictions" element={<Predictions />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/pages/:page" element={<Page />} />
              <Route path="/balance" element={<Balance />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
      <ScrollTop {...props}>
      <Fab
        color="secondary"
        aria-label="scroll back to top"
        size="small"
        sx={{ position: 'fixed', bottom: 30, right: 30 }}>
          <KeyboardArrowUp />
        </Fab>
      </ScrollTop>
    </div>
    
  )
}

export default App
