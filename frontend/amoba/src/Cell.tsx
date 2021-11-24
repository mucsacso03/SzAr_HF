import React, { Component } from 'react'

type CellProps = {
    x: number,
    y: number,
    key: number
}

type CellState = {
    actValue: number; // 0, ha ures, 1, ha jatekos, 2, ha gep
  };

export default class Cell extends Component<CellProps, CellState>{
    constructor(props: CellProps){
        super(props);
        this.state= {
            actValue: 1,
        };
        // https://typeofnan.dev/how-to-fix-undefined-this-state-in-react-class-components/
        this.click = this.click.bind(this);
    }
  
    click() { 
        console.log(this.props.x + ',' + this.props.y)
        this.setState( { actValue: this.state.actValue +1 });
    }


    render(){
        return (
            <button className="cell" onClick={this.click}>
                {this.state.actValue}
            </button>
        )
    }
}
