import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import Button from '@mui/material/Button';
import { Typography, Button, ButtonGroup, Container, Box } from '@material-ui/core'

export class Menu extends Component {
    render() {
        return (
            <Container>
                <Typography variant="h1">THE BEST AMŐBA EVER</Typography>
                <div>
                    <Box m={2} pt={3}>
                        <Button style={{maxWidth: '200px', maxHeight: '100px', minWidth: '200px', minHeight: '100px'}} variant="contained" size="large"><Link to="/game" class="button">Play</Link></Button>
                    </Box>
                </div>

                <div>
                    <Box m={2} pt={3}>
                        <Button
                        style={{maxWidth: '200px', maxHeight: '100px', minWidth: '200px', minHeight: '100px'}}
                        variant="contained"><Link to="/" class="button">Menu</Link></Button>
                    </Box>
                </div>

            </Container>
        )
    }
}

export default Menu
