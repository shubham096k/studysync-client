import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "./AuthSlice";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

export default function RegisterPage() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [open, setOpen] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Email validation handler
  const handleEmailChange = (e) => {
    const email = e.target.value;
    setForm({ ...form, email });
    if (email && !email.includes("@")) {
      setEmailError("Email must contain @");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(register(form)).unwrap();
      navigate("/login");
    } catch (error) {
      // Capture error
      // Check for specific error messages
      if (
        error?.message?.includes("username") ||
        error?.error?.includes("username")
      ) {
        setErrorMessage("Username already exists. Please choose another one.");
      } else if (
        error?.message?.includes("email") ||
        error?.error?.includes("email")
      ) {
        setErrorMessage("Email already exists. Please use another email.");
      } else {
        setErrorMessage("Registration failed. Please try again.");
      }
      setOpen(true);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
        <PersonAddIcon />
        <Typography variant="h5">Register</Typography>
      </Box>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Username"
          name="username"
          margin="normal"
          onChange={(e) =>
            setForm({ ...form, username: e.target.value.toLowerCase() })
          } // Convert to lowercase
          value={form.username}
          required
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          margin="normal"
          onChange={handleEmailChange} // Use validation handler
          value={form.email}
          required
          error={!!emailError} // Show error state
          helperText={emailError}
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          margin="normal"
          onChange={handleChange}
          value={form.password}
          required
          inputProps={{ minLength: 6 }} // Minimum 6 characters
          helperText="Password must be at least 6 characters"
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          disabled={
            !form.username ||
            !form.email ||
            !form.password ||
            !!emailError ||
            form.password.length < 6
          } // Disable conditions
        >
          {" "}
          Register
        </Button>
      </Box>
      <Typography sx={{ mt: 2 }}>
        Already have an account? <Link to="/login">Login</Link>
      </Typography>
      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={3000}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
