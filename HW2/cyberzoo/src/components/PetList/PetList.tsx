import React, { useMemo, memo } from 'react';
import { Skeleton, Box } from '@mui/material';
import type { Pet, FilterState } from '../../types';
import PetCard from '../PetCard';
import styles from './PetList.module.scss';

interface PetListProps {
  pets: Pet[];
  filters: FilterState;
  isLoading: boolean;
}

const PetCardSkeleton: React.FC = () => (
  <Box
    sx={{
      background: 'linear-gradient(145deg, rgba(26, 26, 46, 0.95) 0%, rgba(22, 33, 62, 0.95) 100%)',
      borderRadius: 3,
      padding: 3,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 1.5,
    }}
  >
    {/* Возраст */}
    <Skeleton 
      variant="text" 
      width={50} 
      height={20} 
      sx={{ bgcolor: 'rgba(255,255,255,0.1)', alignSelf: 'flex-end' }} 
    />
    
    {/* Аватар */}
    <Skeleton 
      variant="circular" 
      width={80} 
      height={80} 
      sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} 
    />
    
    {/* Имя */}
    <Skeleton 
      variant="text" 
      width={120} 
      height={32} 
      sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} 
    />
    
    {/* Тип */}
    <Skeleton 
      variant="text" 
      width={80} 
      height={20} 
      sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} 
    />
    
    {/* Бейдж настроения */}
    <Skeleton 
      variant="rounded" 
      width={90} 
      height={28} 
      sx={{ bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 2 }} 
    />
    
    {/* Статы */}
    <Box sx={{ width: '100%', mt: 1 }}>
      {[1, 2, 3].map((i) => (
        <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Skeleton variant="text" width={60} height={16} sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
          <Skeleton variant="rounded" width="100%" height={8} sx={{ bgcolor: 'rgba(255,255,255,0.1)', flexGrow: 1 }} />
          <Skeleton variant="text" width={35} height={16} sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
        </Box>
      ))}
    </Box>
    
    {/* Кнопки действий */}
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center', mt: 1 }}>
      {[1, 2, 3, 4].map((i) => (
        <Skeleton 
          key={i}
          variant="rounded" 
          width={85} 
          height={36} 
          sx={{ bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 2 }} 
        />
      ))}
    </Box>
  </Box>
);

const PetList: React.FC<PetListProps> = memo(({ pets, filters, isLoading }) => {
  const filteredAndSortedPets = useMemo(() => {
    let result = [...pets];

    if (filters.type !== 'all') {
      result = result.filter((pet) => pet.type === filters.type);
    }

    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase().trim();
      result = result.filter((pet) =>
        pet.name.toLowerCase().includes(query)
      );
    }

    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name, 'ru');
        case 'age':
          return a.age - b.age;
        case 'energy':
          return b.energy - a.energy;
        default:
          return 0;
      }
    });

    return result;
  }, [pets, filters]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.grid}>
          {Array.from({ length: 4 }).map((_, index) => (
            <PetCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (filteredAndSortedPets.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>
          <span className={styles.emptyIcon} role="img" aria-label="sad face">
            😿
          </span>
          <h3>Питомцы не найдены</h3>
          <p>Попробуйте изменить параметры фильтрации</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.count}>
        Найдено питомцев: <strong>{filteredAndSortedPets.length}</strong>
      </div>
      <div className={styles.grid}>
        {filteredAndSortedPets.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
    </div>
  );
});

PetList.displayName = 'PetList';

export default PetList;

