import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardMedia, 
  IconButton, 
  TextField,
  InputAdornment,
  Alert,
  Snackbar
} from '@mui/material';
import { 
  Close as CloseIcon, 
  Delete as DeleteIcon, 
  Star as StarIcon, 
  StarBorder as StarBorderIcon,
  AddPhotoAlternate as AddPhotoIcon,
  Link as LinkIcon,
  PhotoLibrary as GalleryIcon
} from '@mui/icons-material';

const TripGalleryModal = ({ trip, onClose, onUpdateTrip }) => {
  const [images, setImages] = useState(trip?.images || []);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [highlightImage, setHighlightImage] = useState(trip?.highlightImage || 0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    setImages(trip?.images || []);
    setHighlightImage(trip?.highlightImage || 0);
  }, [trip]);

  const addImage = () => {
    if (newImageUrl.trim() && !images.includes(newImageUrl.trim())) {
      const updatedImages = [...images, newImageUrl.trim()];
      setImages(updatedImages);
      if (onUpdateTrip) {
        onUpdateTrip({ ...trip, images: updatedImages });
      }
      setNewImageUrl('');
      setSnackbarMessage('Image added successfully!');
      setSnackbarOpen(true);
    } else if (images.includes(newImageUrl.trim())) {
      setSnackbarMessage('This image is already in the gallery!');
      setSnackbarOpen(true);
    }
  };

  const removeImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    if (onUpdateTrip) {
      onUpdateTrip({ ...trip, images: updatedImages });
    }
    if (highlightImage === index) {
      setHighlightImage(0);
    } else if (highlightImage > index) {
      setHighlightImage(highlightImage - 1);
    }
    setSnackbarMessage('Image deleted!');
    setSnackbarOpen(true);
  };

  const setHighlight = (index) => {
    setHighlightImage(index);
    if (onUpdateTrip) {
      onUpdateTrip({ ...trip, highlightImage: index });
    }
    setSnackbarMessage('Highlight image updated!');
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Dialog open onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <GalleryIcon />
          <Typography variant="h6">Trip Gallery: {trip?.route}</Typography>
        </Box>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {/* Empty State */}
        {images.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <GalleryIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              No images yet
            </Typography>
          </Box>
        ) : (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {images.length} Image{images.length !== 1 ? 's' : ''}
            </Typography>
            
            <Grid container spacing={2}>
              {images.map((img, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="150"
                      image={img}
                      alt={`Trip image ${index + 1}`}
                      sx={{ objectFit: 'cover' }}
                    />
                    <Box sx={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 1 }}>
                      <IconButton 
                        size="small"
                        onClick={() => setHighlight(index)}
                        sx={{ 
                          bgcolor: index === highlightImage ? 'secondary.main' : 'rgba(0,0,0,0.6)', 
                          color: 'white'
                        }}
                      >
                        {index === highlightImage ? <StarIcon fontSize="small" /> : <StarBorderIcon fontSize="small" />}
                      </IconButton>
                      <IconButton 
                        size="small"
                        onClick={() => removeImage(index)}
                        sx={{ bgcolor: 'error.main', color: 'white' }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Add Images Section */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Add Images
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              placeholder="Paste image URL here"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && newImageUrl.trim()) {
                  addImage();
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LinkIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              onClick={addImage}
              disabled={!newImageUrl.trim()}
              startIcon={<AddPhotoIcon />}
            >
              Add
            </Button>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default TripGalleryModal;