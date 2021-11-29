import { Box, Button, Container, Typography } from '@mui/material';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Menu extends Component {
    render() {
        return (
            <Container>
                <div>
                    <Box m={2} pt={3}>
                        <Button sx={{ width: '20%', minHeight: '100px'}} 
                        variant="contained"><Link to="/game" className="button">Play</Link></Button>
                    </Box>
                </div>

                <div>
                    <Box m={2} pt={3}>
                             <Button sx={{ width: '20%', minHeight: '100px'}} 
                            variant="contained"><Link to="/leaderboard" className="button">Leaderboard</Link></Button>
                    </Box>
                </div>


            </Container>
        )
    }
}

export default Menu
