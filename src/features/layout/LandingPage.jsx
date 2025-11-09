import React from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
  Stack,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  Groups as GroupsIcon,
  School as SchoolIcon,
  EmojiObjects as IdeaIcon,
  TrendingUp as GrowthIcon,
  Schedule as ScheduleIcon,
  Forum as ForumIcon,
} from "@mui/icons-material";

export default function LandingPage() {
  const features = [
    {
      icon: <GroupsIcon sx={{ fontSize: 50 }} />,
      title: "Collaborative Groups",
      description:
        "Create and join study groups with like-minded learners from around the world",
    },
    {
      icon: <SchoolIcon sx={{ fontSize: 50 }} />,
      title: "Shared Resources",
      description:
        "Access and share study materials, notes, and learning resources effortlessly",
    },
    {
      icon: <IdeaIcon sx={{ fontSize: 50 }} />,
      title: "Knowledge Exchange",
      description:
        "Learn from peers, share insights, and grow together as a community",
    },
    {
      icon: <GrowthIcon sx={{ fontSize: 50 }} />,
      title: "Track Progress",
      description:
        "Monitor your learning journey and celebrate achievements with your group",
    },
    {
      icon: <ScheduleIcon sx={{ fontSize: 50 }} />,
      title: "Flexible Sessions",
      description:
        "Organize study sessions that fit your schedule and learning pace",
    },
    {
      icon: <ForumIcon sx={{ fontSize: 50 }} />,
      title: "Active Discussions",
      description:
        "Engage in meaningful conversations and get help when you need it",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        height: "100vh",
        bgcolor: "background.default",
        overflowX: "hidden",
      }}
    >
      {" "}
      {/* MODIFIED: Added overflowX hidden */}
      {/* Hero Section */}
      <Box
        sx={{
          background: (theme) =>
            `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.dark} 100%)`, // MODIFIED: Changed to secondary color
          color: "white",
          py: { xs: 8, md: 12 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <Box
          sx={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            bgcolor: "rgba(255, 255, 255, 0.1)",
            display: { xs: "none", md: "block" },
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -150,
            left: -150,
            width: 500,
            height: 500,
            borderRadius: "50%",
            bgcolor: "rgba(255, 255, 255, 0.05)",
            display: { xs: "none", md: "block" },
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ textAlign: "center", maxWidth: 800, mx: "auto" }}>
            <Typography
              variant="h2"
              gutterBottom
              sx={{
                fontWeight: 800,
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                textShadow: "0 2px 10px rgba(0,0,0,0.2)",
              }}
            >
              Welcome to StudySync
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 5,
                fontWeight: 300,
                opacity: 0.95,
                fontSize: { xs: "1.2rem", md: "1.5rem" },
              }}
            >
              Collaborate, Learn, and Share Knowledge with Peers
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
            >
              <Button
                component={Link}
                to="/register"
                variant="contained"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  borderRadius: 2,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 12px 25px rgba(0,0,0,0.4)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Get Started
              </Button>
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  borderRadius: 2,
                  borderColor: "white",
                  color: "white",
                  borderWidth: 2,
                  "&:hover": {
                    borderWidth: 2,
                    borderColor: "white",
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Already a Member? Login
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>
      {/* Stats Section */}
      <Container
        maxWidth="lg"
        sx={{ mt: -6, mb: 8, position: "relative", zIndex: 2 }}
      >
        <Grid container spacing={3}>
          {[
            { number: "10K+", label: "Active Students" },
            { number: "500+", label: "Study Groups" },
            { number: "50K+", label: "Resources Shared" },
          ].map((stat, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                elevation={4}
                sx={{
                  p: 4,
                  textAlign: "center",
                  borderRadius: 3,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    background: (theme) =>
                      `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.main} 100%)`, // MODIFIED: Changed to secondary color
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {stat.number}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ fontWeight: 500 }}
                >
                  {stat.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{ fontWeight: 700, color: "text.primary" }}
          >
            Why Choose StudySync?
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: "auto" }}
          >
            Everything you need to succeed in your learning journey, all in one
            place
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  p: 3,
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "divider",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: (theme) =>
                      `0 12px 30px ${theme.palette.primary.main}33`, // MODIFIED: Changed to primaryy color with transparency
                    borderColor: "primary.main", // MODIFIED: Changed to primary.main
                  },
                }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      mx: "auto",
                      mb: 2,
                      background: (theme) =>
                        `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.main} 100%)`, // Changed to primary color
                      color: "white",
                    }}
                  >
                    {feature.icon}
                  </Avatar>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* CTA Section */}
      <Box
        sx={{
          bgcolor: "grey.100",
          py: 10,
          mt: 8,
        }}
      >
        <Container maxWidth="md">
          <Paper
            elevation={8}
            sx={{
              p: 6,
              textAlign: "center",
              borderRadius: 4,
              background: (theme) =>
                `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.dark} 100%)`, // MODIFIED: Changed to secondary color
              color: "white",
            }}
          >
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
              Ready to Start Your Journey?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.95 }}>
              Join thousands of students already learning together
            </Typography>
            <Button
              component={Link}
              to="/register"
              variant="contained"
              size="large"
              sx={{
                bgcolor: "white",
                color: "primary.main", // MODIFIED: Changed to secondary.main
                px: 5,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: 600,
                borderRadius: 2,
                "&:hover": {
                  bgcolor: "grey.100",
                  transform: "scale(1.05)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Get Started for Free
            </Button>
          </Paper>
        </Container>
      </Box>
      {/* Footer Section */}
      <Box
        sx={{
          bgcolor: "background.paper",
          py: 4,
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} StudySync. Empowering learners
            worldwide.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
