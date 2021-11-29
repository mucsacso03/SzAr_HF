import { Typography } from '@mui/material';
import { pink } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from '@mui/system';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Game from './Game';
import Leaderboard from './Leaderboard';
import Menu from './Menu';

const theme = createTheme({
  palette: {
    primary: {
      main: '#c0c0c0',
    },
    secondary: {
      main: '#000000',
    },
  },
  overrides: {
    MuiButton: {
      root: {
        width: 10,
      }, 
    }, 
  }, 
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Typography sx={{ mt: 6, mb: 0 }} variant="h2">AMŐBA</Typography>
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
    </ThemeProvider>
  );
}

export default App;
