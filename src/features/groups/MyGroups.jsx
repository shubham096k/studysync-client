import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyGroups, leaveGroup, fetchGroups } from "./GroupsSlice";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Container,
  Box,
  Chip,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import GroupIcon from "@mui/icons-material/Group";
import PeopleIcon from "@mui/icons-material/People";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function MyGroups() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { myGroups } = useSelector((s) => s.groups);
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    dispatch(fetchMyGroups());
  }, [dispatch]);
  const handleLeave = async (id) => {
    try {
      await dispatch(leaveGroup(id)).unwrap();
      setOpen(true);
      dispatch(fetchMyGroups()); // Refresh my groups
      dispatch(fetchGroups()); // Refresh explore groups
    } catch {}
  };
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
          <PeopleIcon sx={{ fontSize: 40, color: "secondary.main" }} />
          <Typography variant="h4" fontWeight="bold">
            My Groups
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary">
          Groups you've joined and are actively participating in
        </Typography>
      </Box>

      {/* Empty state when no groups */}
      {myGroups.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            px: 2,
          }}
        >
          <GroupIcon sx={{ fontSize: 80, color: "text.disabled", mb: 2 }} />
          <Typography variant="h5" gutterBottom color="text.secondary">
            You haven't joined any groups yet
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Start exploring and join groups to collaborate with others
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/explore")}
            sx={{ mt: 2 }}
          >
            Explore Groups
          </Button>
        </Box>
      ) : (
        /* card grid */
        <Grid container spacing={3}>
          {myGroups.map((g) => (
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
                    label="Member"
                    size="small"
                    color="secondary"
                    sx={{ mb: 2, width: "fit-content" }}
                  />

                  <Box sx={{ display: "flex", gap: 1, mt: "auto" }}>
                    <Button
                      variant="contained"
                      startIcon={<VisibilityIcon />}
                      onClick={() => navigate(`/my-groups/${g.id}`)}
                      sx={{ flex: 1 }}
                    >
                      View
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<ExitToAppIcon />}
                      onClick={() => handleLeave(g.id)}
                      sx={{ flex: 1 }}
                    >
                      Leave
                    </Button>
                  </Box>
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
        <Alert severity="info" sx={{ width: "100%" }}>
          Left group successfully
        </Alert>
      </Snackbar>
    </Container>
  );
}
