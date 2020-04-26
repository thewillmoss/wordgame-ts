import React, {DragEventHandler, FunctionComponent} from 'react';
import './Tile.css';

type TileProps = {
    letter: string
    highlight: boolean
    id?: string
    draggable?: boolean
    dragStart?: DragEventHandler
}
export const Tile: FunctionComponent<TileProps> = ({ letter, highlight, draggable, dragStart, id}) =>
    <div id = {letter+id} className={(!highlight ? "tile_wrapper" : "tile_wrapper highlight")} draggable={draggable} onDragStart={dragStart}>
            <div className="noselect tile_label">
                {letter}
            </div>
            <div className = "noselect tile_score">
                {subScore(letter)}
            </div>
    </div>

let subScore = (letter: string): number => {
    return 3;
}
