import React, {Component, DragEventHandler} from 'react'; // importing FunctionComponent
import './Square.css';
import {Tile} from "./Tile";
type Char = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K'
    | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X'
    | 'Y' | 'Z' | '_' | ' '

type SquareProps = {
    id: string
    letter: string
    wordMultiplier: number
    letterMultiplier: number
    highlight: boolean
    onDrop : DragEventHandler
}

export class Square extends Component<SquareProps, {}> {


    squareType = (letterMultiplier: number, wordMultiplier: number): string => {
        if(wordMultiplier==3)
            return "word_3x";
        else if(wordMultiplier==2)
            return "word_2x"
        else if(letterMultiplier==3)
            return "letter_3x"
        else if(letterMultiplier==2)
            return "letter_2x"
        else
            return "none"
    }
    render() {
        return(
        <div className={"square_wrapper "+this.squareType(this.props.letterMultiplier, this.props.wordMultiplier)}
                onDrop = {this.props.onDrop} onDragOver={(event) => event.preventDefault()}
                id = {this.props.id}>
            {this.props.letter!=' ' ? <Tile letter = {this.props.letter} highlight={false}/> : ""}
        </div>
        );
    }
}
export default Square;