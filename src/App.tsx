import { ThemeProvider, CssBaseline, Box } from "@mui/material"
import { useMemo } from "react"
import { themeSettings } from "@/theme"
import { createTheme } from "@mui/material/styles"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from "@/scenes/navbar";

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
              <Route path="/" element={<div>Dashboard</div>} />
              <Route path="/about" element={<div>About</div>} />
              <Route path="/login" element={<div>Login</div>} />
              <Route path="/signup" element={<div>Signup</div>} />
              <Route path="/predictions" element={<div>Signup</div>} />
              <Route path="/contact" element={<>Contact</>} />
              <Route path="/pages/:page" element={<div>Static page</div>} />
              <Route path="*" element={<div>404</div>} />
              </Routes>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
