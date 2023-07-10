import { ThemeProvider, CssBaseline, Box } from "@mui/material"
import { useMemo } from "react"
import { themeSettings } from "@/theme"
import { createTheme } from "@mui/material/styles"
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
import Footer from "@/scenes/footer";

function App() {
  const theme = useMemo(() => createTheme(themeSettings), [])
  return (
    <div className="app">
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
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
