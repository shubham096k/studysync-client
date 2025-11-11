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
  const [usernameError, setUsernameError] = useState(""); // state for username errors
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

  // Username change handler
  const handleUsernameChange = (e) => {
    const username = e.target.value.toLowerCase();
    setForm({ ...form, username });
    setUsernameError(""); // Clear backend error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setUsernameError("");
    setEmailError("");
    try {
      await dispatch(register(form)).unwrap();
      navigate("/login");
    } catch (error) {
      console.log("Registration error:", error); // Debug log

      // Extract field-specific errors from backend response
      if (error?.details?.username) {
        setUsernameError(error.details.username[0]); // "A user with that username already exists."
      }
      if (error?.details?.email) {
        setEmailError(error.details.email[0]);
      }

      // Show general message in Snackbar
      setErrorMessage(
        error?.message || "Registration failed. Please try again."
      );
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
          onChange={handleUsernameChange}
          value={form.username}
          required
          error={!!usernameError}
          helperText={usernameError || ""}
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
