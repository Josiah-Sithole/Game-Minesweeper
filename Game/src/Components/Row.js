//import React library.
import React from "react"; 

//imported Cell Component.
import Cell from "./Cell"; 

//create stateless Row component that contains all of cells.
 //let cells-- create bunch of cells that will contain data and index.
const Row = props => {

  //Map method
  let cells = props.cells.map((data, index) => (
    <Cell data={data} open={props.open} flag={props.flag} key={index} />
  ));
  // return the cells that were made.
  return <div className="row">{cells}</div>; 
};

export default Row;

