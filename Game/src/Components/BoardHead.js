//import React library.
import React from "react"; 

//import React typechecking property to check for bugs: 
import PropTypes from "prop-types";

//create Boardhead that contains timer, flag count and reset button.
const BoardHead = props => {
//Variables for minutes and seconds.
//Use math.floor to round time off to nearest integral.
  let minutes = Math.floor(props.time / 60); 
  let formattedSeconds = props.time - minutes * 60 || 0;

  formattedSeconds =
    //ternary operator:
    //If seconds are less than 10, then zero will be infront of it.
    formattedSeconds < 10 ? `0${formattedSeconds}` : formattedSeconds; 
    // Time variable using string literals.
  let time = `${minutes}:${formattedSeconds}`; 
  let status =
    props.status === "running" || props.status === "waiting" ? (
      //happy face emoji added for running and waiting game mode.
      <span className='happy-face' role='img' aria-label='angel face'>&#128519;</span>
    ) : (
        //sad face emoji added for end of game mode.
        <span className="sad-face" role='img' aria-label='crushed face'>&#128534;</span>
      );
  return (
    <div className="board-head">
       {/*pass in flag count. */}
      <div className="flag-count"> Flags: {props.flagsUsed}</div>
         {/*pass through reset button. */}
      <button className="reset" onClick={props.reset}> 
        {status}
      </button>
      <div className="timer">Time: {time}</div> 
    </div>
  );
};

//ensure that data received is valid:
BoardHead.propTypes = {
  time: PropTypes.number.isRequired,
  flagsUsed: PropTypes.number.isRequired
};

export default BoardHead;