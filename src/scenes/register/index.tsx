import FormContainer from "@/components/FormContainer";
import { Typography, Box, Grid, TextField, Link, Button, InputAdornment, IconButton, useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useSignupMutation } from '@/state/api';

function Register() {
  const { palette } = useTheme();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setConfirmPassword] = useState(false);

    const navigate = useNavigate();
    const [signup, { isLoading }] = useSignupMutation();
    const { token } = useSelector((state) => state.auth);
    useEffect(() => {
      if (token) {
        navigate('/')
      }
    }, [navigate, token])

    const handleShowPassword = () => {
      setShowPassword(!showPassword);
    }

    const handleShowConfirmPassword = () => {
      setConfirmPassword(!showConfirmPassword);
    }
    
    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        try {
          const response = await signup({
            username,
            password,
            password2,
            email,
            first_name: firstName,
            last_name: lastName }).unwrap();
            console.log('response', response);
          navigate('/login');
        } catch(error) {
          console.error('error', error)
        }
    }
    return (
        <FormContainer>
        <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  sx={{"& .MuiInputBase-root": {
                    backgroundColor: palette.grey[300],
                },
              }}
                  onChange={(e) => setFirstName(e.target.value)}
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  onChange={(e) => setLastName(e.target.value)}
                  autoComplete="family-name"
                  sx={{"& .MuiInputBase-root": {
                    backgroundColor: palette.grey[300],
                },
              }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  name="username"
                  autoComplete="username"
                  sx={{"& .MuiInputBase-root": {
                    backgroundColor: palette.grey[300],
                },
              }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email Address"
                  autoComplete="email"
                  sx={{"& .MuiInputBase-root": {
                    backgroundColor: palette.grey[300],
                },
              }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    startAdornment: <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleShowPassword}
                      onMouseDown={handleShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>,
                  }}
                  name="password"
                  label="Password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{"& .MuiInputBase-root": {
                    backgroundColor: palette.grey[300],
                },
              }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirm-password"
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  InputProps={{
                    startAdornment: <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleShowConfirmPassword}
                      onMouseDown={handleShowConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>,
                  }}
                  id="confirm-password"
                  onChange={(e)=> setPassword2(e.target.value)}
                  sx={{"& .MuiInputBase-root": {
                    backgroundColor: palette.grey[300],
                },
              }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </FormContainer>
    )
}

export default Register;