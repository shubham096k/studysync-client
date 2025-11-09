import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Footer() {
  return (
    <AppBar position="sticky" color="primary" sx={{ top: "auto", bottom: 0 }}>
      <Toolbar>
        <Typography variant="body2" sx={{ flexGrow: 1, textAlign: "center" }}>
          © {new Date().getFullYear()} StudySync
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
