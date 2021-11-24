import React, { Component } from 'react'
import Cell from './Cell'

export default class Board extends Component {
    readonly numRows = 19;

    getKey(x: number, y: number){
        return y* this.numRows + x;
    }

    render(){
        let cells = []
        for(let y =0; y< this.numRows;y++){
            let row= []
            for(let x = 0; x<this.numRows; x++){
                row.push(<Cell x={x} y={y} key={this.getKey(x,y)}/>)                         
            }
            cells.push(<div key={y}>{row}</div>)

        }
        return cells
    }

}
