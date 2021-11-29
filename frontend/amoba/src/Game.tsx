import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { Component } from 'react';
import Board from './Board';
import Navbar from './Navbar';

type GameProps = {

}

type GameState = {
    username: string,
    nameError: boolean
};


export class Game extends Component<{}, GameState> {

    constructor(props: GameProps) {
        super(props);
        this.state = { username: "valakiii", nameError:true};
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(this.state.username)

        if (this.state.username === '') {
            this.setState({ nameError: true })
        }
        else {
            this.setState({ nameError: false })
        }
    }


    render() {
        let ret: any

        if (this.state.nameError === true) {
            ret = <form onSubmit={this.handleSubmit}>
                <Typography sx={{ mt: 0, mb: 3}}variant="subtitle1">Give your name below and hit enter:</Typography>
                <Box>
                <TextField
                    onChange={(e) =>
                        this.setState({ username: e.target.value })}
                    label="Name:"
                    variant="outlined"
                    color="secondary"
                    sx={{mr:2}}
                    // required
                    // error={this.state.nameError}
                />
                <Button color="error" variant="contained">Submit</Button>
                </Box>
            </form>
        }
        else{
            ret = <Board username={this.state.username} />
        }
        return (
            <div className="Game">
                <Navbar />
                {ret}
                

            </div>
        )
    }
}

export default Game
