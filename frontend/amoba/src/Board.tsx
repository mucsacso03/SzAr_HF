import { TextField, Typography } from '@material-ui/core';
import React, { Component } from 'react'
import Cell from './Cell'



type BoardProps = {
    username: string
};

type BoardState = {
    actBoard: number[][];
    game_id: number;
    winner: string;
};

type BoardResponse = {
    board: number[][],
    game_id: number,
    won: string
}

export default class Board extends Component<BoardProps, BoardState> {
    readonly numRows = 19;

    constructor(props: BoardProps) {
        super(props);
        console.log('CONSTRUCT')
        this.state = { actBoard: [], winner: "", game_id: 0, };
    }

    componentDidMount() {
        console.log('DIDMOUNT')
        this.newGame();
    }


    getKey(x: number, y: number) {
        return y * this.numRows + x;
    }

    refreshBoard = (boardResponse: BoardResponse): void => {
        console.log(boardResponse)
        console.log(boardResponse.game_id)
        console.log('refreshen belül')
        console.log(boardResponse.game_id)
        console.log(this.state.game_id)
        if (boardResponse.game_id) {

            this.setState({ game_id: boardResponse.game_id });
        }
        let refreshedBoard = boardResponse.board

        console.log('WON:')
        let won = boardResponse.won
        console.log(won)
        console.log("refreshboard:")
        console.log(refreshedBoard)
        if (won) {
            console.log('!refreshedBoard')
            if (won === this.props.username) {
                this.setState({ winner: this.props.username });
            }
            else if (won === 'robot') {
                this.setState({ winner: 'robot' });
            }
        }
        else {
            this.setState({ actBoard: refreshedBoard });
        }


    }


    newGame() {
        console.log("NEWGAME")
        console.log(this.props.username)
        var raw = JSON.stringify({
            "username": this.props.username
        });

        var requestOptions: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: raw,
            redirect: 'follow'
        };

        fetch('/newgame', requestOptions)
            .then(data => data.json())
            .then(success => this.refreshBoard(success))
            .catch(error => console.log('error', error));
    }

    // getBoard(x: number, y:number, id: number) {
    move(x: number, y: number, game_id: number) {
        console.log("MOVE")
        console.log(game_id)
        var raw = JSON.stringify({
            "x": x,
            "y": y,
            "id": game_id
        });

        var requestOptions: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: raw,
            redirect: 'follow'
        };

        fetch('/move', requestOptions)
            .then(data => data.json())
            .then(success => this.refreshBoard(success))
            .catch(error => console.log('error', error));
    }


    render() {

        if (this.state.actBoard.length === 0) {
            return "Loading...";
        }

        let ret: any

        if (this.state.winner !== "") {
            return (
                <div className="game">
                    <Typography variant="h2">{this.state.winner} wins</Typography>

                </div>
            )
        }
        let cells = [];
        for (let y = 0; y < this.numRows; y++) {
            let row = []
            for (let x = 0; x < this.numRows; x++) {
                row.push(<Cell x={x} y={y} key={this.getKey(x, y)} actValue={this.state.actBoard[y][x]}
                    onClick={() => this.move(x + 1, y + 1, this.state.game_id)}></Cell>)
            }
            cells.push(<div key={y}>{row}</div>)

        }

        
        return (

            <div className="game">
                {cells}
            </div>
        )
    }

}
