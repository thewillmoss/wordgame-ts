import React, {DragEventHandler, FunctionComponent} from 'react'; // importing FunctionComponent
import './Board.css';
import {Square} from "./Square";
type Char = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K'
    | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X'
    | 'Y' | 'Z' | '_' | ' '

type BoardProps = {
    letters : string[][]
    letterMultiplier : number[][]
    wordMultiplier : number[][]
    onDrop : DragEventHandler
}

export const Board: FunctionComponent<BoardProps> = ({letters, letterMultiplier, wordMultiplier, onDrop}) =>
    <div className="tileGrid">
        {Array.from(Array(225).keys()).map((key) =>
            <div key={key} id={"b" + key} className="tileContainer">
                <Square id={key + "_square"}
                        onDrop = {onDrop}
                        key={key + "_square"}
                        letter={letters[Math.floor(key / 15)][key % 15]}
                        highlight={false}
                        letterMultiplier={letterMultiplier[Math.floor(key / 15)][key % 15]}
                        wordMultiplier={wordMultiplier[Math.floor(key / 15)][key % 15]}/>
            </div>)}
    </div>;
