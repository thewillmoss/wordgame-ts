import React, {cloneElement, Component, ReactNode} from 'react';
import './App.css';
import {Board} from "./Board";
import {Frame} from "./Frame";
import Square from "./Square";
type Char = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K'
    | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X'
    | 'Y' | 'Z' | '_' | ' '

interface Player {
    name: string;
    frame: Char[];
    score: number;
}
type ScrabbleState = {
    board: Char[][]
    pool: Char[]
    players: Player[]
    current_player: number
    current_tile: String
}
type ScrabbleProps = {

}

export class Scrabble extends Component<ScrabbleProps, ScrabbleState> {
    constructor(props: Scrabble) {
        super(props)
        this.state = {
            board: charBoard,
            pool: ["A","B","C","D","E","F","G"],
            current_player: 0,
            players: [{name: "player one", frame: ["A","B","C","D","E","F","G"], score: 0},
                        {name: "player two", frame: ["H","I","J","K","L","M","N"], score: 0}],
            current_tile: "",
        };
    }
    getNumberFromID(ElementID: string): number{
        return parseInt(ElementID);
    }
    addLetterToBoard(letter: Char, row: number, col: number):boolean{
        if((row>=1)&&(row<=15)&&(col>=1)&&(col<=15) && (this.state.board[row][col] === " ")){
            if(this.state.players[this.state.current_player].frame.includes(letter)){
                let i = this.state.players[this.state.current_player].frame.lastIndexOf(letter);
                let tempBoard = this.state.board.slice()
                let tempFrame = this.state.players[this.state.current_player].frame
                tempFrame = tempFrame.slice(0, i).concat(tempFrame.slice(i + 1))
                let tempPlayers = this.state.players;
                tempPlayers[this.state.current_player].frame = tempFrame;
                tempBoard[row][col] = letter;
                this.setState({
                    board : tempBoard,
                    players : tempPlayers
                });
            }
            return true;
        }
        return false;
    }

    dragEnd = (event: React.DragEvent) => {
        this.setState({
            current_tile : ""
        })
    }
    dragStart = (event: React.DragEvent) => {
        if((event.dataTransfer) && (event.target) && (event.target instanceof Element)){
            event.dataTransfer.setData("text", event.target.id)
            console.log("Tile", event.target.id)
            this.setState({current_tile: event.target.id})
        }
    }
    onDrop = (event: React.DragEvent) => {
        if ((event.dataTransfer) && (event.target) && (event.target instanceof Element)) {
            console.log("Frame: ",event.target.id);
            if(this.state.current_tile){
                let num = this.getNumberFromID(event.target.id);
                let row = Math.floor(num / 15);
                let col = num % 15;
                this.addLetterToBoard(this.state.current_tile.charAt(0) as Char, row, col);
            }
            event.dataTransfer.clearData()
        }
    }
    render() {
        return(
            <div className = "game">
                <Board letters={charBoard} letterMultiplier={LETTER_MULTIPLIER} wordMultiplier={WORD_MULTIPLIER}
                       onDrop = {this.onDrop}/>
                <Frame letters={this.state.players[this.state.current_player].frame} dragStart={this.dragStart}/>
            </div>
        )
    }
}
let LETTER_MULTIPLIER: number[][] =
    [ 	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 3, 1, 1, 1, 3, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1],
        [2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 3, 1, 1, 1, 3, 1, 1, 1, 3, 1, 1, 1, 3, 1],
        [1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1],
        [1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1],
        [1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1],
        [1, 3, 1, 1, 1, 3, 1, 1, 1, 3, 1, 1, 1, 3, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2],
        [1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 3, 1, 1, 1, 3, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];
let WORD_MULTIPLIER: number[][] =
    [   [3, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 3],
        [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
        [1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1],
        [1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1],
        [1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [3, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 3],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1],
        [1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1],
        [1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1],
        [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
        [3, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 3] ];
let charBoard : Char[][]= [
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'I', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'M', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', 'E', 'N', 'D', ' ', ' ', ' ', 'P', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', 'V', ' ', ' ', 'A', 'U', 'G', 'I', 'T', 'E', ' ', ' '],
    [' ', ' ', ' ', ' ', 'O', ' ', ' ', 'D', ' ', 'O', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', 'H', 'M', ' ', 'Z', ' ', 'J', 'E', 'D', 'I', 'S', ' '],
    [' ', ' ', ' ', ' ', 'E', 'Y', 'R', 'E', ' ', 'I', 'W', 'I', ' ', 'T', ' '],
    [' ', ' ', ' ', ' ', ' ', 'X', 'E', 'D', ' ', ' ', ' ', 'Y', 'G', 'O', ' '],
    [' ', ' ', ' ', ' ', ' ', 'O', 'F', ' ', ' ', ' ', ' ', 'A', ' ', 'L', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'N', 'U', 'N', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']];
