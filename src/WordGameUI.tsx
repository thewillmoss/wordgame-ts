import React, {cloneElement, Component, ReactNode, ReactNodeArray} from 'react';
import './App.css';
import {Board} from "./Board";
import {Frame} from "./Frame";
import './Tile.css';
import Square from "./Square";
import {Tile} from "./Tile";
type Char = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K'
    | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X'
    | 'Y' | 'Z' | '_' | ' '

interface Player {
    name: string;
    frame: Char[];
    score: number;
}
interface Location {
    row : number
    col : number
}
type WordGameUIState = {
    liveTiles : Map<Number, Char>
}
type WordGameUIProps = {
    board: Char[][]
    player: Player
}

export class WordGameUI extends Component<WordGameUIProps, WordGameUIState> {
    constructor(props: WordGameUIProps) {
        super(props)
        this.state = {
            liveTiles : new Map()
        };
    }
    getNumberFromID(ElementID: string): number{
        return parseInt(ElementID);
    }

    addLetterToBoard(letter: Char, row: number, col: number):boolean{
        if((row>=1)&&(row<=15)&&(col>=1)&&(col<=15) && (this.state.board[row][col] === " ")){
            if(this.state.players[this.state.current_player].frame.includes(letter)){
                let i = this.state.players[this.state.current_player].frame.lastIndexOf(letter);
                let temp_board_tile = this.state.board_tile.slice()
                let tempFrame = this.state.players[this.state.current_player].frame
                tempFrame = tempFrame.slice(0, i).concat(tempFrame.slice(i + 1))
                let tempPlayers = this.state.players;
                tempPlayers[this.state.current_player].frame = tempFrame;
                if(!temp_board_tile[row])
                    temp_board_tile[row] = [];
                temp_board_tile[row][col] = <Tile letter={letter} highlight = {true} draggable={true} dragStart={this.dragStart}/>;
                this.setState({
                    board_tile : temp_board_tile,
                    players : tempPlayers
                });
            }
            return true;
        }
        return false;
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
    createBoardTiles(char_board : Char[][]):ReactNode[][]{
        let i, j = 1;
        let tileBoard:ReactNode[][] = [];
        for(i = 0; i < 14; i++){
            tileBoard[i] = [];
            for(j = 0; j < 14; j++){
                if(char_board[i][j]!=' '){
                    tileBoard[i][j] = <Tile letter={char_board[i][j]} highlight = {false}/>
                }
            }
        }
        return tileBoard;
    }
    render() {
        return(
            <div className = "game">
                <Board letters={this.state.board_tile} letterMultiplier={LETTER_MULTIPLIER} wordMultiplier={WORD_MULTIPLIER}
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
