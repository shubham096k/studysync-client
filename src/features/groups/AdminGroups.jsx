import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminGroups, createGroup } from './GroupsSlice';
import { Grid, Card, CardContent, Typography, Button, TextField, Box, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function AdminGroups() {
    const dispatch = useDispatch(); const navigate = useNavigate();
    const { adminGroups } = useSelector(s => s.groups);
    const [form, setForm] = useState({ name: '', description: '' });
    const [open, setOpen] = useState(false);
    useEffect(() => { dispatch(fetchAdminGroups()) }, [dispatch]);
    const handleSubmit = async (e) => { e.preventDefault(); await dispatch(createGroup(form)); setOpen(true); dispatch(fetchAdminGroups()); };
    return (<Box p={3}>
        <Typography variant="h6" gutterBottom>Create Group</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
            <TextField label="Name" name="name" fullWidth margin="dense" onChange={e => setForm({ ...form, [e.target.name]: e.target.value })} />
            <TextField label="Description" name="description" fullWidth margin="dense" onChange={e => setForm({ ...form, [e.target.name]: e.target.value })} />
            <Button type="submit" variant="contained" sx={{ mt: 1 }}>Create</Button>
        </Box>
        <Typography variant="h6" gutterBottom>My Admin Groups</Typography>
        <Grid container spacing={2}>
            {adminGroups.map(g => {
                return <Grid item xs={12} sm={6} md={4} key={g.id}>
                    <Card><CardContent>
                        <Typography variant="h6">{g.name}</Typography>
                        <Typography variant="body2">{g.description}</Typography>
                        <Button variant="outlined" sx={{ mt: 1 }} onClick={() => navigate(`/admin-groups/${g.id}`)}>View Group</Button>
                    </CardContent></Card>
                </Grid>
            })}
        </Grid>
        <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
            <Alert severity="success">Group Created</Alert>
        </Snackbar>
    </Box>);
}