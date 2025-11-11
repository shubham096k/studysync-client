import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Divider,
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../auth/AuthSlice";
import axios from "../../utils/axiosConfig";

export default function Navbar() {
  const { token } = useSelector((s) => s.auth);
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getButtonStyles = (path) => ({
    backgroundColor: location.pathname.startsWith(path)
      ? "rgba(255, 255, 255, 0.2)"
      : "transparent",
    borderBottom: location.pathname.startsWith(path)
      ? "2px solid white"
      : "2px solid transparent",
    borderRadius: 0,
    "&:hover": {
      backgroundColor: location.pathname.startsWith(path)
        ? "rgba(255, 255, 255, 0.3)"
        : "rgba(255, 255, 255, 0.1)",
    },
  });

  useEffect(() => {
    if (token) {
      axios
        .get("/profile/")
        .then((res) => setUser(res.data))
        .catch((err) => console.error("Failed to fetch profile:", err));
    }
  }, [token]);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    dispatch(logout());
    setUser(null);
    navigate("/");
  };

  const handleProfileNavigate = () => {
    handleClose();
    navigate("/profile");
  };

  // Get first letter of username
  const getInitial = () => {
    return user?.username?.charAt(0).toUpperCase() || "U";
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          StudySync
        </Typography>
        {!token ? (
          <>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          </>
        ) : (
          <>
            <Button
              color="inherit"
              component={Link}
              to="/explore"
              sx={getButtonStyles("/explore")}
            >
              Explore
            </Button>

            <Button
              color="inherit"
              component={Link}
              to="/my-groups"
              sx={getButtonStyles("/my-groups")}
            >
              My Groups
            </Button>

            <Button
              color="inherit"
              component={Link}
              to="/admin-groups"
              sx={getButtonStyles("/admin-groups")}
            >
              Admin Groups
            </Button>

            {/* Profile Avatar with First Letter */}
            <Box sx={{ ml: 2 }}>
              <Avatar
                src={user?.profile_picture}
                alt={user?.username}
                sx={{
                  width: 40,
                  height: 40,
                  cursor: "pointer",
                  bgcolor: "secondary.main",
                  "&:hover": { opacity: 0.8 },
                }}
                onClick={handleProfileClick}
              >
                {getInitial()}
              </Avatar>
            </Box>

            {/* Profile Menu */}
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <Box sx={{ px: 2, py: 1.5, minWidth: 200 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {user?.username || "User"}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  User ID: {user?.user_id}
                </Typography>
              </Box>

              <Divider />

              {/* <MenuItem onClick={handleProfileNavigate}>View Profile</MenuItem>
                            <MenuItem onClick={handleClose}>Settings</MenuItem>

                            <Divider /> */}

              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
