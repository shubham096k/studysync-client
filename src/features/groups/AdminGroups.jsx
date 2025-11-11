import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminGroups, createGroup } from "./GroupsSlice";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Box,
  Snackbar,
  Alert,
  Container,
  Chip,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import GroupIcon from "@mui/icons-material/Group";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function AdminGroups() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { adminGroups } = useSelector((s) => s.groups);
  const [form, setForm] = useState({ name: "", description: "" });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAdminGroups());
  }, [dispatch]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createGroup(form));
    setOpen(true);
    dispatch(fetchAdminGroups());
    setForm({ name: "", description: "" }); // set the form to blank after submit
  };
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
          <AdminPanelSettingsIcon
            sx={{ fontSize: 40, color: "secondary.main" }}
          />
          <Typography variant="h4" fontWeight="bold">
            Admin Groups
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary">
          Manage groups where you are an administrator
        </Typography>
      </Box>

      {/* Create Group Form */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <AddIcon color="secondary" />
          <Typography variant="h5" fontWeight="bold">
            Create New Group
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Group Name"
            name="name"
            fullWidth
            margin="normal"
            required
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, [e.target.name]: e.target.value })
            }
          />
          <TextField
            label="Description"
            name="description"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            required
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, [e.target.name]: e.target.value })
            }
          />
          <Button
            type="submit"
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ mt: 2 }}
            disabled={!form.name || !form.description}
          >
            Create Group
          </Button>
        </Box>
      </Paper>

      {/* Section Header for Admin Groups */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Your Admin Groups
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Groups you have created and manage
        </Typography>
      </Box>

      {/* Empty state when no admin groups */}
      {adminGroups.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            px: 2,
          }}
        >
          <GroupIcon sx={{ fontSize: 80, color: "text.disabled", mb: 2 }} />
          <Typography variant="h5" gutterBottom color="text.secondary">
            No admin groups yet
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Create your first group to get started
          </Typography>
        </Box>
      ) : (
        /* card grid */
        <Grid container spacing={3}>
          {adminGroups.map((g) => (
            <Grid item xs={12} sm={6} md={4} key={g.id}>
              <Card
                elevation={2}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent
                  sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 2,
                    }}
                  >
                    <GroupIcon color="secondary" />
                    <Typography variant="h6" fontWeight="bold">
                      {g.name}
                    </Typography>
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2, flexGrow: 1 }}
                  >
                    {g.description}
                  </Typography>

                  <Chip
                    label="Admin"
                    size="small"
                    color="secondary"
                    sx={{ mb: 2, width: "fit-content" }}
                  />

                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<VisibilityIcon />}
                    onClick={() => navigate(`/admin-groups/${g.id}`)}
                    sx={{ mt: "auto" }}
                  >
                    Manage Group
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Group created successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
}
