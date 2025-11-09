import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './AuthSlice';
import { useNavigate, Link } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Snackbar, Alert } from '@mui/material';

export default function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login(form)).unwrap();
      navigate('/explore');
    } catch {
      setOpen(true);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom>Login</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField fullWidth label="Username" name="username" margin="normal" onChange={handleChange} />
        <TextField fullWidth label="Password" name="password" type="password" margin="normal" onChange={handleChange} />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Login</Button>
      </Box>
      <Typography sx={{ mt: 2 }}>
        Don’t have an account? <Link to="/register">Register</Link>
      </Typography>
      <Snackbar open={open} onClose={() => setOpen(false)} autoHideDuration={3000}>
        <Alert severity="error" sx={{ width: '100%' }}>Invalid credentials</Alert>
      </Snackbar>
    </Container>
  );
}