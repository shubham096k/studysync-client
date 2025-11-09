// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchSessions, removeSession } from './SessionsSlice';
// import {
//   Table, TableBody, TableCell, TableHead,
//   TableRow, Button, Typography, Box
// } from '@mui/material';


// export default function SessionsTable({ groupId, status, userView = false }) {
//   const dispatch = useDispatch();
//   const { sessions } = useSelector((s) => s.sessions);
//   useEffect(() => {
//     dispatch(fetchSessions({ groupId, status }));
//   }, [dispatch, groupId, status]);

//   const handleDelete = (id) => dispatch(removeSession(id));


//   return (
//     <Box sx={{ mt: 3 }}>
//       <Typography variant="h6" sx={{ mb: 1 }}>
//         {status === 'active' ? 'Active Sessions' : 'Completed Sessions'}
//       </Typography>
//       <Table size="small">
//         <TableHead>
//           <TableRow>
//             <TableCell>Title</TableCell>
//             <TableCell>Description</TableCell>
//             <TableCell>Start</TableCell>
//             <TableCell>End</TableCell>
//             {!userView && <TableCell>Action</TableCell>}
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {sessions.map((s) => (
//             <TableRow key={s.id}>
//               <TableCell>{s.title}</TableCell>
//               <TableCell>{s.description}</TableCell>
//               <TableCell>{s.start_time}</TableCell>
//               <TableCell>{s.end_time}</TableCell>
//               {!userView && (
//                 <TableCell>
//                   <Button color="error" onClick={() => handleDelete(s.id)}>
//                     Delete
//                   </Button>
//                 </TableCell>
//               )}
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </Box>
//   );
// }
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSessions, removeSession } from './SessionsSlice';
import {
  Table, TableBody, TableCell, TableHead,
  TableRow, Button, Typography, Box
} from '@mui/material';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';


export default function SessionsTable({ groupId, status, userView = false }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sessions } = useSelector((s) => s.sessions);

  useEffect(() => {
    dispatch(fetchSessions({ groupId }));
  }, [dispatch, groupId]);

  const handleDelete = (id) => dispatch(removeSession(id));
  const handleAddTask = (sessionId) => {
    navigate('/add-task', { state: { sessionId } });
  };

  const filterSessionsByTime = () => {
    const now = moment();

    return sessions.filter((session) => {
      const endTime = moment(session.end_time);

      const isExpired = endTime.isBefore(now);

      if (status === 'active') {
        return !isExpired;
      } else if (status === 'completed') {
        return isExpired;
      }
      return true;
    });
  };

  const filteredSessions = filterSessionsByTime();

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        {status === 'active' ? 'Active Sessions' : 'Completed Sessions'}
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Start</TableCell>
            <TableCell>End</TableCell>
            {!userView && <TableCell>Action</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredSessions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={userView ? 4 : 5} align="center">
                <Typography variant="body2" color="text.secondary">
                  No {status} sessions
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            filteredSessions.map((s) => {
              const now = moment();
              const endTime = moment(s.end_time);
              const isActive = !endTime.isBefore(now);
              return <TableRow key={s.id}>
                <TableCell>{s.title}</TableCell>
                <TableCell>{s.description}</TableCell>
                <TableCell>{moment(s.start_time).format('lll')}</TableCell>
                <TableCell>{moment(s.end_time).format('lll')}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {/* Add Task - Show to EVERYONE for active sessions */}
                    {isActive && (
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleAddTask(s.id)}
                      >
                        Tasks
                      </Button>
                    )}

                    {/* Delete - Only for ADMIN */}
                    {!userView && (
                      <Button
                        color="error"
                        size="small"
                        onClick={() => handleDelete(s.id)}
                      >
                        Delete
                      </Button>
                    )}
                  </Box>
                </TableCell>

              </TableRow>
            })
          )}
        </TableBody>
      </Table>
    </Box>
  );
}
