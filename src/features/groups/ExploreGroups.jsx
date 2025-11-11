import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroups, joinGroup, fetchMyGroups } from "./GroupsSlice";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Snackbar,
  Alert,
  Box,
  Container,
  Chip,
} from "@mui/material";
import ExploreIcon from "@mui/icons-material/Explore";
import GroupIcon from "@mui/icons-material/Group";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

export default function ExploreGroups() {
  const dispatch = useDispatch();
  const { groups } = useSelector((s) => s.groups);
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);
  const handleJoin = async (id) => {
    try {
      await dispatch(joinGroup(id)).unwrap();
      setOpen(true);
      dispatch(fetchGroups()); // Refresh explore groups
      dispatch(fetchMyGroups()); // Refresh my groups
    } catch {}
  };
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
          <ExploreIcon sx={{ fontSize: 40, color: "secondary.main" }} />
          <Typography variant="h4" fontWeight="bold">
            Explore Groups
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary">
          Discover and join groups that match your interests
        </Typography>
      </Box>

      {/* Empty state when no groups available */}
      {groups.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            px: 2,
          }}
        >
          <GroupIcon sx={{ fontSize: 80, color: "text.disabled", mb: 2 }} />
          <Typography variant="h5" gutterBottom color="text.secondary">
            No groups available to join
          </Typography>
          <Typography variant="body1" color="text.secondary">
            You've already joined all available groups or there are no groups
            yet
          </Typography>
        </Box>
      ) : (
        /* card grid */
        <Grid container spacing={3}>
          {groups.map((g) => (
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
                    label="Available"
                    size="small"
                    color="success"
                    variant="outlined"
                    sx={{ mb: 2, width: "fit-content" }}
                  />

                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<GroupAddIcon />}
                    onClick={() => handleJoin(g.id)}
                    sx={{ mt: "auto" }}
                  >
                    Join Group
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
          Joined group successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
}
