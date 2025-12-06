import React, { memo, useCallback } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
  Paper,
  Typography,
  Chip,
  Stack,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import type { FilterState, PetType } from '../../types';

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  petCounts: Record<PetType | 'all', number>;
}

const petTypes: Array<{ value: PetType | 'all'; label: string; emoji: string }> = [
  { value: 'all', label: 'Все', emoji: '🐾' },
  { value: 'cat', label: 'Коты', emoji: '🐱' },
  { value: 'dog', label: 'Собаки', emoji: '🐕' },
  { value: 'rabbit', label: 'Кролики', emoji: '🐰' },
  { value: 'hamster', label: 'Хомяки', emoji: '🐹' },
  { value: 'parrot', label: 'Попугаи', emoji: '🦜' },
];

const sortOptions: Array<{ value: FilterState['sortBy']; label: string }> = [
  { value: 'name', label: 'По имени' },
  { value: 'age', label: 'По возрасту' },
  { value: 'energy', label: 'По энергии' },
];

const FilterPanel: React.FC<FilterPanelProps> = memo(({ filters, onFilterChange, petCounts }) => {
  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onFilterChange({
        ...filters,
        searchQuery: event.target.value,
      });
    },
    [filters, onFilterChange]
  );

  const handleTypeChange = useCallback(
    (type: PetType | 'all') => {
      onFilterChange({
        ...filters,
        type,
      });
    },
    [filters, onFilterChange]
  );

  const handleSortChange = useCallback(
    (event: SelectChangeEvent<FilterState['sortBy']>) => {
      onFilterChange({
        ...filters,
        sortBy: event.target.value as FilterState['sortBy'],
      });
    },
    [filters, onFilterChange]
  );

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 3,
        background: 'linear-gradient(145deg, rgba(26, 26, 46, 0.9) 0%, rgba(22, 33, 62, 0.9) 100%)',
        backdropFilter: 'blur(10px)',
        borderRadius: 3,
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <FilterListIcon sx={{ color: 'primary.main' }} />
        <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
          Фильтры и поиск
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Поле поиска */}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Поиск по имени питомца..."
          value={filters.searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: <SearchIcon sx={{ color: 'rgba(255,255,255,0.5)', mr: 1 }} />,
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              color: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.2)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.3)',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'primary.main',
              },
            },
            '& .MuiInputBase-input::placeholder': {
              color: 'rgba(255, 255, 255, 0.5)',
            },
          }}
        />

        {/* Фильтр по типу */}
        <Box>
          <Typography
            variant="subtitle2"
            sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <span role="img" aria-label="animals">🐾</span>
            Тип питомца
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {petTypes.map((petType) => (
              <Chip
                key={petType.value}
                label={`${petType.emoji} ${petType.label} (${petCounts[petType.value] || 0})`}
                onClick={() => handleTypeChange(petType.value)}
                variant={filters.type === petType.value ? 'filled' : 'outlined'}
                sx={{
                  color: filters.type === petType.value ? 'white' : 'rgba(255, 255, 255, 0.7)',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  backgroundColor: filters.type === petType.value 
                    ? 'primary.main' 
                    : 'transparent',
                  '&:hover': {
                    backgroundColor: filters.type === petType.value 
                      ? 'primary.dark' 
                      : 'rgba(255, 255, 255, 0.1)',
                  },
                  mb: 1,
                }}
              />
            ))}
          </Stack>
        </Box>

        {/* Сортировка */}
        <FormControl variant="outlined" sx={{ minWidth: 200 }}>
          <InputLabel
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              '&.Mui-focused': { color: 'primary.main' },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <SortIcon fontSize="small" />
              Сортировка
            </Box>
          </InputLabel>
          <Select
            value={filters.sortBy}
            onChange={handleSortChange}
            label="Сортировка"
            sx={{
              color: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.2)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.3)',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
              },
              '& .MuiSvgIcon-root': {
                color: 'rgba(255, 255, 255, 0.7)',
              },
            }}
          >
            {sortOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Paper>
  );
});

FilterPanel.displayName = 'FilterPanel';

export default FilterPanel;

