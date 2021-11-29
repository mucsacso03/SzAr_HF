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

// const {REACT_APP_BACKEND_URL} = process.env

export default class Cell extends Component<CellProps, CellState>{
    constructor(props: CellProps) {
        super(props);
        this.state = {
            actValue: "",
        };
        // https://typeofnan.dev/how-to-fix-undefined-this-state-in-react-class-components/
        this.click = this.click.bind(this);
    }

    click() {
        console.log(this.props.x + ',' + this.props.y);
        this.setState({ actValue: "X" });
        console.log(process.env.REACT_APP_BACKEND_URL);
    }


    render() {
        return (
            // <button className="cell" onClick={() => this.click(2)}>

            <Button
                style={{ maxWidth: '2rem', maxHeight: '2rem', minWidth: '2rem', minHeight: '2rem' }}
                // sx={{
                //     width: '10px',
                //     height: '100px',
                //     '&:hover': {
                //         backgroundColor: 'primary.main',
                //         opacity: [0.9, 0.8, 0.7],
                //     },
                // }}
                variant="outlined" color="secondary" size="small" className="cell" onClick={this.props.onClick}>
                {this.props.actValue}
            </Button>



        )
    }
}
