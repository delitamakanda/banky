import FormContainer from "@/components/FormContainer";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { Box, Button, Checkbox, FormControlLabel, Grid, IconButton, InputAdornment, Link, TextField, Typography, useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from "@/state/api";
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from "@/state/auth";

function Login() {
    const { palette } = useTheme();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
      setShowPassword(!showPassword);
    }

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [login, { isLoading }] = useLoginMutation();

    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
      if (token) {
        navigate('/')
      }
    }, [navigate, token])


    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        try {
          const response = await login({ username, password}).unwrap();
          dispatch(setCredentials({...response}));
          navigate('/');
        } catch(error) {
          console.error('error', error)
        }
        
    }
    return (
        <FormContainer>
        <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
              helperText="Please enter your username"
              sx={{"& .MuiInputBase-root": {
                backgroundColor: palette.grey[300],
            },
          }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              helperText="Please enter your password"
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              label="Password"
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
              id="password"
              autoComplete="current-password"
              sx={{"& .MuiInputBase-root": {
                backgroundColor: palette.grey[300],
            },
          }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </FormContainer>
    )
}

export default Login;