import { useState } from "react";
import "./LudoBoard.css";

export default function LudoBoard() {

  const players = ["blue","red","yellow","green"];

  const [moves,setMoves] = useState({
    blue:0,
    red:0,
    yellow:0,
    green:0
  });

  const [turn,setTurn] = useState(0);
  const [dice,setDice] = useState(1);
  const [winner,setWinner] = useState("");

  const rollDice = () =>{
    const random = Math.floor(Math.random()*6)+1;
    setDice(random);
  }

  const movePlayer = () =>{

    if(winner) return;

    const current = players[turn];

    setMoves((prev)=>{
      const updated = {
        ...prev,
        [current]: prev[current] + dice
      }

      if(updated[current] >= 20){
        setWinner(current);
      }

      return updated;
    });

    setTurn((turn+1)%4);
  }

  const resetGame = ()=>{
    setMoves({
      blue:0,
      red:0,
      yellow:0,
      green:0
    });

    setWinner("");
    setTurn(0);
    setDice(1);
  }

  return(

    <div className="container">

      <h1>🎲 React Ludo Game</h1>

      <h2>Current Turn : {players[turn].toUpperCase()}</h2>

      <img
      className="dice"
      src={`/src/assets/dice${dice}.png`}
      />

      <div className="controls">
        <button onClick={rollDice}>Roll Dice</button>
        <button onClick={movePlayer}>Move</button>
      </div>

      {winner && <h2 className="winner">🏆 {winner.toUpperCase()} Wins!</h2>}

      <div className="board">

        <div className="player blue">
          Blue : {moves.blue}
        </div>

        <div className="player red">
          Red : {moves.red}
        </div>

        <div className="player yellow">
          Yellow : {moves.yellow}
        </div>

        <div className="player green">
          Green : {moves.green}
        </div>

      </div>

      <button className="reset" onClick={resetGame}>
        Reset Game
      </button>

    </div>
  )
}