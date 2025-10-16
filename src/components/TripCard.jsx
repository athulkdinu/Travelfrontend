import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  IconButton,
  Box,
  Chip,
  Stack
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  PhotoLibrary as GalleryIcon,
  DirectionsCar as CarIcon,
  DirectionsBike as BikeIcon,
  DirectionsBus as BusIcon,
  Train as TrainIcon,
  TwoWheeler as MotorcycleIcon,
  Straighten as DistanceIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material';

const TripCard = ({ trip, onEdit, onDelete, onToggleFavorite, onOpenGallery }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getVehicleIcon = (vehicleType) => {
    switch (vehicleType.toLowerCase()) {
      case 'car':
        return <CarIcon />;
      case 'bike':
        return <BikeIcon />;
      case 'bus':
        return <BusIcon />;
      case 'train':
        return <TrainIcon />;
      case 'motorcycle':
        return <MotorcycleIcon />;
      default:
        return <CarIcon />;
    }
  };

  const getVehicleColor = (vehicleType) => {
    switch (vehicleType.toLowerCase()) {
      case 'car':
        return 'primary';
      case 'bike':
        return 'secondary';
      case 'bus':
        return 'success';
      case 'train':
        return 'info';
      case 'motorcycle':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      borderRadius: 3,
      border: '2px solid transparent',
      background: 'white',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 12px 24px rgba(25,118,210,0.2)',
        borderColor: '#1976d2'
      }
    }}>
      {/* Image Section */}
      <Box sx={{ position: 'relative', height: { xs: 160, sm: 200 }, overflow: 'hidden' }}>
        {trip.image ? (
          <CardMedia
            component="img"
            height="200"
            image={trip.image}
            alt={trip.route}
            sx={{ 
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
              height: '100%',
              '&:hover': {
                transform: 'scale(1.1)'
              }
            }}
          />
        ) : (
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #e3f2fd 0%, #fff3e0 100%)',
              color: '#1976d2',
              fontSize: { xs: '2.5rem', sm: '3rem' }
            }}
          >
            {getVehicleIcon(trip.vehicleType)}
          </Box>
        )}
        
        {/* Gradient Overlay */}
        <Box sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
          pointerEvents: 'none'
        }} />
        
        {/* Favorite Button */}
        <IconButton
          onClick={onToggleFavorite}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            bgcolor: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            '&:hover': { 
              bgcolor: 'white',
              transform: 'scale(1.1)'
            },
            transition: 'all 0.2s'
          }}
        >
          {trip.isFavorite ? (
            <FavoriteIcon sx={{ color: '#ff1744' }} />
          ) : (
            <FavoriteBorderIcon sx={{ color: '#666' }} />
          )}
        </IconButton>
      </Box>

      {/* Content Section */}
      <CardContent sx={{ flexGrow: 1, pb: 1, p: { xs: 1.5, sm: 2 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: { xs: 1.5, sm: 2 }, flexWrap: 'wrap', gap: 1 }}>
          <Typography variant="h6" component="h3" sx={{ 
            fontWeight: 700, 
            flexGrow: 1, 
            mr: 1,
            color: '#1565c0',
            lineHeight: 1.3,
            fontSize: { xs: '1rem', sm: '1.25rem' }
          }}>
            {trip.route}
          </Typography>
          <Chip 
            label={trip.vehicleType}
            color={getVehicleColor(trip.vehicleType)}
            size="small"
            icon={getVehicleIcon(trip.vehicleType)}
            sx={{ 
              fontWeight: 600,
              borderRadius: 2,
              fontSize: { xs: '0.7rem', sm: '0.8125rem' }
            }}
          />
        </Box>

        <Stack spacing={{ xs: 1, sm: 1.5 }} sx={{ mb: { xs: 1.5, sm: 2 } }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: { xs: 0.5, sm: 1 },
            p: { xs: 0.75, sm: 1 },
            bgcolor: '#e3f2fd',
            borderRadius: 2
          }}>
            <DistanceIcon sx={{ fontSize: { xs: 16, sm: 18 }, color: '#1976d2' }} />
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#1565c0', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
              {trip.distance} km
            </Typography>
          </Box>
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: { xs: 0.5, sm: 1 },
            p: { xs: 0.75, sm: 1 },
            bgcolor: '#fff3e0',
            borderRadius: 2
          }}>
            <CalendarIcon sx={{ fontSize: { xs: 16, sm: 18 }, color: '#f57c00' }} />
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#e65100', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
              {formatDate(trip.date)}
            </Typography>
          </Box>
        </Stack>

        {trip.notes && (
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              fontStyle: 'italic',
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              lineHeight: 1.5
            }}
          >
            💭 {trip.notes}
          </Typography>
        )}
      </CardContent>

      {/* Action Buttons */}
      <CardActions sx={{ 
        p: { xs: 1.5, sm: 2 }, 
        pt: 1,
        gap: { xs: 0.5, sm: 1 },
        borderTop: '2px solid #f5f5f5',
        flexWrap: 'wrap'
      }}>
        <Button
          onClick={onEdit}
          startIcon={<EditIcon />}
          variant="outlined"
          size="small"
          sx={{ 
            flexGrow: 1,
            fontWeight: 600,
            borderRadius: 2,
            borderWidth: 2,
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
            minWidth: { xs: 'auto', sm: 'initial' },
            px: { xs: 1, sm: 2 },
            '&:hover': {
              borderWidth: 2,
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 8px rgba(25,118,210,0.2)'
            },
            transition: 'all 0.2s'
          }}
        >
          Edit
        </Button>
        
        <Button
          onClick={onOpenGallery}
          startIcon={<GalleryIcon />}
          variant="outlined"
          color="secondary"
          size="small"
          sx={{ 
            flexGrow: 1,
            fontWeight: 600,
            borderRadius: 2,
            borderWidth: 2,
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
            minWidth: { xs: 'auto', sm: 'initial' },
            px: { xs: 1, sm: 2 },
            '&:hover': {
              borderWidth: 2,
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 8px rgba(255,152,0,0.2)'
            },
            transition: 'all 0.2s'
          }}
        >
          Gallery
        </Button>
        
        <IconButton
          onClick={onDelete}
          color="error"
          size="small"
          sx={{ 
            border: '2px solid',
            borderColor: 'error.main',
            borderRadius: 2,
            minWidth: { xs: 32, sm: 40 },
            width: { xs: 32, sm: 40 },
            height: { xs: 32, sm: 40 },
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 8px rgba(211,47,47,0.2)'
            },
            transition: 'all 0.2s'
          }}
        >
          <DeleteIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default TripCard;