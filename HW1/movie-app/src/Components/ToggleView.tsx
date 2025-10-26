import React from 'react'
import type { ViewMode } from '../types'

type Props = { view: ViewMode; onChange: (v: ViewMode)=>void }

const ToggleView: React.FC<Props> = ({ view, onChange }) => (
    <div className="view-toggle" role="tablist" aria-label="Режим отображения">
        <button className="button" aria-pressed={view==='grid'} onClick={()=>onChange('grid')}>Grid</button>
        <button className="button" aria-pressed={view==='list'} onClick={()=>onChange('list')}>List</button>
    </div>
)

export default ToggleView