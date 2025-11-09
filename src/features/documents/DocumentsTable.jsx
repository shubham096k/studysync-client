import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDocuments, approveDocument, deleteDocument } from './DocumentsSlice';
import {
  Table, TableBody, TableCell, TableHead,
  TableRow, Button, Typography, Box
} from '@mui/material';
import DocumentCommentsDialog from './DocumentCommentsDialog';

export default function DocumentsTable({ admin }) {
  const dispatch = useDispatch();
  const { documents } = useSelector((s) => s.documents);
  const [open, setOpen] = React.useState(false);
  const [docId, setDocId] = React.useState(null);
  useEffect(() => { dispatch(fetchDocuments()); }, [dispatch]);

  const handleApprove = (id) => dispatch(approveDocument(id));
  const handleDelete = (id) => dispatch(deleteDocument(id));
  const handleComments = (id) => { setDocId(id); setOpen(true); };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6">Documents</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Uploaded By</TableCell>
            <TableCell>Approved</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {documents.map((d) => (
            <TableRow key={d.id}>
              <TableCell>{d.title}</TableCell>
              <TableCell>{d.uploaded_by?.username}</TableCell>
              <TableCell>{d.approved ? 'Yes' : 'No'}</TableCell>
              <TableCell>
                <Button onClick={() => handleComments(d.id)}>Comments</Button>
                {admin && !d.approved && (
                  <Button onClick={() => handleApprove(d.id)}>Approve</Button>
                )}
                {admin && (
                  <Button color="error" onClick={() => handleDelete(d.id)}>Delete</Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {open && <DocumentCommentsDialog open={open} onClose={() => setOpen(false)} docId={docId} />}
    </Box>
  );
}