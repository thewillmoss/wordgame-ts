import React, {DragEventHandler, FunctionComponent, ReactNode, ReactNodeArray} from 'react'; // importing FunctionComponent
import './Board.css';
import {Square} from "./Square";
import {Tile} from "./Tile";
import {isElement} from "react-dom/test-utils";
type Char = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K'
    | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X'
    | 'Y' | 'Z' | '_' | ' '

type BoardProps = {
    letters : ReactNode[][]
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
                        tile={getTile(key, letters)}
                        letterMultiplier={letterMultiplier[Math.floor(key / 15)][key % 15]}
                        wordMultiplier={wordMultiplier[Math.floor(key / 15)][key % 15]}/>
            </div>)}
    </div>;

let getTile = (num:number,letters:ReactNode[][]): ReactNode => {
    if(letters[Math.floor(num / 15)]){
        if(isElement(letters[Math.floor(num / 15)][num % 15])){
            return letters[Math.floor(num / 15)][num % 15];
        }
    }
    return "";
}

