export type Movie = {
    id: string
    title: string
    year: number
    posterUrl: string
    isFavorite: boolean
}

export type ViewMode = 'grid' | 'list'