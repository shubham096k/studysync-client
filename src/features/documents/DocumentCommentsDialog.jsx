import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import { useSelector } from "react-redux";
import axios from "../../utils/axiosConfig";

export default function DocumentCommentsDialog({ open, onClose, docId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const { user } = useSelector((s) => s.auth);
  const { currentGroup } = useSelector((s) => s.groups);

  const loadComments = async () => {
    const res = await axios.get(`/document-comments/?document=${docId}`);
    setComments(res.data);
  };

  // Used polling for loading the comments automatically on reload
  useEffect(() => {
  if (!open) return;
  
  // Load comments immediately
  loadComments();
  
  // Set up polling every 4 seconds
  const intervalId = setInterval(() => {
    loadComments();
  }, 4000);
  
  // Cleanup: clear interval when dialog closes or component unmounts
  return () => clearInterval(intervalId);
}, [open, docId]);


  const handleAdd = async () => {
    if (!text.trim()) return;
    await axios.post("/document-comments/", { document: docId, comment: text });
    setText("");
    loadComments();
  };

  const handleDelete = async (id) => {
    await axios.delete(`/document-comments/${id}/`);
    loadComments();
  };

  const canDeleteComment = (comment) => {
    return (
      user?.id == comment.user?.id || user?.id == currentGroup?.created_by?.id
    );
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Comments</DialogTitle>
      <DialogContent>
        <List>
          {comments.map((c) => (
            <ListItem
              key={c.id}
              secondaryAction={
                // Show delete button only if the current user is the comment author or the group admin
                canDeleteComment(c) && (
                  <Button color="error" onClick={() => handleDelete(c.id)}>
                    Delete
                  </Button>
                )
              }
            >
              <ListItemText
                primary={
                  <Box>
                    <Typography variant="body2" fontWeight="bold">
                      {c.user?.username || "Unknown User"}
                    </Typography>
                  </Box>
                }
                secondary={
                  <Box>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      {c.comment}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {c.created_at
                        ? new Date(c.created_at).toLocaleString()
                        : ""}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
        <TextField
          fullWidth
          label="Add comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
          multiline
          rows={2}
          sx={{ mt: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button onClick={handleAdd} variant="contained" disabled={!text.trim()}>
          Post
        </Button>
      </DialogActions>
    </Dialog>
  );
}
