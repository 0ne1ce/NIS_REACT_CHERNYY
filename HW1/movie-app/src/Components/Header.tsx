import React from 'react'
import "./Controls.css";
import type { ViewMode } from '../types'

type Props = {
    view: ViewMode
    onViewChange: (v: ViewMode) => void
    showOnlyFavorites: boolean
    onFilterFavorites: (v: boolean) => void
}

const Header: React.FC<Props> = ({ view, onViewChange, showOnlyFavorites, onFilterFavorites }) => {
    return (
        <header className="header" aria-label="Панель управления">
            <h1 style={{margin:0}}>Каталог фильмов</h1>
            <div className="controls">
                <div role="tablist" aria-label="Фильтр">
                    <button
                        className="button"
                        aria-pressed={!showOnlyFavorites}
                        onClick={() => onFilterFavorites(false)}
                    >Все</button>
                    <button
                        className="button"
                        aria-pressed={showOnlyFavorites}
                        onClick={() => onFilterFavorites(true)}
                    >Только избранные</button>
                </div>
                <div className="view-toggle" aria-hidden={false}>
                    <button className="button" aria-pressed={view==='grid'} onClick={()=>onViewChange('grid')}>Плитка</button>
                    <button className="button" aria-pressed={view==='list'} onClick={()=>onViewChange('list')}>Список</button>
                </div>
            </div>
        </header>
    )
}

export default Header