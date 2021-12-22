import { useState } from "react";
import "./App.css";
import { AppBar, Button, Toolbar } from "@mui/material";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

function App() {
  const [board, setBoard] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const [isXturn, setisXturn] = useState(true);

  const handleClick = (index) => {
    console.log(styles);
    if (!styles && !winner && board[index] == null) {
      const boardCopy = [...board];
      boardCopy[index] = isXturn === true ? "X" : "O";
      setisXturn(!isXturn);
      setBoard(boardCopy);
    }
  };

  const decideWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] !== null && board[a] === board[b] && board[a] === board[c]) {
        console.log("Winner", a, b, c);
        return board[a];
      }
    }
    return null;
  };

  let winner = decideWinner(board);
  const reset = () => {
    setBoard([null, null, null, null, null, null, null, null, null]);
    winner = null;
    setStyles(true);
  };

  const { width, height } = useWindowSize();
  let [styles, setStyles] = useState(true);
  return (
    <div className="App">
      <AppBar>
        <Toolbar>
          <Button color="inherit">TicTacToe</Button>
          <Button color="inherit" onClick={() => reset()}>
            Reset Game
          </Button>
        </Toolbar>
      </AppBar>
      <p>
        Tic-tac-toe is a game for two players, X and O, who take turns marking
        the spaces in a 3×3 grid. The player who succeeds in placing three of
        their marks in a horizontal, vertical, or diagonal row wins the game.
      </p>
      {styles === true ? (
        <div className="choose">
          <span>Choose X or O : </span>
          <Button
            varient="contained"
            onClick={() => {
              setisXturn(true);
              setStyles(false);
            }}
          >
            X
          </Button>
          <span> </span>
          <Button
            varient="contained"
            onClick={() => {
              setisXturn(false);
              setStyles(false);
            }}
          >
            O
          </Button>
        </div>
      ) : (
        ""
      )}
      <div className="game">
        <div className="game-container">
          {board.map((val, index) => (
            <GameBox val={val} onPlayerClick={() => handleClick(index)} />
          ))}
        </div>
        {winner === null ? "" : <Confetti width={width} height={height} />}
        {winner === null ? (
          isXturn === true ? (
            <h2>X turn</h2>
          ) : (
            <h2> O turn</h2>
          )
        ) : (
          <h2>Winner of the game is {winner}</h2>
        )}
      </div>
    </div>
  );
}

function GameBox({ val, onPlayerClick }) {
  // const [val, setVal] = useState(null);
  const styles = { color: val === "X" ? "green" : "red" };
  return (
    <div className="game-box" style={styles} onClick={() => onPlayerClick()}>
      {val}
    </div>
  );
}

export default App;
