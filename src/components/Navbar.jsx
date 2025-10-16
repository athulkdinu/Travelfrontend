import { 
  AppBar,
  Toolbar, 
  Typography, 
  Box,
  IconButton,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  ListItemIcon
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  DirectionsCar as CarIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  Close as CloseIcon,
  WbSunny as WeatherIcon
} from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import WEATHER_APP_CONFIG from '../config/weatherConfig';

const Navbar = ({ onOpenSidebar, mapOpen, setMapOpen }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleOpenMenu = (e) => setAnchorEl(e.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);
  const handleOpenMap = () => setMapOpen(true);
  const handleCloseMap = () => setMapOpen(false);

  const handleLogout = () => {
    handleCloseMenu();
    logout();
    navigate('/login');
  };

  const handleWeatherClick = () => {
    if (WEATHER_APP_CONFIG.enabled && WEATHER_APP_CONFIG.url) {
      if (WEATHER_APP_CONFIG.openInNewTab) {
        window.open(WEATHER_APP_CONFIG.url, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = WEATHER_APP_CONFIG.url;
      }
    }
  };

  // Get user initials for avatar
  const getInitials = (name) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <AppBar 
      position="static" 
      elevation={3}
      sx={{ 
        background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
        borderBottom: '3px solid #ff9800'
      }}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
          <IconButton 
            size="large" 
            edge="start" 
            color="inherit" 
            aria-label="menu" 
            onClick={onOpenSidebar}
          >
            <MenuIcon />
          </IconButton>
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: { xs: 1, sm: 1.5 },
            background: 'rgba(255,255,255,0.15)',
            px: { xs: 1.5, sm: 2 },
            py: 0.5,
            borderRadius: 3
          }}>
            <CarIcon sx={{ fontSize: { xs: 24, sm: 32 } }} />
            <Box>
              <Typography variant="h6" component="div" sx={{ fontWeight: 700, letterSpacing: 0.5, fontSize: { xs: '0.9rem', sm: '1.25rem' } }}>
                🚗 Trip Tracker
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.95, fontWeight: 500, display: { xs: 'none', sm: 'block' } }}>
                Track your road adventures
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}>
          {WEATHER_APP_CONFIG.enabled && WEATHER_APP_CONFIG.showInNavbar && (
            <Chip 
              label={WEATHER_APP_CONFIG.buttonText || '🌤️ Weather'} 
              size="small" 
              onClick={handleWeatherClick}
              icon={<WeatherIcon sx={{ color: 'white !important' }} />}
              sx={{ 
                bgcolor: 'rgba(255,152,0,0.9)', 
                color: 'white',
                fontWeight: 600,
                cursor: 'pointer',
                display: { xs: 'none', md: 'flex' },
                '&:hover': {
                  bgcolor: 'rgba(255,152,0,1)',
                  transform: 'scale(1.05)',
                  boxShadow: '0 4px 12px rgba(255,152,0,0.4)'
                },
                transition: 'all 0.2s'
              }} 
            />
          )}

          <Chip 
            label="🗺️ Route Tracking" 
            size="small" 
            onClick={handleOpenMap}
            sx={{ 
              bgcolor: 'rgba(255,255,255,0.2)', 
              color: 'white',
              fontWeight: 600,
              cursor: 'pointer',
              display: { xs: 'none', md: 'flex' },
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.3)',
                transform: 'scale(1.05)'
              },
              transition: 'all 0.2s'
            }} 
          />
         
          
          <Tooltip title="Notifications">
            <IconButton 
              color="inherit" 
              sx={{ 
                bgcolor: 'rgba(255,255,255,0.1)',
                display: { xs: 'none', sm: 'inline-flex' },
                '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
              }}
            >
              <NotificationsIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title={user?.fullName || 'Profile'}>
            <IconButton color="inherit" onClick={handleOpenMenu}>
              <Avatar 
                sx={{ 
                  width: { xs: 32, sm: 36 }, 
                  height: { xs: 32, sm: 36 }, 
                  bgcolor: '#ff9800', 
                  fontWeight: 700,
                  fontSize: { xs: '0.9rem', sm: '1rem' }
                }}
              >
                {user ? getInitials(user.fullName) : '👤'}
              </Avatar>
            </IconButton>
          </Tooltip>
          
          <Menu 
            anchorEl={anchorEl} 
            open={open} 
            onClose={handleCloseMenu}
            PaperProps={{
              sx: {
                mt: 1.5,
                minWidth: 220,
                borderRadius: 2,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <Box sx={{ px: 2, py: 1.5, bgcolor: '#f5f5f5' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1976d2' }}>
                {user?.fullName}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                @{user?.username}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {user?.email}
              </Typography>
            </Box>
            <Divider />
            <MenuItem onClick={handleCloseMenu} sx={{ py: 1.5 }}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              My Profile
            </MenuItem>
            <MenuItem onClick={handleCloseMenu} sx={{ py: 1.5 }}>
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <Divider />
            <MenuItem 
              onClick={handleLogout} 
              sx={{ 
                py: 1.5, 
                color: 'error.main',
                '&:hover': {
                  bgcolor: 'error.light',
                  color: 'error.dark'
                }
              }}
            >
              <ListItemIcon>
                <LogoutIcon fontSize="small" color="error" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>

      {/* Google Maps Modal */}
      <Dialog 
        open={mapOpen} 
        onClose={handleCloseMap}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            minHeight: '80vh'
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
          color: 'white',
          fontWeight: 700
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            🗺️ Google Maps - Route Tracking
          </Box>
          <IconButton 
            onClick={handleCloseMap}
            sx={{ color: 'white' }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0, height: '70vh' }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.95373631531654!3d-37.81720997975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sEnvato!5e0!3m2!1sen!2sau!4v1234567890123!5m2!1sen!2sau"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps"
          />
        </DialogContent>
        <DialogActions sx={{ p: 2, bgcolor: '#f5f5f5' }}>
          <Button 
            onClick={handleCloseMap}
            variant="contained"
            color="primary"
            sx={{ fontWeight: 600 }}
          >
            Close Map
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};

export default Navbar;