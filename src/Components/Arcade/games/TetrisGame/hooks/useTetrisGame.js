import { useState, useCallback, useEffect } from "react";
import { TETROMINOES, randomTetromino } from "../utils/tetrominoes";

export const useTetrisGame = () => {
  const ROWS = 20;
  const COLS = 10;

  const createEmptyBoard = () =>
    Array.from({ length: ROWS }, () => Array(COLS).fill(0));

  const [board, setBoard] = useState(createEmptyBoard());
  const [currentPiece, setCurrentPiece] = useState(null);
  const [nextPiece, setNextPiece] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  //resets the game
  const resetGame = useCallback(() => {
    setBoard(createEmptyBoard());
    setCurrentPiece(randomTetromino());
    setNextPiece(randomTetromino());
    setPosition({ x: COLS / 2 - 2, y: 0 });
    setScore(0);
    setLines(0);
    setLevel(1);
    setGameOver(false);
    setIsPaused(false);
  }, []);

  //init the game
  useEffect(() => {
    resetGame();
  }, [resetGame]);

  const checkCollision = useCallback(
    (peice, position) => {
      if (!peice) return false;

      const { shape } = peice;
      const { x, y } = position;

      for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++)
          if (shape[row][col] !== 0) {
            const boardX = col + x;
            const boardY = row + y;

            if (
              boardX < 0 ||
              boardX >= COLS ||
              boardY >= ROWS ||
              //check to see if cell is occupied
              (boardY >= 0 && board[boardY][boardX] !== 0)
            ) {
              return true; //will return if there is a collision
            }
          }
      }
      return false; //will returen if no collision
    },
    [board]
  );

  //update game board with current piece
  const updateBoard = useCallback(() => {
    if (!currentPiece) return;

    //new board with current piece
    const newBoard = board.map((row) => [...row]);
    const { shape, color } = currentPiece;
    const { x, y } = position;

    //add current piece
    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row].length; col++) {
        if (shape[row][col] !== 0) {
          const boardY = row + y;
          const boardX = col + x;

          if (boardY >= 0 && boardY < ROWS && boardX >= 0 && boardX < COLS) {
            newBoard[boardY][boardX] = color;
          }
        }
      }
    }
    return newBoard;
  }, [board, currentPiece, position]);

  // Add these functions to your useTetrisGame.js hook
  const moveLeft = useCallback(() => {
    if (gameOver || isPaused) return;

    const newPosition = { ...position, x: position.x - 1 };
    if (!checkCollision(currentPiece, newPosition)) {
      setPosition(newPosition);
    }
  }, [position, currentPiece, checkCollision, gameOver, isPaused]);

  const moveRight = useCallback(() => {
    if (gameOver || isPaused) return;

    const newPosition = { ...position, x: position.x + 1 };
    if (!checkCollision(currentPiece, newPosition)) {
      setPosition(newPosition);
    }
  }, [position, currentPiece, checkCollision, gameOver, isPaused]);

  const checkLines = useCallback(() => {
    const newBoard = [...board];
    let linesCleared = 0;

    for (let row = ROWS - 1; row >= 0; row--) {
      if (newBoard[row].every((cell) => cell !== 0)) {
        for (let r = row; r > 0; r--) {
          newBoard[r] = [...newBoard[r - 1]];
        }
        newBoard[0] = Array(COLS).fill(0);

        linesCleared++;
        row++;
      }
    }

    if (linesCleared > 0) {
      setBoard(newBoard);

      const linePoints = [0, 40, 100, 300, 1200];
      setScore(
        (prevScore) => prevScore + linePoints[linesCleared] * (level + 1)
      );

      setLines((prevLines) => {
        const newLines = prevLines + linesCleared;

        if (Math.floor(newLines / 10) > Math.floor(prevLines / 10)) {
          setLevel((prevLevel) => prevLevel + 1);
        }

        return newLines;
      });
    }

    return linesCleared;
  }, [board, level]);

  const moveDown = useCallback(() => {
    if (gameOver || isPaused) return;

    if (checkCollision(nextPiece, { x: COLS / 2 - 2, y: 0 })) {
      setGameOver(true);
    }
    const newPosition = { ...position, y: position.y + 1 };
    if (!checkCollision(currentPiece, newPosition)) {
      setPosition(newPosition);
    } else {
      // Lock the piece in place
      setBoard(updateBoard());

      // Check for completed lines
      checkLines();

      // Get a new piece
      setCurrentPiece(nextPiece);
      setNextPiece(randomTetromino());
      setPosition({ x: COLS / 2 - 2, y: 0 });

      // Check for game over
      if (checkCollision(nextPiece, { x: COLS / 2 - 2, y: 0 })) {
        setGameOver(true);
      }
    }
  }, [
    position,
    currentPiece,
    nextPiece,
    checkCollision,
    updateBoard,
    gameOver,
    isPaused,
    checkLines,
  ]);

  const rotate = useCallback(() => {
    if (gameOver || isPaused) return;

    // Simple rotation logic
    const rotatedPiece = {
      ...currentPiece,
      shape: currentPiece.shape[0].map((_, i) =>
        currentPiece.shape.map((row) => row[i]).reverse()
      ),
    };

    if (!checkCollision(rotatedPiece, position)) {
      setCurrentPiece(rotatedPiece);
    }
  }, [currentPiece, position, checkCollision, gameOver, isPaused]);

  const getGhostPosition = useCallback(() => {
    if (!currentPiece) return null;

    // Start from the current position
    let ghostY = position.y;

    // Move the ghost piece down until it collides
    while (!checkCollision(currentPiece, { x: position.x, y: ghostY + 1 })) {
      ghostY++;
    }

    return { x: position.x, y: ghostY };
  }, [currentPiece, position, checkCollision]);

  return {
    board,
    setBoard,
    currentPiece,
    nextPiece,
    position,
    setPosition,
    score,
    setScore,
    lines,
    setLines,
    level,
    setLevel,
    gameOver,
    setGameOver,
    isPaused,
    setIsPaused,
    resetGame,
    checkCollision,
    updateBoard,
    ROWS,
    COLS,
    moveLeft,
    moveRight,
    moveDown,
    rotate,
    getGhostPosition, // Add this line
  };
};

export default useTetrisGame;
