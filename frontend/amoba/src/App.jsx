import './App.css';
import Game from './Game';
import Menu from './Menu';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Typography} from '@material-ui/core'

function App() {
  return (
    <Router>
      <div className="App">
      <Typography variant="h2">THE BEST AMŐBA EVER</Typography>
        {/* <Navbar /> */}
        <Switch>
          <Route exact path="/">
            <Menu />
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/scoreboard">
            <Game />
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
