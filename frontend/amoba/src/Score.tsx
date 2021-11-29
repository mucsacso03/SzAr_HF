import { TableCell, TableRow, Typography } from '@mui/material'
import React, { Component } from 'react'

type ScoreProps = {
    key: number,
    no: number,
    username: string,
    score: number,
}

export class Score extends Component<ScoreProps> {
    render() {
        return (
            // <div>
            <TableRow>
                <TableCell align="right">{this.props.no}.</TableCell>
                <TableCell align="center">{this.props.username}</TableCell>
                <TableCell align="left">{this.props.score}</TableCell>
            </TableRow>

            // </div>
        )
    }
}

export default Score
