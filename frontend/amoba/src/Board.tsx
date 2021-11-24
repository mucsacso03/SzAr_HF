import React, { Component } from 'react'
import Cell from './Cell'



type BoardProps = {};

type BoardState = {
    actBoard: number[][];
};


export default class Board extends Component<BoardProps, BoardState> {
    readonly numRows = 19;

    constructor(props: BoardProps) {
        super(props);
        this.state = { actBoard: [] };
    }

    componentDidMount() {
        this.newGame();
    }

    getKey(x: number, y: number) {
        return y * this.numRows + x;
    }

    refreshBoard = (refreshedBoard: number[][]): void => {
        console.log("REFRESH")
        console.log(refreshedBoard);
        this.setState({ actBoard: refreshedBoard });
    }


    newGame() {
        console.log("NEWGAME")
        var raw = JSON.stringify({
            "username": "valami"
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
    move(x:number, y:number) {
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
            .then(success => this.refreshBoard(success))
            .catch(error => console.log('error', error));
    }


    // refreshBoard(refreshedBoard: number[][]) {
    //     console.log("REFRESH")
    //     console.log(refreshedBoard);
    //     this.setState({ actBoard: refreshedBoard });
    // }

    render() {
        console.log("RENDER");
        if (this.state.actBoard.length === 0) {
            return "Not loaded yet";
        }
        console.log(Object.values(this.state.actBoard[1])[1]);
        let cells = [];
        for (let y = 0; y < this.numRows; y++) {
            let row = []
            for (let x = 0; x < this.numRows; x++) {
                // row.push(<Cell x={x} y={y} key={this.getKey(x, y)} actValue="O" onClick={this.getBoard(x,y)}/>)
                // row.push(<Cell x={x} y={y} key={this.getKey(x, y)} actValue="O" onClick={() => this.testt(x,y)}></Cell>)
                row.push(<Cell x={x} y={y} key={this.getKey(x, y)} actValue={this.state.actBoard[y][x]}
                onClick={() => this.move(x+1,y+1)}></Cell>)
            }
            cells.push(<div key={y}>{row}</div>)

        }
        return (
            <div className="board">
                {cells}
            </div>
        )
    }

}
