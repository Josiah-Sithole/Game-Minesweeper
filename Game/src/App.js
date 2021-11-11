//import React Library.
import React from 'react'; 

//import logo from './Images/bomb.png'; // Page Image.

//custom style Sheet.
import './styles.css';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom'; // React Routing Components.

//imported Components:
import Minesweeper from './Components/Minesweeper';
import Rules from './Components/Rules';

// Main component:
function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1 className="App-heading">
            <span role="img" aria-label="controller">🎮</span>
            Welcome to Minesweeper
            <span role="img" aria-label="controller">🎮</span>
          </h1>
          {/*<img src={logo} className="app-image" alt="logo" height="300px" />
  */}        <div className="nav-links">
          <button className='buttons'>
              <NavLink to="/minesweeper" activeClassName='game-board'>
                Get Started! <span role="img" aria-label="controller">🚩</span>
              </NavLink>
            </button>
            <br />
            <button className='buttons'>
              <NavLink to="/rules" activeClassName='game-rules'>
                Rules of the Game <span role="img" aria-label="controller">📜</span>
              </NavLink>
            </button>
            <br />
            <button className='buttons'>
              <NavLink to="/" activeClassName='home-page'>
                Exit Game <span role="img" aria-label="controller">💣</span>
              </NavLink>
            </button>
          </div>
        </header>
        <routing>
          <Switch>
            <Route path="/minesweeper">
              <Minesweeper />
            </Route>
            <Route path="/rules">
              <Rules />
            </Route>
          </Switch>
        </routing>
      </div>
    </Router>

  );
}

export default App;