import { Typography } from '@material-ui/core'
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
            <div>
                <Typography variant="h6">
                    {this.props.no}. {this.props.username} {this.props.score}
                </Typography>

            </div>
        )
    }
}

export default Score
