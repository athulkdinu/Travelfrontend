import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Typography,
  Box,
  Divider
} from '@mui/material';
import { 
  DirectionsCar as CarIcon,
  Favorite as FavoriteIcon,
  Map as MapIcon,
  WbSunny as WeatherIcon
} from '@mui/icons-material';
import WEATHER_APP_CONFIG from '../config/weatherConfig';

const Sidebar = ({ open, onClose, onShowAllTrips, onShowFavorites, onOpenMap, showOnlyFavorites }) => {
  const handleWeatherClick = () => {
    if (WEATHER_APP_CONFIG.enabled && WEATHER_APP_CONFIG.url) {
      if (WEATHER_APP_CONFIG.openInNewTab) {
        window.open(WEATHER_APP_CONFIG.url, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = WEATHER_APP_CONFIG.url;
      }
    }
    onClose(); // Close sidebar after clicking
  };

  const menuItems = [
    { text: 'All Trips', icon: <CarIcon />, onClick: onShowAllTrips, active: !showOnlyFavorites },
    { text: 'Favorited', icon: <FavoriteIcon />, onClick: onShowFavorites, active: showOnlyFavorites },
    { text: 'Map', icon: <MapIcon />, onClick: onOpenMap, active: false },
  ];

  // Add weather option if enabled
  if (WEATHER_APP_CONFIG.enabled && WEATHER_APP_CONFIG.showInSidebar) {
    menuItems.push({ 
      text: 'Weather Forecast', 
      icon: <WeatherIcon />, 
      onClick: handleWeatherClick, 
      active: false,
      highlight: true 
    });
  }

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: 280,
          boxSizing: 'border-box',
          background: 'linear-gradient(180deg, #1976d2 0%, #1565c0 25%, #ffffff 25%)',
        },
      }}
    >
      <Box sx={{ 
        p: 3,
        background: 'transparent',
        color: 'white'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <Box sx={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            border: '2px solid rgba(255,255,255,0.3)'
          }}>
            🚗
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 0.5 }}>
              Adventure
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.9 }}>
              Trip Tracker
            </Typography>
          </Box>
        </Box>
      </Box>
      
      <List sx={{ px: 2 }}>
        {menuItems.map((item, index) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              onClick={item.onClick}
              sx={{
                borderRadius: 2,
                py: 1.5,
                bgcolor: item.active ? '#e3f2fd' : (item.highlight ? '#fff3e0' : 'transparent'),
                border: item.active ? '2px solid #1976d2' : (item.highlight ? '2px solid #ff9800' : '2px solid transparent'),
                '&:hover': {
                  bgcolor: item.highlight ? '#ffe0b2' : '#e3f2fd',
                  transform: 'translateX(4px)',
                  '& .MuiListItemIcon-root': {
                    color: item.highlight ? '#ff9800' : '#1976d2'
                  }
                },
                transition: 'all 0.2s'
              }}
            >
              <ListItemIcon sx={{ 
                minWidth: 40,
                color: item.active ? '#1976d2' : (item.highlight ? '#ff9800' : '#666'),
                transition: 'color 0.2s'
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: item.active ? 700 : 600,
                  fontSize: '0.95rem',
                  color: item.active ? '#1976d2' : (item.highlight ? '#e65100' : 'inherit')
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ 
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        p: 2,
        borderRadius: 2,
        background: 'linear-gradient(135deg, #e3f2fd 0%, #fff3e0 100%)',
        border: '2px solid #1976d2'
      }}>
        <Typography variant="caption" sx={{ fontWeight: 600, color: '#1565c0', display: 'block', mb: 0.5 }}>
          🎯 Quick Stats
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
          Your adventure is here 
        </Typography>
      </Box>
    </Drawer>
  );
};

export default Sidebar;