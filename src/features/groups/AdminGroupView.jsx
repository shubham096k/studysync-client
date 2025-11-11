import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Divider,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import GroupIcon from "@mui/icons-material/Group";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addSession, fetchSessions } from "../sessions/SessionsSlice";
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
    dispatch(fetchSessions({ groupId: id })); // Refresh sessions immediately
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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Group Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
          <GroupIcon sx={{ fontSize: 40, color: "secondary.main" }} />
          <Typography variant="h4" fontWeight="bold">
            {currentGroup.name}
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary">
          {currentGroup.description}
        </Typography>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Create Session Form */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <EventIcon color="secondary" />
          <Typography variant="h5" fontWeight="bold">
            Create Session
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Session Title"
            name="title"
            value={form.title}
            fullWidth
            margin="normal"
            onChange={handleChange}
            required
          />
          <TextField
            label="Description"
            name="description"
            value={form.description}
            fullWidth
            margin="normal"
            onChange={handleChange}
            multiline
            rows={2}
          />
          <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
            <TextField
              label="Start Time"
              name="start_time"
              value={form.start_time}
              type="datetime-local"
              fullWidth
              margin="normal"
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
              onClick={(e) => e.target.showPicker && e.target.showPicker()} // Make entire field clickable
              sx={{
                "& input": {
                  cursor: "pointer",
                },
              }}
            />
            <TextField
              label="End Time"
              name="end_time"
              value={form.end_time}
              type="datetime-local"
              fullWidth
              margin="normal"
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
              onClick={(e) => e.target.showPicker && e.target.showPicker()}
              sx={{
                "& input": {
                  cursor: "pointer",
                },
              }}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            startIcon={<EventIcon />}
            sx={{ mt: 2 }}
          >
            Create Session
          </Button>
        </Box>
      </Paper>

      <SessionsTable groupId={id} status="active" />
      <SessionsTable groupId={id} status="completed" />
      <UploadDocumentForm groupId={id} />
      <DocumentsTable admin groupId={id} />
    </Container>
  );
}
