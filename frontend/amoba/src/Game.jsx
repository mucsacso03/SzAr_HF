import React, { Component } from 'react';
import Board from './Board';
import NameInput from './NameInput';
import Navbar from './Navbar';


export class Game extends Component {
    render() {
        return (
            <div className="Game">
                <Navbar />
                <NameInput />
                <Board username="valaki" />
            </div>
        )
    }
}

export default Game
