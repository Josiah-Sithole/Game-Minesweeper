//import React library.
import React from "react";

//https://programmingwithmosh.com/javascript/stateful-stateless-components-react/
/*Create stateless Cell Component that will pass information down.
 ALl conditions of when cell is clicked are passed down below.*/
const Cell = props => {
  let cell = () => {
    // if cell is open condition(isOpen)
     // if cell has a mine condition(hasMine)
    if (props.data.isOpen) { 
      if (props.data.hasMine) {
        return (
          <div
            className="cell open"
            onContextMenu={e => { 
              //prevent default browser behaviour.
              e.preventDefault(); 
            }}
            //pass in data on click.
            onClick={() => props.open(props.data)} 
          >
            {/*mine image code is wrapped between span tags. */}
            <span className='mine' role='img' aria-label='mine'>&#128165;</span> 
          </div>
        );
        // Board game cell conditions:
      } else if (props.data.count === 0) { 
        return (
          <div
            className="cell open"
            onContextMenu={e => {
              e.preventDefault();
              props.flag(props.data);
            }}
            onClick={() => props.open(props.data)}
          />
        );
      } else {
        return (
          <div
            className="cell open"
            onContextMenu={e => {
              //prevent default browser behaviour.
              e.preventDefault();
            }}
            onClick={() => props.open(props.data)}
          >
            {props.data.count}
          </div>
        );
      }
    } else if (props.data.hasFlag) {
      return (
        <div
          className="cell open-flag"
          onContextMenu={e => {

            e.preventDefault();
            props.flag(props.data);
          }}
          onClick={() => props.open(props.data)}
        >
          <span role='img' aria-label='flag'>&#127988;</span>
        </div>
      );
    } else {
      return (
        <div
          className="cell"
          onContextMenu={e => {
            e.preventDefault();
            props.flag(props.data);
          }}
          onClick={() => props.open(props.data)}
        />
      );
    }
  };
  return cell();
};

export default Cell;