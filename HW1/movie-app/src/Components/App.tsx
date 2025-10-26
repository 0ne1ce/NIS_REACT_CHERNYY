import React, { useMemo, useState } from 'react'
import Header from './Header.tsx'
import SearchBar from './SearchBar.tsx'
import MovieList from './MovieList.tsx'
import { initialMovies } from '../Data/movies.ts'
import type { Movie, ViewMode } from '../types.ts'

const App: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>(initialMovies)
    const [view, setView] = useState<ViewMode>('grid')
    const [onlyFavorites, setOnlyFavorites] = useState<boolean>(false)
    const [query, setQuery] = useState<string>('')

    const handleToggleFavorite = (id: string) => {
        setMovies(prev => prev.map(m => m.id === id ? { ...m, isFavorite: !m.isFavorite } : m))
    }

    const handleSearch = (q: string) => {
        setQuery(q.toLowerCase())
    }

    const handleClear = () => setQuery('')

    const filtered = useMemo(() => {
        return movies.filter(m => {
            if(onlyFavorites && !m.isFavorite) return false
            if(query && !m.title.toLowerCase().includes(query)) return false
            return true
        })
    }, [movies, onlyFavorites, query])

    return (
        <main className="app">
            <Header view={view} onViewChange={setView} showOnlyFavorites={onlyFavorites} onFilterFavorites={setOnlyFavorites} />
            <div style={{display:'flex',gap:12,alignItems:'center',marginBottom:12}}>
                <SearchBar onSearch={handleSearch} onClear={handleClear} />
            </div>
            <MovieList movies={filtered} onToggleFavorite={handleToggleFavorite} view={view} />
        </main>
    )
}

export default App