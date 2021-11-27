import { Box, Button, Container } from '@material-ui/core';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Menu extends Component {
    render() {
        return (
            <Container>
                <div>
                    <Box m={2} pt={3}>
                        <Button style={{ maxWidth: '200px', maxHeight: '100px', minWidth: '200px', minHeight: '100px' }} 
                        variant="contained" size="large"><Link to="/game" className="button">Play</Link></Button>
                    </Box>
                </div>

                <div>
                    <Box m={2} pt={3}>
                        <Button
                            style={{ maxWidth: '200px', maxHeight: '100px', minWidth: '200px', minHeight: '100px' }}
                            variant="contained"><Link to="/leaderboard" className="button">Leaderboard</Link></Button>
                    </Box>
                </div>

                <div>
                    <Box m={2} pt={3}>
                        <Button
                            style={{ maxWidth: '200px', maxHeight: '100px', minWidth: '200px', minHeight: '100px' }}
                            variant="contained"><Link to="/" className="button">Menu</Link></Button>
                    </Box>
                </div>

            </Container>
        )
    }
}

export default Menu
