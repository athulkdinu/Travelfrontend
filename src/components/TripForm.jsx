import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  Avatar,
  Grid,
  IconButton,
  Alert
} from '@mui/material';

import { 
  Close as CloseIcon, 
  PhotoCamera as PhotoIcon,
  DirectionsCar as CarIcon,
  DirectionsBike as BikeIcon,
  DirectionsBus as BusIcon,
  Train as TrainIcon,
  TwoWheeler as MotorcycleIcon
} from '@mui/icons-material';

const TripForm = ({ trip, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    vehicleType: 'car',
    route: '',
    distance: '',
    date: '',
    notes: '',
    image: '',
    images: []
  });

  const [imagePreview, setImagePreview] = useState('');
  const [imageError, setImageError] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    if (trip) {
      setFormData({
        vehicleType: trip.vehicleType || 'car',
        route: trip.route || '',
        distance: trip.distance || '',
        date: trip.date || '',
        notes: trip.notes || '',
        image: trip.image || '',
        images: trip.images || []
      });
      setImagePreview(trip.image || '');
      setImageUrls(trip.images || []);
    } else {
      const today = new Date().toISOString().split('T')[0];
      setFormData(prev => ({ ...prev, date: today }));
    }
  }, [trip]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'image') {
      setImagePreview(value);
      setImageError(false);
    }
  };

  const handleImageError = () => {
    setImageError(true);
    setImagePreview('');
  };

  const addImageUrl = () => {
    if (formData.image && !imageUrls.includes(formData.image)) {
      const newImages = [...imageUrls, formData.image];
      setImageUrls(newImages);
      setFormData(prev => ({ ...prev, images: newImages }));
      setFormData(prev => ({ ...prev, image: '' }));
      setImagePreview('');
    }
  };

  const removeImageUrl = (index) => {
    const newImages = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newImages);
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.route.trim()) {
      setAlertMessage('Please enter a route');
      setShowAlert(true);
      return;
    }
    if (!formData.distance || formData.distance <= 0) {
      setAlertMessage('Please enter a valid distance');
      setShowAlert(true);
      return;
    }
    if (!formData.date) {
      setAlertMessage('Please select a date');
      setShowAlert(true);
      return;
    }

    onSave({
      ...formData,
      distance: parseFloat(formData.distance),
      images: imageUrls
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

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">
          {trip ? 'Edit Trip' : 'Add New Trip'}
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {showAlert && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setShowAlert(false)}>
            {alertMessage}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Image Preview */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              src={imagePreview && !imageError ? imagePreview : undefined}
              sx={{ width: 60, height: 60, bgcolor: 'grey.200' }}
              onError={handleImageError}
            >
              {!imagePreview || imageError ? (
                <PhotoIcon />
              ) : (
                getVehicleIcon(formData.vehicleType)
              )}
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <TextField
                fullWidth
                label="Image URL"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="Enter image URL"
                size="small"
              />
            </Box>
            <Button
              variant="contained"
              onClick={addImageUrl}
              disabled={!formData.image || imageUrls.includes(formData.image)}
              size="small"
            >
              Add to Gallery
            </Button>
          </Box>

          {/* Image Gallery */}
          {imageUrls.length > 0 && (
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Gallery ({imageUrls.length} images)
              </Typography>
              <Grid container spacing={1}>
                {imageUrls.map((url, index) => (
                  <Grid item xs={6} sm={4} key={index}>
                    <Box sx={{ position: 'relative' }}>
                      <Avatar
                        src={url}
                        variant="rounded"
                        sx={{ width: '100%', height: 80 }}
                        onError={() => {
                          const newImages = imageUrls.filter((_, i) => i !== index);
                          setImageUrls(newImages);
                          setFormData(prev => ({ ...prev, images: newImages }));
                        }}
                      />
                      <IconButton
                        size="small"
                        onClick={() => removeImageUrl(index)}
                        sx={{
                          position: 'absolute',
                          top: 4,
                          right: 4,
                          bgcolor: 'white',
                          '&:hover': { bgcolor: 'grey.50' }
                        }}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* Vehicle Type */}
          <FormControl fullWidth>
            <InputLabel>Vehicle Type</InputLabel>
            <Select
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleInputChange}
              label="Vehicle Type"
            >
              <MenuItem value="car">Car</MenuItem>
              <MenuItem value="bike">Bike</MenuItem>
              <MenuItem value="bus">Bus</MenuItem>
              <MenuItem value="train">Train</MenuItem>
              <MenuItem value="motorcycle">Motorcycle</MenuItem>
            </Select>
          </FormControl>

          {/* Route */}
          <TextField
            fullWidth
            label="Route"
            name="route"
            value={formData.route}
            onChange={handleInputChange}
            placeholder="e.g., Kottayam to Trivandrum"
            required
          />

          {/* Distance */}
          <TextField
            fullWidth
            label="Distance (km)"
            name="distance"
            type="number"
            value={formData.distance}
            onChange={handleInputChange}
            placeholder="350"
            required
          />

          {/* Date */}
          <TextField
            fullWidth
            label="Date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            required
          />

          {/* Notes */}
          <TextField
            fullWidth
            label="Notes"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            placeholder="Any additional notes about this trip..."
            multiline
            rows={3}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          {trip ? 'Update Trip' : 'Add Trip'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TripForm;