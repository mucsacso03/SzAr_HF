import { Box, Button } from '@mui/material';
import React, { Component } from 'react'


type CellProps = {
    x: number,
    y: number,
    key: number,
    actValue: string,
    onClick: () => void
}

type CellState = {
    actValue: string; // 0, ha ures, 1, ha jatekos, 2, ha gep
};


export default class Cell extends Component<CellProps, CellState>{
    constructor(props: CellProps) {
        super(props);
        this.state = {
            actValue: "",
        };
        this.click = this.click.bind(this);
    }

    click() {
        this.setState({ actValue: "X" });
    }


    render() {
        return (

            <Button
                style={{ maxWidth: '2rem', maxHeight: '2rem', minWidth: '2rem', minHeight: '2rem' }}
                variant="outlined" color="secondary" size="small" className="cell" onClick={this.props.onClick}>
                {this.props.actValue}
            </Button>



        )
    }
}
