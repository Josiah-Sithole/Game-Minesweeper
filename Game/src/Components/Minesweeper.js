//import React library.
import React from "react"; 

//imported components: 
import BoardHead from "./BoardHead";
import Board from "./Board";

//https://reactjs.org/docs/components-and-props.html
class Minesweeper extends React.Component {
  constructor() {
    super();
    //state for minesweeper game that holds info to influence the output of render:
    /*game can be in waiting, running or end game mode. 
    game starts off as waiting until user clicks a cell.*/
    this.state = {
      gameStatus: "waiting", 
      time: 0,
      // 10 flags allowed per round.
      flagCount: 10, 
      // (OpenCell) all cells start off closed at the start of each round and track all open cells after they are clicked.
      // total of 10 mines are dispersed randomly across the board (mines 10)
      openCells: 0, 
      mines: 10, 
      //10 rows -amount of rows for board.
      //10 columns- amount of columns for board.
      rows: 10, 
      columns: 10, 
    };
    this.baseState = this.state; 
  }

    //react component method that helps when state changes. 
   //pass through 'checkForWinner' function.
  componentDidUpdate(nextProps, nextState) {
    if (this.state.gameStatus === "running") {
      this.checkForWinner();
    }
  }

  //function that will anounce the 'winning of game' when game's goal is achieved. 
  checkForWinner = () => {
    // If statement to return winner notification if all mines are missed.
    if (this.state.mines + this.state.openCells >= this.state.rows * this.state.columns) {
      this.setState({
        gameStatus: "winner"
      }, alert("Congratulations, for naviagating your way through mines!"))
    }
  }
   //https://reactjs.org/docs/react-component.html
  //Life cycle method that handles configuration, updates of state and prepares for first render. 
  componentWillMount() {
    this.intervals = [];
  }

  //function that wraps in funtion and the amount of time it takes to run.
  setInterval = (fn, t) => {
    //push in interval using function & time
    this.intervals.push(setInterval(fn, t)); 
  };

  //reset function to start  new round with mines shuffled.
  reset = () => {
    this.intervals.map(clearInterval);
    this.setState(Object.assign({}, this.baseState), () => {
      this.intervals = [];
    });
  };

  //function that ticks seconds as soon as game goes into running mode. 
  tick = () => {
    if (this.state.openCells > 0 && this.state.gameStatus === "running") {
      let time = this.state.time + 1; 
      this.setState({ time });
    }
  };

  //function for end of game.
  endGame = () => {
    this.setState({
      gameStatus: "ended"
    });
  };

  //function that counts down how many flags have been used. 
  changeFlagAmount = amount => {
    if (this.state.flagCount < 0) {
      alert('You are using more than given the flags for this round!');
    }
    this.setState({ flagCount: this.state.flagCount + amount });
  };

  // if the game hasn't started yet, the game will move into running status when user clicks on a cell.
  handleCellClick = () => {
    if (this.state.openCells === 0 && this.state.gameStatus !== "running") {
      this.setState(
        {
          gameStatus: "running"
        },
        /*Timer will start as soon as user clicks on a cell and will 
        increment time in seconds by passing in tick function.*/
        this.setInterval(this.tick, 1000) 
      );
    }
    this.setState(prevState => {
      return { openCells: prevState.openCells + 1 };
    });
  };

  render() {
    return (
      <div className="minesweeper">
        <h1>Welcome to minesweeper!</h1>
        <h2>☼ Survive & don't blow up! ☼</h2>

        <BoardHead
        //pass in time to render timer. 
        // flagUsed--pass in flag count to render flags used.
          time={this.state.time} 
          flagsUsed={this.state.flagCount} 
          reset={this.reset}
          status={this.state.gameStatus}
        />
        <Board 
        //Let board know how many cells are open.
          openCells={this.state.openCells} 
          //pass through amount of mines in board.
          mines={this.state.mines} 
          //pass in rows.
          rows={this.state.rows}         
          //pass in columns.
          columns={this.state.columns}           
          //game goes into 'ended' status when mine is clicked.
          endGame={this.endGame}           
          //can be waiting, running or ended.
          status={this.state.gameStatus}       
          //pass in what happens when cell is clicked.
          onCellClick={this.handleCellClick}
         
          //change flag amount as used.
          changeFlagAmount={this.changeFlagAmount} />
      
      </div>
    );
  }
}

export default Minesweeper;