import { useState, useEffect, useMemo, useCallback } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { EventProvider } from './context/EventContext';

import Header from './components/Header';
import FilterPanel from './components/FilterPanel';
import PetList from './components/PetList';
import EventLog from './components/EventLog';

import { mockPets } from './data/mockPets';
import type { Pet, FilterState, PetType } from './types';

import useLocalStorage from './hooks/useLocalStorage';

import './styles/global.scss';
import styles from './App.module.scss';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#667eea',
    },
    secondary: {
      main: '#764ba2',
    },
    background: {
      default: '#0f0f1a',
      paper: '#1a1a2e',
    },
  },
  typography: {
    fontFamily: '"Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: 'rgba(255,255,255,0.2) rgba(255,255,255,0.05)',
        },
      },
    },
  },
});

const initialFilters: FilterState = {
  type: 'all',
  searchQuery: '',
  sortBy: 'name',
};

function App() {
  const [pets, setPets] = useState<Pet[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [filters, setFilters] = useLocalStorage<FilterState>(
    'cyberzoo-filters',
    initialFilters
  );

  useEffect(() => {
    const loadPets = async () => {
      setIsLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setPets(mockPets);
      setIsLoading(false);
    };

    loadPets();
  }, []);

  const petCounts = useMemo(() => {
    const counts: Record<PetType | 'all', number> = {
      all: pets.length,
      cat: 0,
      dog: 0,
      rabbit: 0,
      hamster: 0,
      parrot: 0,
    };

    pets.forEach((pet) => {
      counts[pet.type]++;
    });

    return counts;
  }, [pets]);

  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
  }, [setFilters]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <EventProvider>
        <div className={styles.app}>
          <Header />
          <main className={styles.main}>
            <div className={styles.content}>
              <FilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                petCounts={petCounts}
              />

              <PetList
                pets={pets}
                filters={filters}
                isLoading={isLoading}
              />
            </div>
          </main>
          
          <EventLog />
        </div>
      </EventProvider>
    </ThemeProvider>
  );
}

export default App;
