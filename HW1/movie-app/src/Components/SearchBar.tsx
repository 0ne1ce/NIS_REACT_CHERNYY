import React, { useRef } from 'react'
import "./Controls.css";

type Props = {
    onSearch: (q: string) => void
    onClear?: () => void
}

const SearchBar: React.FC<Props> = ({ onSearch, onClear }) => {
    const inputRef = useRef<HTMLInputElement | null>(null)

    const handleSearch = () => {
        const q = inputRef.current?.value ?? ''
        onSearch(q.trim())
    }

    return (
        <div className="search" role="search">
            <input ref={inputRef} aria-label="Поиск по названию" placeholder="Поиск по названию..." />
            <button className="button" onClick={handleSearch}>Найти</button>
            <button className="button" onClick={() => { if(inputRef.current) inputRef.current.value=''; onClear?.() }}>Сброс</button>
        </div>
    )
}

export default SearchBar