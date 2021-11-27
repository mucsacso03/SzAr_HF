import { TextField, Typography } from '@material-ui/core'
import React, { Component } from 'react'

export class NameInput extends Component {
    render() {
        return (
            <div>
                {/* <Typography 
                
                /> */}
                <form>
                    <TextField
                        label="Name"
                        variant="outlined"
                        required
                    />
                </form>

            </div>
        )
    }
}

export default NameInput
