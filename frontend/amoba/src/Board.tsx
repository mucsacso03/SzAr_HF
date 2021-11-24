import React, { Component } from 'react'
import Cell from './Cell'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

type BoardProps = {};

type BoardState = {
    actBoard: number[][];
};


export default class Board extends Component<BoardProps, BoardState> {
    readonly numRows = 19;

    constructor(props: BoardProps){
        super(props);
        this.state = {actBoard: []};
        console.log('CONSTRUCT');
    }

    componentDidMount(){
        this.newGame();
        console.log('MOUNTED');
    }

    getKey(x: number, y: number) {
        return y * this.numRows + x;
    }

    newGame() {
        console.log('NEWGAMEEEE')
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "username": "valami"
        });

        var requestOptions: RequestInit = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(BACKEND_URL + "/newgame", requestOptions)
        .then(data => data.json())
        .then(success =>this.refreshBoard(success))
        .catch(error => console.log('error', error));
    }


    refreshBoard(refreshedBoard: number[][]) {
        console.log(refreshedBoard);
        this.setState( { actBoard: refreshedBoard });

    }

    // getBoard(x: number, y:number, id: number) {
    getBoard = () => {
        console.log('BOARD')
        const xhr = new XMLHttpRequest();
        //   xhr.withCredentials = true; // TODO: kell?


        const data = JSON.stringify({
            "x": 1,
            "y": 1,
            "id": "123",
            "proxy:": "http://localhost:"
        });


        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
            }
        });

        xhr.open("POST", BACKEND_URL + "/move");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(data);
    }

    // getBoard(x:number, y:number) {
    //     console.log('BOARD')
    //     const xhr = new XMLHttpRequest();
    //     //   xhr.withCredentials = true; // TODO: kell?


    //     const data = JSON.stringify({
    //         "x":x,
    //         "y": y,
    //         "id": "123",
    //         "proxy:": "http://localhost:"
    //     });


    //     xhr.addEventListener("readystatechange", function () {
    //         if (this.readyState === 4) {
    //             console.log(this.responseText);
    //         }
    //     });

    //     xhr.open("POST", REACT_APP_BACKEND_URL + "/move");
    //     xhr.setRequestHeader("Content-Type", "application/json");
    //     xhr.send(data);
    // }


    render() {
        if(this.state.actBoard.length === 0){
            return "Not loaded yet";
        }
        console.log(Object.values(this.state.actBoard[1])[1]);
        let cells = [];
        console.log('FASZ')
        for (let y = 0; y < this.numRows; y++) {
            let row = []
            for (let x = 0; x < this.numRows; x++) {
                // row.push(<Cell x={x} y={y} key={this.getKey(x, y)} actValue="O" onClick={this.getBoard(x,y)}/>)
                // row.push(<Cell x={x} y={y} key={this.getKey(x, y)} actValue="O" onClick={() => this.testt(x,y)}></Cell>)
                row.push(<Cell x={x} y={y} key={this.getKey(x, y)} actValue={Object.values(this.state.actBoard[x])[y]}></Cell>)
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
