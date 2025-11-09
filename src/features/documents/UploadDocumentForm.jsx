import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { uploadDocument, fetchDocuments } from './DocumentsSlice';
import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';

export default function UploadDocumentForm({ groupId }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ title: '', file: null });
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === 'file') setForm({ ...form, file: e.target.files[0] });
    else setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.file) return setError(true);
    const data = new FormData();
    data.append('title', form.title);
    data.append('group', groupId);
    data.append('file', form.file);
    try {
      await dispatch(uploadDocument(data)).unwrap();
      dispatch(fetchDocuments());
      setForm({ title: '', file: null });
      setOpen(true);
    } catch {
      setError(true);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Upload Document
      </Typography>
      <TextField
        fullWidth
        label="Title"
        name="title"
        value={form.title}
        margin="dense"
        onChange={handleChange}
      />
      <Button variant="outlined" component="label" sx={{ mt: 1 }}>
        Choose File
        <input type="file" name="file" hidden onChange={handleChange} />
      </Button>
      <Typography variant="body2" sx={{ ml: 1, display: 'inline' }}>
        {form.file ? form.file.name : 'No file chosen'}
      </Typography>
      <Box>
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Upload
        </Button>
      </Box>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Document uploaded!
        </Alert>
      </Snackbar>

      <Snackbar
        open={error}
        autoHideDuration={3000}
        onClose={() => setError(false)}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          Upload failed. Please check inputs.
        </Alert>
      </Snackbar>
    </Box>
  );
}