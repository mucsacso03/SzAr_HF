import { Typography } from '@material-ui/core';
import React, { Component } from 'react'
import Cell from './Cell'



type BoardProps = {
    username: string;
};

type BoardState = {
    actBoard: number[][];
    winner: string
};


export default class Board extends Component<BoardProps, BoardState> {
    readonly numRows = 19;

    constructor(props: BoardProps) {
        super(props);
        this.state = { actBoard: [], winner: "" };
    }

    componentDidMount() {
        this.newGame();
    }

    getKey(x: number, y: number) {
        return y * this.numRows + x;
    }

    victory = (name: string) => {
        this.setState({ winner: name });
    }

    // refreshBoard = (refreshedBoard: number[][]): void => {
    refreshBoard = (refreshedBoard: number[][], won = ""): void => {
        console.log('WON:')
        console.log(won)
        console.log("refreshboard:")
        console.log(refreshedBoard)
        if (!refreshedBoard) {
            if (won === this.props.username) {
                this.victory(this.props.username);
            }
            else if (won === 'robot') {
                this.victory('robot')
            }
        }
        else {
            this.setState({ actBoard: refreshedBoard });
        }


    }


    newGame() {
        console.log("NEWGAME")
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
    move(x: number, y: number) {
        console.log("MOVE")
        var raw = JSON.stringify({
            "x": x,
            "y": y,
            "id": "123"
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
            .then(success => this.refreshBoard(success['field'], success['won']))
            .catch(error => console.log('error', error));
    }


    render() {
        if (this.state.actBoard.length === 0) {
            return "Loading...";
        }
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
                    onClick={() => this.move(x + 1, y + 1)}></Cell>)
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
