//import React library.
import React from "react"; 

//imported Row Component.
import Row from './Row'; 

// Class Component: https://dev.to/folajomi__/building-react-components-ii-class-components-94p
/*The state property of a component helps us track the state of our components and
 enables us make appropriate changes to the application based on its state*/
 /*To use state in our react application, we define the property 
 within the constructor function of our component class. */
class Board extends React.Component {
  // Constructor with props passed to it.
  constructor(props) {
    super(props);

  //set state where rows of the board are equal to the following:
  //pass props through to createBoard.
    this.state = {
      rows: this.createBoard(props)
    };
  }
   //for more on props:https://reactjs.org/docs/components-and-props.html
  // Code below is needed to update the state in response to prop changes i.e. to reset it 
  componentWillReceiveProps(nextProps) {
    if (
      this.props.openCells > nextProps.openCells ||
      this.props.columns !== nextProps.columns
    ) {
      this.setState({
        rows: this.createBoard(nextProps)
      });
    }
  }
  //https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column
  //grid created for the board game based on the number of columns and rows passed in from props. 
  createBoard = props => {
    
   //create an empty array for the board.  
    let board = [];

    //Nested for loop below to add in rows and coloumns. 
   //add new array to every cell which has different properties.
   //loop through all coloumns.
   //push in one object into each of the cells.
    //Count=0 --indicates number of nearby mines.
    for (let i = 0; i < props.rows; i++) {
      board.push([]);
      for (let j = 0; j < props.columns; j++) { 
        board[i].push({ 
          x: j,
          y: i, 
          count: 0,
          isOpen: false, // Cells start off closed until clicked by user.
          hasMine: false, // Initially none of the cells will have a mine.
          hasFlag: false // Initially none of the cells will have a flag.
        });
      }
    }

    //add in randomly placed mines using for loop & Math.random() method.
    //use math.random function to create random rows.
    //use math.random function to create random columns.
    for (let i = 0; i < props.mines; i++) {
      let randomRow = Math.floor(Math.random() * props.rows);
      let randomCol = Math.floor(Math.random() * props.columns);

      let cell = board[randomRow][randomCol];

      //prevent cells from having multiple mines by passing additional mine into another random cell. 
      if (cell.hasMine) {
        i--;
      } else {
        cell.hasMine = true;
      }
    }
    return board;
  };

  //allow user to add and remove flags from cells: 
  flag = cell => {
    if (this.props.status === "ended") {
      return;
    }
    let rows = this.state.rows;

    cell.hasFlag = !cell.hasFlag;
    this.setState({ rows });

    //if cell has a flag, minus 1 otherwise add 1 to flag amount when flag is removed.
    this.props.changeFlagAmount(cell.hasFlag ? -1 : 1); 
  };

  open = cell => {
    if (this.props.status === "ended") {
      return;
    }
    /*Promise that finds mines around current cell asyncchronously and
     calculates the mines before anything else runs*/ 
    let asyncCountMines = new Promise(resolve => {
      let mines = this.findMines(cell);
      resolve(mines);
    });

    //get rows by getting current cell that has been clicked on using its position on the board. 
    asyncCountMines.then(numberOfMines => {
      let rows = this.state.rows;

      let current = rows[cell.y][cell.x];

      //prevent mine from being on first user click, log it to the console and update the board.
      // (this.createBoard) -create new set of rows when first click contains a mine.
      if (current.hasMine && this.props.openCells === 0) {
        console.log("first click had a mine!");
        let newRows = this.createBoard(this.props); 

        //Reset rows and open cell that user is at and check again.
        this.setState({ rows: newRows }, () => { 
          this.open(cell);
        });
      } else {
        //if cell does not have a flag || isn't open, then call function.
        if (!cell.hasFlag && !current.isOpen) { 
          this.props.onCellClick();
          
           //current cell is open when clicked.
           //find number and mines that are near the current cell.
          current.isOpen = true;
          current.count = numberOfMines; 

          this.setState({ rows });
          // if cell does not have a flag or mine, the cells around it should be open.
          if (!current.hasMine && numberOfMines === 0) {
            this.openAroundCell(cell);
          }
          //End game when cell is opened and has a mine in it.
          if (current.hasMine && this.props.openCells !== 0) { 
            alert('Game over, you triggered a mine! Click on the face to start over.');
            this.props.endGame();
          }
        }
      }
    });
  };
   //increment when a surrounding cell has a mine that is set to true.
  findMines = cell => {
    let minesInProximity = 0; 
    //search for the nearby mines within the surrounding cells.
    //use indexing to loop through cells that have mines surrounding current cell.
    for (let row = -1; row <= 1; row++) { 
      for (let col = -1; col <= 1; col++) {
        //prevent cells out of board to do nothing to avoid reference errors.
        if (cell.y + row >= 0 && cell.x + col >= 0) { 
          if (
            //ensure that cell falls within the board game.
            cell.y + row < this.state.rows.length && 
            cell.x + col < this.state.rows[0].length
          ) {
            if (
              //check if cell has a mine or not within board range.
              this.state.rows[cell.y + row][cell.x + col].hasMine && 
              !(row === 0 && col === 0)
            ) {
               //count surrounding mines within range around current cell.
              minesInProximity++;
            }
          }
        }
      }
    }
    //return mines in proximity or closeBy.
    return minesInProximity; 
  };

  openAroundCell = cell => {
    let rows = this.state.rows;

    //loop through each neighboring cell around current cell until a cell with a mine in it, is found.
    for (let row = -1; row <= 1; row++) {
      for (let col = -1; col <= 1; col++) {
        if (cell.y + row >= 0 && cell.x + col >= 0) {
          if (
            cell.y + row < this.state.rows.length &&
            cell.x + col < this.state.rows[0].length
          ) {
            if (
              !this.state.rows[cell.y + row][cell.x + col].hasMine &&
              !rows[cell.y + row][cell.x + col].isOpen
            ) {
              this.open(rows[cell.y + row][cell.x + col]);
            }
          }
        }
      }
    }
  };

  render() {
    //create list of rows using map function and add in propperties.
    let rows = this.state.rows.map((cells, index) => ( 
      <Row
        cells={cells}
        open={this.open}
        flag={this.flag}
        //key value added to uniquely identify component.
        key={index} 
      />
    ));
    //return div that displays all of the rows in the board.
    return <div className="board">{rows}</div>; 
  }
}

export default Board;