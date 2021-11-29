// import Button from '@mui/material/Button';
import { Box, Button } from '@mui/material';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Navbar extends Component {
    render() {
        return (
            <div>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mb: 2,
                    bgcolor: 'background.paper',
                }}>
                    <Box mr={1} mt={2}>
                        <Button
                            variant="contained" size="large"><a href="/game" className="button">New game</a>
                        </Button>
                    </Box>

                    <Box mr={1} mt={2}>
                        <Button
                            variant="contained" size="large"><Link to="/" className="button">Back to menu</Link>
                        </Button>
                    </Box>
                </Box>
            </div>
        )
    }
}

export default Navbar
