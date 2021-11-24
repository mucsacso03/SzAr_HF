import './App.css';
import Game from './Game';
import Menu from './Menu';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from './Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Navbar /> */}
        <Menu />
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
