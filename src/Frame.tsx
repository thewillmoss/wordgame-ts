import React, {DragEventHandler, FunctionComponent} from 'react'; // importing FunctionComponent
import './Frame.css';
import {Tile} from "./Tile";
type Char = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K'
    | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X'
    | 'Y' | 'Z' | '_' | ' '

type FrameProps = {
    letters : string[]
    dragStart?: DragEventHandler
}

export const Frame: FunctionComponent<FrameProps> = ({letters,dragStart}) =>
    <div className="tileGrid">
        {Array.from(Array(letters.length).keys()).map((key) =>
            <div key = {key} id = {"f"+key} className="tileContainer">
                <Tile
                    id={key+"f"}
                    key = {key+"_tile"}
                      letter={letters[key]}
                      highlight={true}
                      draggable={true}
                      dragStart={dragStart}/>
            </div>)}
    </div>
