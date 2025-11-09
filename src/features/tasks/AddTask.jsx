// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import {
//     Box, Typography, TextField, Button, List, ListItem,
//     ListItemText, IconButton, Chip
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import axios from '../../utils/axiosConfig';


// export default function AddTask() {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const sessionId = location.state?.sessionId;

//     const [form, setForm] = useState({ title: '', description: '' });
//     const [tasks, setTasks] = useState([]);

//     useEffect(() => {
//         if (sessionId) fetchTasks();
//     }, [sessionId]);

//     const fetchTasks = async () => {
//         const res = await axios.get(`/tasks/?session=${sessionId}`);
//         setTasks(res.data);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         await axios.post('/tasks/', {
//             title: form.title,
//             description: form.description,
//             status: 'pending',
//             session: sessionId
//         });
//         setForm({ title: '', description: '' });
//         fetchTasks();
//     };

//     const handleToggleStatus = async (task) => {
//         const newStatus = task.status === 'pending' ? 'complete' : 'pending';
//         await axios.patch(`/tasks/${task.id}/`, { status: newStatus });
//         fetchTasks();
//     };

//     const handleDelete = async (taskId) => {
//         await axios.delete(`/tasks/${taskId}/`);
//         fetchTasks();
//     };

//     return (
//         <Box p={3} maxWidth={800} mx="auto">
//             <Typography variant="h4" gutterBottom>Create Task</Typography>

//             {/* Create Form */}
//             <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
//                 <TextField
//                     fullWidth
//                     label="Enter Task"
//                     value={form.title}
//                     onChange={(e) => setForm({ ...form, title: e.target.value })}
//                     margin="normal"
//                     required
//                 />
//                 <TextField
//                     fullWidth
//                     label="Description"
//                     value={form.description}
//                     onChange={(e) => setForm({ ...form, description: e.target.value })}
//                     margin="normal"
//                     multiline
//                     rows={3}
//                 />
//                 <Button type="submit" variant="contained" sx={{ mt: 2 }}>
//                     Create Task
//                 </Button>
//             </Box>

//             {/* Task List */}
//             <Typography variant="h5" gutterBottom>Tasks</Typography>
//             <List>
//                 {tasks.map((task) => (
//                     <ListItem
//                         key={task.id}
//                         sx={{
//                             border: '1px solid #e0e0e0',
//                             borderRadius: 1,
//                             mb: 1,
//                             bgcolor: task.status === 'complete' ? '#f5f5f5' : 'white'
//                         }}
//                         secondaryAction={
//                             <Box>
//                                 <Chip
//                                     label={task.status}
//                                     color={task.status === 'complete' ? 'success' : 'warning'}
//                                     onClick={() => handleToggleStatus(task)}
//                                     sx={{ mr: 1, cursor: 'pointer' }}
//                                 />
//                                 <IconButton onClick={() => handleDelete(task.id)}>
//                                     <DeleteIcon />
//                                 </IconButton>
//                             </Box>
//                         }
//                     >
//                         <ListItemText
//                             primary={
//                                 <Typography
//                                     sx={{
//                                         textDecoration: task.status === 'complete' ? 'line-through' : 'none'
//                                     }}
//                                 >
//                                     {task.title}
//                                 </Typography>
//                             }
//                             secondary={task.description}
//                         />
//                     </ListItem>
//                 ))}
//             </List>

//             <Button onClick={() => navigate(-1)} variant="outlined" sx={{ mt: 3 }}>
//                 Back to Sessions
//             </Button>
//         </Box>
//     );
// }

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Box, Typography, TextField, Button, List, ListItem,
    ListItemText, IconButton, Chip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentIcon from '@mui/icons-material/Assignment'; // ADDED: Import task icon
import axios from '../../utils/axiosConfig';


export default function AddTask() {
    const location = useLocation();
    const navigate = useNavigate();
    const sessionId = location.state?.sessionId;

    const [form, setForm] = useState({ title: '', description: '' });
    const [tasks, setTasks] = useState([]);
    const [sessionData, setSessionData] = useState(null); // ADDED: State for session data

    useEffect(() => {
        if (sessionId) {
            fetchTasks();
            fetchSessionData(); // ADDED: Fetch session data
        }
    }, [sessionId]);

    const fetchTasks = async () => {
        const res = await axios.get(`/tasks/?session=${sessionId}`);
        setTasks(res.data);
    };

    // ADDED: Function to fetch session data
    const fetchSessionData = async () => {
        try {
            const res = await axios.get(`/sessions/${sessionId}/`);
            setSessionData(res.data);
        } catch (error) {
            console.error('Error fetching session data:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('/tasks/', {
            title: form.title,
            description: form.description,
            status: 'pending',
            session: sessionId
        });
        setForm({ title: '', description: '' });
        fetchTasks();
    };

    const handleToggleStatus = async (task) => {
        const newStatus = task.status === 'pending' ? 'complete' : 'pending';
        await axios.patch(`/tasks/${task.id}/`, { status: newStatus });
        fetchTasks();
    };

    const handleDelete = async (taskId) => {
        await axios.delete(`/tasks/${taskId}/`);
        fetchTasks();
    };

    return (
        <Box p={3} maxWidth={800} mx="auto">
            {/* ADDED: Session Name and Description Section */}
            {sessionData && (
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" gutterBottom>
                        {sessionData.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                        {sessionData.description}
                    </Typography>
                </Box>
            )}

            {/* MODIFIED: Changed h4 to h5 and added icon */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <AssignmentIcon /> {/* ADDED: Task icon */}
                <Typography variant="h5">Create Task</Typography> {/* MODIFIED: Changed from h4 to h5 */}
            </Box>

            {/* Create Form */}
            <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
                <TextField
                    fullWidth
                    label="Enter Task"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    margin="normal"
                    multiline
                    rows={3}
                />
                <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                    Create Task
                </Button>
            </Box>

            {/* Task List */}
            <Typography variant="h5" gutterBottom>Tasks</Typography>
            <List>
                {tasks.map((task) => (
                    <ListItem
                        key={task.id}
                        sx={{
                            border: '1px solid #e0e0e0',
                            borderRadius: 1,
                            mb: 1,
                            bgcolor: task.status === 'complete' ? '#f5f5f5' : 'white'
                        }}
                        secondaryAction={
                            <Box>
                                <Chip
                                    label={task.status}
                                    color={task.status === 'complete' ? 'success' : 'warning'}
                                    onClick={() => handleToggleStatus(task)}
                                    sx={{ mr: 1, cursor: 'pointer' }}
                                />
                                <IconButton onClick={() => handleDelete(task.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        }
                    >
                        <ListItemText
                            primary={
                                <Typography
                                    sx={{
                                        textDecoration: task.status === 'complete' ? 'line-through' : 'none'
                                    }}
                                >
                                    {task.title}
                                </Typography>
                            }
                            secondary={task.description}
                        />
                    </ListItem>
                ))}
            </List>

            <Button onClick={() => navigate(-1)} variant="outlined" sx={{ mt: 3 }}>
                Back to Sessions
            </Button>
        </Box>
    );
}