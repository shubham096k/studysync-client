import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { uploadDocument, fetchDocuments } from "./DocumentsSlice";
import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  Paper,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DescriptionIcon from "@mui/icons-material/Description";

export default function UploadDocumentForm({ groupId }) {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null); // Add ref for file input
  const [form, setForm] = useState({ title: "", file: null });
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "file") setForm({ ...form, file: e.target.files[0] });
    else setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.file) return setError(true);
    const data = new FormData();
    data.append("title", form.title);
    data.append("group", groupId);
    data.append("file", form.file);
    try {
      await dispatch(uploadDocument(data)).unwrap();
      dispatch(fetchDocuments(groupId)); // Pass groupId to refresh specific group documents
      
      // Clear form state
      setForm({ title: "", file: null });

      // Clear file input display
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setOpen(true);
    } catch {
      setError(true);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 4, borderRadius: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <CloudUploadIcon color="secondary" />
        <Typography variant="h5" fontWeight="bold">
          Upload Document
        </Typography>
      </Box>

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Document Title"
          name="title"
          value={form.title}
          margin="normal"
          onChange={handleChange}
          required
        />
        <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            variant="outlined"
            component="label"
            startIcon={<DescriptionIcon />}
          >
            Choose File
            <input type="file" name="file" hidden onChange={handleChange} />
          </Button>
          <Typography variant="body2" color="text.secondary">
            {form.file ? form.file.name : "No file chosen"}
          </Typography>
        </Box>
        <Button
          type="submit"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          sx={{ mt: 3 }}
          disabled={!form.title || !form.file}
        >
          Upload Document
        </Button>
      </Box>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Document uploaded successfully!
        </Alert>
      </Snackbar>

      <Snackbar
        open={error}
        autoHideDuration={3000}
        onClose={() => setError(false)}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Upload failed. Please check inputs.
        </Alert>
      </Snackbar>
    </Paper>
  );
}
