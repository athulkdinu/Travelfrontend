import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import {
  Box,
  ThemeProvider, 
  createTheme, 
  CssBaseline
} from '@mui/material';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import Register from './components/Register';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';

// Theme setup
const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#ff9800' },
    background: { default: '#f5f5f5', paper: '#fff' },
  },
  typography: { fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif' },
  shape: { borderRadius: 12 },
});

function App() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/login" 
          element={
            user ? <Navigate to="/" replace /> : <Login />
          } 
        />
        <Route 
          path="/register" 
          element={
            user ? <Navigate to="/" replace /> : <Register />
          } 
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e3f2fd 0%, #fff3e0 50%, #e8f5e9 100%)', backgroundAttachment: 'fixed' }}>
                <Navbar 
                  onOpenSidebar={() => setSidebarOpen(true)} 
                  mapOpen={mapOpen}
                  setMapOpen={setMapOpen}
                />
                <Sidebar 
                  open={sidebarOpen} 
                  onClose={() => setSidebarOpen(false)}
                  onShowAllTrips={() => {
                    setShowOnlyFavorites(false);
                    setSidebarOpen(false);
                  }}
                  onShowFavorites={() => {
                    setShowOnlyFavorites(true);
                    setSidebarOpen(false);
                  }}
                  onOpenMap={() => {
                    setMapOpen(true);
                    setSidebarOpen(false);
                  }}
                  showOnlyFavorites={showOnlyFavorites}
                />
                <Home />
              </Box>
            </ProtectedRoute>
          }
        />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
