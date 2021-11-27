import React, { Component } from 'react';
import Navbar from './Navbar';
import Score from './Score';
import ScoreData from './ScoreData';

type LeaderboardProps = {
    id: number,
    username: string,

}

// https://dev.to/ankittanna/how-to-create-a-type-for-complex-json-object-in-typescript-d81
type ScoreType ={
    score: number,
    username: string
}

type ScoreWithId ={ [id: number]: ScoreType };

type LeaderboardStates = {
    scoreData: Array<ScoreType>;
}



export class Leaderboard extends Component<LeaderboardProps, LeaderboardStates> {

    state = { scoreData: Array<ScoreType>()};

    componentDidMount() {
        this.getScoreBoard()
    }

    getScoreBoard(){
        var requestOptions: RequestInit = {
        method: 'GET',
        redirect: 'follow'
        };

        fetch('/leaderboard', requestOptions)
        .then(data => data.json())
        .then(success => this.refreshLeaderboard(success))
        .catch(error => console.log('error', error));
    }

    refreshLeaderboard(scores: any){
        console.log(scores[1])
        console.log(scores[2])
        let array3 = Array<ScoreType>()
        console.log(Object.keys(scores).length)
        
        for(let i = 1; i<=Object.keys(scores).length; i++){
            array3.push(scores[i])
        }

        
        console.log(array3)
        console.log(this.state.scoreData.length)
        this.setState({ scoreData: array3 });
    }


    render() {


        let ret = []
        if(this.state.scoreData.length !== 0 ){
            for(let id in this.state.scoreData){
                const actScore = this.state.scoreData[id]
                ret.push(<Score key={parseInt(id)} no={parseInt(id)+1} username={actScore.username} score={actScore.score}></Score>)
            }



        }

        return (
            <div>
                <Navbar />
                {ret}
</div>
        )
    }
}

export default Leaderboard
