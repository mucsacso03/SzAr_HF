// import Button from '@mui/material/Button';
import { Box, Button } from '@material-ui/core';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Navbar extends Component {
    render() {
        return (
            <div>
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
                            variant="contained" size="large"><a href="/game" className="button">New game</a>
                        </Button>
                    </Box>

                    <Box m={2} pt={3}>
                        <Button
                            // style={{ maxWidth: '200px', maxHeight: '100px', minWidth: '200px', minHeight: '100px' }}
                            variant="contained" size="large"><Link to="/" className="button">Back to menu</Link>
                        </Button>
                    </Box>
                </Box>
            </div>
        )
    }
}

export default Navbar
