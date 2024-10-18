import './App.css';
import { useState, useEffect } from 'react';
import Square from './Components/Square';
import { Patterns } from './Components/Patterns';
function App() {
  //initialize an empty board
  const [board, setBoard] = useState(["","","","","","","","",""])
  const [player, setPlayer] = useState("O")
  const [result, setResult] = useState({winner : "none", game_state:"none"})
  const chooseSquare = (square) => {
    setBoard(
      board.map((val, idx) => {
        if(idx == square && val==""){
        return player
      }

      return val}
      )
    );
    
   
    
  }

  const checkIfTie = () => {
    let filled = true
    board.forEach((square)=>{
      if(square==""){
        filled = false
      }
    })

    if(filled){
      setResult({winner:"No one won", game_state:"Tie"})
    }
  }

  useEffect(()=>{
    console.log("application is re-rendering")
    checkWin()
    checkIfTie()
    if(player == "X"){
      setPlayer("O")
    }
    else{
      setPlayer("X")
    }
  }, [board])

  useEffect(()=>{
    console.log(result.game_state)
    if(result.game_state!="none"){
      alert(`the game is over. Winner : ${result.winner}`)
      restartGame()

    }
  }, [result])

  const checkWin = () => {
    Patterns.forEach((currentPattern) => {
      let firstPlayer = board[currentPattern[0]]
      if (firstPlayer=="") return
      let winningPatternFound = true
      currentPattern.forEach((idx)=>{
        if(board[idx] != firstPlayer){
          winningPatternFound =false
        }
      })

      if(winningPatternFound){
        setResult({winner:player, game_state:"won"})
      }

    })
    
  }

  const restartGame = ()=>{
    setBoard(["","","","","","","","",""])
    setPlayer("O")
  }

  return (
    <div className="App">
      <div className='board'>
        <div className='row'>
          <Square val={board[0]} chooseSquare={() => chooseSquare(0)}/>
          <Square val={board[1]} chooseSquare={() => chooseSquare(1)}/>
          <Square val={board[2]} chooseSquare={() => chooseSquare(2)}/>
        </div>
        <div className='row'>
          <Square val={board[3]} chooseSquare={() => chooseSquare(3)}/>
          <Square val={board[4]} chooseSquare={() => chooseSquare(4)}/>
          <Square val={board[5]} chooseSquare={() => chooseSquare(5)}/>
        </div>
        <div className='row'>
          <Square val={board[6]} chooseSquare={() => chooseSquare(6)}/>
          <Square val={board[7]} chooseSquare={() => chooseSquare(7)}/>
          <Square val={board[8]} chooseSquare={() => chooseSquare(8)}/>
        </div>
      </div>
    </div>
  );
}

export default App;
