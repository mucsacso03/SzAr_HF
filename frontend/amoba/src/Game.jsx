import React, { Component } from 'react';
import Board from './Board';
import Navbar from './Navbar';


export class Game extends Component {
    render() {
        return (
            <div className="Game">
                <Navbar />
                <Board username="valaki" />
            </div>
        )
    }
}

export default Game
