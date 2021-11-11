//import React Library
import React from 'react';

//https://codeburst.io/learning-react-js-by-building-a-minesweeper-game-ced9d41560ed
//Sandrip Shretha (2018) article above helped me in coming up with the rules of the game. 
class Rules extends React.Component {
    render(){

    return (
        //the container returns all the goals and rules of the game
    <div className='rules-container'>
      
        <h2>Goal of the Game:</h2>
        <hr/>
        <ol>
         <li>The goal of the game is to find all the mines on the board</li>
         <li>Navigate your way around the board at the same time try and avoid any hidden mines.</li>
         <li>When a cell is clicked it indicates number which helps in trying to avoid nearby mines.</li>
         <li>This as well helps in avoiding certain tiles in the game</li>
         <li>The position of mines is not static which is the tricky part of the game</li>
         <li>Flags are useful in any stage of the games to try and avoid mines</li>
         <li>If you manage to open all the tiles that do not hold a mine, you win the round!</li>

        </ol> 
        <h2> RULES OF THE GAME: </h2>
        <hr/>
        <ol>
        <li>You reveal mines by clicking the cells, if you reveal a mine you loose.</li>
        <li>If you reveal a cell without mine it will show number of mines surrounding the cell.</li>
        <li>You win the game if you are able to reveal all the cells that is not a mine or you have flagged all the cells that is a mine.</li>
        </ol>
    </div>
    )}
}

export default Rules;