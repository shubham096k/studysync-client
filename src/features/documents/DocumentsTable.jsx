import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDocuments,
  approveDocument,
  deleteDocument,
} from "./DocumentsSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Typography,
  Box,
  Paper,
  Chip,
  TableContainer,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import CommentIcon from "@mui/icons-material/Comment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import DocumentCommentsDialog from "./DocumentCommentsDialog";

export default function DocumentsTable({ admin, groupId }) {
  // groupId prop
  const dispatch = useDispatch();
  const { documents } = useSelector((s) => s.documents);
  const [open, setOpen] = React.useState(false);
  const [docId, setDocId] = React.useState(null);

  useEffect(() => {
    dispatch(fetchDocuments(groupId)); // Pass groupId
  }, [dispatch, groupId]); // Added groupId to dependencies

  const handleApprove = async (id) => {
    // Made async
    await dispatch(approveDocument(id));
    dispatch(fetchDocuments(groupId)); // Refresh after approval
  };

  const handleDelete = async (id) => {
    // Made async
    await dispatch(deleteDocument(id));
    dispatch(fetchDocuments(groupId)); // Refresh after deletion
  };
  const handleComments = (id) => {
    setDocId(id);
    setOpen(true);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <DescriptionIcon color="secondary" />
        <Typography variant="h5" fontWeight="bold">
          Documents
        </Typography>
      </Box>

      <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ bgcolor: "grey.100" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Uploaded By</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    No documents uploaded yet
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              documents.map((d) => (
                <TableRow
                  key={d.id}
                  sx={{
                    "&:hover": { bgcolor: "grey.50" },
                    transition: "background-color 0.2s",
                  }}
                >
                  <TableCell sx={{ fontWeight: 500 }}>{d.title}</TableCell>
                  <TableCell>{d.uploaded_by?.username}</TableCell>
                  <TableCell>
                    <Chip
                      label={d.approved ? "Approved" : "Pending"}
                      color={d.approved ? "success" : "warning"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<CommentIcon />}
                        onClick={() => handleComments(d.id)}
                      >
                        Comments
                      </Button>
                      {admin && !d.approved && (
                        <Button
                          size="small"
                          variant="contained"
                          color="success"
                          startIcon={<CheckCircleIcon />}
                          onClick={() => handleApprove(d.id)}
                        >
                          Approve
                        </Button>
                      )}
                      {admin && (
                        <Button
                          size="small"
                          variant="outlined"
                          color="error"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleDelete(d.id)}
                        >
                          Delete
                        </Button>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {open && (
        <DocumentCommentsDialog
          open={open}
          onClose={() => setOpen(false)}
          docId={docId}
        />
      )}
    </Box>
  );
}
