import { Paper, Table, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { width } from '@material-ui/system';
import React, { Component } from 'react';
import Navbar from './Navbar';
import Score from './Score';

type LeaderboardProps = {
    id: number,
    username: string,

}

type ScoreType = {
    score: number,
    username: string
}


type LeaderboardStates = {
    scoreData: Array<ScoreType>;
}


export class Leaderboard extends Component<LeaderboardProps, LeaderboardStates> {

    state = { scoreData: Array<ScoreType>() };

    componentDidMount() {
        this.getScoreBoard()
    }

    getScoreBoard() {
        var requestOptions: RequestInit = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch('/leaderboard', requestOptions)
            .then(data => data.json())
            .then(success => this.refreshLeaderboard(success))
            .catch(error => console.log('error', error));
    }

    refreshLeaderboard(scores: any) {
        console.log(scores[1])
        console.log(scores[2])
        let array3 = Array<ScoreType>()
        console.log(Object.keys(scores).length)

        for (let i = 1; i <= Object.keys(scores).length; i++) {
            array3.push(scores[i])
        }


        console.log(array3)
        console.log(this.state.scoreData.length)
        this.setState({ scoreData: array3 });
    }


    render() {

        let table_head = []
        let table_body = []

        table_head.push(
            <TableHead>
                <TableRow>
                    <TableCell align="right">Rank</TableCell>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="left">Steps</TableCell>
                </TableRow>
            </TableHead>
        )

        if (this.state.scoreData.length !== 0) {
            for (let id in this.state.scoreData) {
                const actScore = this.state.scoreData[id]
                table_body.push(<Score key={parseInt(id)} no={parseInt(id) + 1} username={actScore.username} score={actScore.score}></Score>)
            }
        }

        let table= []
        // @ts-ignore
        table.push(<Table  aria-label="simple table">{table_body}{table_head}</Table>)
        
        let tableContainer = []
        tableContainer.push(<TableContainer component={Paper}>{table}</TableContainer>
        )
        return (
            <div>
                <Navbar />
                {tableContainer}
            </div>
        )
    }
}

export default Leaderboard
