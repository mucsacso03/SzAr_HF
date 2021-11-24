import React, { Component } from 'react'
import {Link} from 'react-router-dom';


export class Navbar extends Component {
    render() {
        return (
            <nav className="navbar">
                <h1>Amőba app</h1>
                <div className="links">
                    <Link to="/">Menu</Link>
                    <Link to="/game">Play</Link>

                </div>
                
            </nav>
        )
    }
}

export default Navbar
