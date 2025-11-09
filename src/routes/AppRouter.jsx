import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'; // MODIFIED: Added useLocation
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setUserFromToken } from '../features/auth/AuthSlice';
import theme from '../theme/muiTheme';
import Navbar from '../features/layout/Navbar';
import Footer from '../features/layout/Footer';
import LandingPage from '../features/layout/LandingPage';
import LoginPage from '../features/auth/LoginPage';
import RegisterPage from '../features/auth/RegisterPage';
import ExploreGroups from '../features/groups/ExploreGroups';
import MyGroups from '../features/groups/MyGroups';
import AdminGroups from '../features/groups/AdminGroups';
import AdminGroupView from '../features/groups/AdminGroupView';
import PrivateRoute from './PrivateRoute';
import MyGroupView from '../features/groups/MyGroupView';
import AddTask from '../features/tasks/AddTask';

// Layout wrapper component to conditionally render Navbar and Footer
function Layout({ children }) {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <>
      {!isLandingPage && <Navbar />} {/* ADDED: Conditional Navbar */}
      <div style={{ width: "100%", minHeight: "100vh" }}>
        {children}
      </div>
      {!isLandingPage && <Footer />} {/* ADDED: Conditional Footer */}
    </>
  );
}

export default function AppRouter() {
  const dispatch = useDispatch();

  // Load user from token on app startup
  useEffect(() => {
    dispatch(setUserFromToken());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        {/* Wrapped Routes with Layout component */}
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<PrivateRoute />}>
              <Route path="/explore" element={<ExploreGroups />} />
              <Route path="/my-groups" element={<MyGroups />} />
              <Route path="/my-groups/:id" element={<MyGroupView />} />
              <Route path="/admin-groups" element={<AdminGroups />} />
              <Route path="/admin-groups/:id" element={<AdminGroupView />} />
              <Route path="/add-task" element={<AddTask />} />
            </Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider >
  );
}