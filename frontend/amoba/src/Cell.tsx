import React, { Component } from 'react'


type CellProps = {
    x: number,
    y: number,
    key: number,
    actValue: number,
    onClick: () => void
}

type CellState = {
    actValue: string; // 0, ha ures, 1, ha jatekos, 2, ha gep
  };

// const {REACT_APP_BACKEND_URL} = process.env

export default class Cell extends Component<CellProps, CellState>{
    constructor(props: CellProps){
        super(props);
        this.state= {
            actValue: "",
        };
        // https://typeofnan.dev/how-to-fix-undefined-this-state-in-react-class-components/
        this.click = this.click.bind(this);
    }
  
    click() {
        console.log(this.props.x + ',' + this.props.y);
        this.setState( { actValue: "X" });
        console.log(process.env.REACT_APP_BACKEND_URL);
    }


    render(){
        return (
            // <button className="cell" onClick={() => this.click(2)}>
            <button className="cell" onClick={this.props.onClick}>
                {this.props.actValue}
            </button>
        )
    }
}
