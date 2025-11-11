import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSessions, removeSession } from "./SessionsSlice";
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
import moment from "moment";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export default function SessionsTable({ groupId, status, userView = false }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sessions } = useSelector((s) => s.sessions);
  const { user } = useSelector((s) => s.auth); // Get current user
  const { currentGroup } = useSelector((s) => s.groups); // Get current group

  useEffect(() => {
    dispatch(fetchSessions({ groupId }));
  }, [dispatch, groupId]);

  const handleDelete = (id) => {
    dispatch(removeSession(id)).then(() => {
      dispatch(fetchSessions({ groupId })); // Refresh sessions after deletion
    });
  };
  const handleAddTask = (sessionId) => {
    navigate("/add-task", { state: { sessionId } });
  };

  // Check if current user is the group admin - using == for type-safe comparison, loose equality operator
  const isAdmin = user?.id == currentGroup?.created_by?.id;

  const filterSessionsByTime = () => {
    const now = moment();

    return sessions.filter((session) => {
      const endTime = moment(session.end_time);

      const isExpired = endTime.isBefore(now);

      if (status === "active") {
        return !isExpired;
      } else if (status === "completed") {
        return isExpired;
      }
      return true;
    });
  };

  const filteredSessions = filterSessionsByTime();

  return (
    <Box sx={{ mt: 4 }}>
      {/* Section Header */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <AccessTimeIcon color="secondary" />
        <Typography variant="h5" fontWeight="bold">
          {status === "active" ? "Active Sessions" : "Completed Sessions"}
        </Typography>
      </Box>

      {/* Enhanced Table */}
      <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ bgcolor: "grey.100" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Start</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>End</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              {!userView && (
                <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSessions.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={userView ? 5 : 6}
                  align="center"
                  sx={{ py: 4 }}
                >
                  <Typography variant="body1" color="text.secondary">
                    No {status} sessions
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredSessions.map((s) => {
                const now = moment();
                const endTime = moment(s.end_time);
                const isActive = !endTime.isBefore(now);
                return (
                  <TableRow
                    key={s.id}
                    sx={{
                      "&:hover": { bgcolor: "grey.50" },
                      transition: "background-color 0.2s",
                    }}
                  >
                    <TableCell sx={{ fontWeight: 500 }}>{s.title}</TableCell>
                    <TableCell>{s.description}</TableCell>
                    <TableCell>{moment(s.start_time).format("lll")}</TableCell>
                    <TableCell>{moment(s.end_time).format("lll")}</TableCell>
                    <TableCell>
                      <Chip
                        label={isActive ? "Active" : "Completed"}
                        color={isActive ? "success" : "default"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        {isActive && (
                          <Button
                            variant="contained"
                            size="small"
                            startIcon={<AssignmentIcon />}
                            onClick={() => handleAddTask(s.id)}
                          >
                            Tasks
                          </Button>
                        )}

                        {isAdmin && (
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            startIcon={<DeleteIcon />}
                            onClick={() => handleDelete(s.id)}
                          >
                            Delete
                          </Button>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
