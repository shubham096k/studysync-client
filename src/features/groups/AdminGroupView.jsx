import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addSession } from "../sessions/SessionsSlice";
import { fetchGroupDetails } from "./GroupsSlice";
import SessionsTable from "../sessions/SessionsTable";
import DocumentsTable from "../documents/DocumentsTable";
import UploadDocumentForm from "../documents/UploadDocumentForm";

export default function AdminGroupView() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { currentGroup } = useSelector((s) => s.groups);

  const [form, setForm] = useState({
    title: "",
    description: "",
    start_time: "",
    end_time: "",
  });

  useEffect(() => {
    dispatch(fetchGroupDetails(id));
  }, [dispatch, id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addSession({ ...form, group: id }));
    setForm({
      title: "",
      description: "",
      start_time: "",
      end_time: "",
    });
  };

  if (!currentGroup) {
    return (
      <Box p={3}>
        <Typography>Loading group details...</Typography>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        {currentGroup.name}
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {currentGroup.description}
      </Typography>

      <Typography variant="h6" gutterBottom>
        Create Session
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Title"
          name="title"
          value={form.title}
          fullWidth
          margin="dense"
          onChange={handleChange}
          required
        />
        <TextField
          label="Description"
          name="description"
          value={form.description}
          fullWidth
          margin="dense"
          onChange={handleChange}
        />
        <TextField
          label="Start Time"
          name="start_time"
          value={form.start_time}
          type="datetime-local"
          fullWidth
          margin="dense"
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          label="End Time"
          name="end_time"
          value={form.end_time}
          type="datetime-local"
          fullWidth
          margin="dense"
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
        />
        <Button type="submit" variant="contained" sx={{ mt: 1 }}>
          Create
        </Button>
      </Box>

      <SessionsTable groupId={id} status="active" />
      <SessionsTable groupId={id} status="completed" />
      <UploadDocumentForm groupId={id} />
      <DocumentsTable admin />
    </Box>
  );
}
