import { Typography } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Game from './Game';
import Leaderboard from './Leaderboard';
import Menu from './Menu';

function App() {
  return (
    <Router>
      <div className="App">
      <Typography variant="h2">THE BEST AMŐBA EVER</Typography>
        <Switch>
          <Route exact path="/">
            <Menu />
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/leaderboard">
            <Leaderboard />
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/game">
            <Game />
          </Route>
        </Switch>
        
      </div>
    </Router>
  );
}

export default App;
