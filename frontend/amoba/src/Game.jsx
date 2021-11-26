import React, { Component } from 'react';
import Board from './Board';
import { Link } from 'react-router-dom';
// import Button from '@mui/material/Button';
import { Typography, Button, ButtonGroup, Container, Box } from '@material-ui/core'


export class Game extends Component {
    render() {
        return (
            // <Container>

            <div className="Game">

                {/* <div> */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    p: 1,
                    pt: 10,
                    m: 1,
                    bgcolor: 'background.paper',
                }}>
                    <Box m={2} pt={3}>
                        <Button
                            variant="contained" size="large"><a href="/game" class="button">New game</a>
                        </Button>
                    </Box>

                    <Box m={2} pt={3}>
                        <Button
                            // style={{ maxWidth: '200px', maxHeight: '100px', minWidth: '200px', minHeight: '100px' }}
                            variant="contained" size="large"><Link to="/" class="button">Back to menu</Link>
                        </Button>
                    </Box>
                </Box>

                <Board username="valaki"/>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        p: 1,
                        m: 1,
                        bgcolor: 'background.paper',
                    }}
                >

                </Box>
            </div>
            // </Container>
        )
    }
}

export default Game
