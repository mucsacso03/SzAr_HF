import { TextField } from '@material-ui/core';
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
                <TextField
                    onChange={(e) =>
                        this.setState({ username: e.target.value })}
                    label="Give me your name:"
                    variant="outlined"
                    required
                    error={this.state.nameError}
                />
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
