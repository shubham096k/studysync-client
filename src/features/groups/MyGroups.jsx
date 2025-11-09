import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyGroups, leaveGroup } from './GroupsSlice';
import { Grid, Card, CardContent, Typography, Button, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function MyGroups() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { myGroups } = useSelector(s => s.groups);
    const [open, setOpen] = React.useState(false);
    useEffect(() => { dispatch(fetchMyGroups()) }, [dispatch]);
    const handleLeave = async (id) => {
        try { await dispatch(leaveGroup(id)).unwrap(); setOpen(true); } catch { }
    };
    return (<>
        <Grid container spacing={2} p={3}>
            {myGroups.map(g => (
                <Grid item xs={12} sm={6} md={4} key={g.id}>
                    <Card><CardContent>
                        <Typography variant="h6">{g.name}</Typography>
                        <Typography variant="body2" sx={{ mb: 2 }}>{g.description}</Typography>
                        <Button
                            variant="outlined"
                            onClick={() => navigate(`/my-groups/${g.id}`)}
                        >
                            View Group
                        </Button>
                        <Button variant="outlined" onClick={() => handleLeave(g.id)}>Leave</Button>
                    </CardContent></Card>
                </Grid>
            ))}
        </Grid>
        <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
            <Alert severity="info" sx={{ width: '100%' }}>Left group</Alert>
        </Snackbar>
    </>);
}