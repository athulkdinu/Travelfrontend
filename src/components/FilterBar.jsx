import React from 'react';
import { 
  Paper, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Box, 
  Typography,
  InputAdornment
} from '@mui/material';
import { Search as SearchIcon, FilterList as FilterIcon } from '@mui/icons-material';

const FilterBar = ({ 
  searchTerm, 
  setSearchTerm, 
  filterType, 
  setFilterType, 
  sortBy, 
  setSortBy 
}) => {
  return (
    <Paper 
      elevation={2}
      sx={{ 
        p: { xs: 2, sm: 3 }, 
        mb: 3, 
        borderRadius: 3,
        background: 'linear-gradient(135deg, #ffffff 0%, #e3f2fd 100%)',
        border: '2px solid #1976d2'
      }}
    >
      <Typography 
        variant="h6" 
        sx={{ 
          mb: 2, 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          color: '#1565c0',
          fontWeight: 700,
          fontSize: { xs: '1rem', sm: '1.25rem' }
        }}
      >
        <FilterIcon />
        🔍 Search & Filter
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          placeholder="Search trips..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
          }}
          sx={{ 
            flex: { xs: '1 1 100%', sm: '1 1 250px' },
            minWidth: { xs: '100%', sm: '250px' },
            '& .MuiOutlinedInput-root': {
              bgcolor: 'white',
              '&:hover': {
                bgcolor: '#f5f5f5'
              }
            }
          }}
        />

        <FormControl sx={{ flex: { xs: '1 1 100%', sm: '0 0 150px' }, minWidth: { xs: '100%', sm: '150px' } }}>
          <InputLabel>🚗 Vehicle Type</InputLabel>
          <Select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            label="🚗 Vehicle Type"
            sx={{ bgcolor: 'white' }}
          >
            <MenuItem value="all">All Vehicles</MenuItem>
            <MenuItem value="car">🚗 Car</MenuItem>
            <MenuItem value="bike">🚲 Bike</MenuItem>
            <MenuItem value="bus">🚌 Bus</MenuItem>
            <MenuItem value="train">🚆 Train</MenuItem>
            <MenuItem value="motorcycle">🏍️ Motorcycle</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ flex: { xs: '1 1 100%', sm: '0 0 140px' }, minWidth: { xs: '100%', sm: '140px' } }}>
          <InputLabel>📊 Sort By</InputLabel>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            label="📊 Sort By"
            sx={{ bgcolor: 'white' }}
          >
            <MenuItem value="date">📅 Date</MenuItem>
            <MenuItem value="distance">📏 Distance</MenuItem>
            <MenuItem value="favorites">⭐ Favorites</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Paper>
  );
};

export default FilterBar;