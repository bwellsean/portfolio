import React, { useCallback, useRef } from "react";
import { useTick, extend } from "@pixi/react";
import { Container, Graphics } from "pixi.js";
import { useTetrisContext } from "../utils/TetrisContext";

extend({ Container, Graphics });

const GameBoard = () => {
  const {
    currentPiece,
    position,
    updateBoard,
    ROWS,
    COLS,
    level,
    gameOver,
    isPaused,
    moveDown,
    getGhostPosition,
  } = useTetrisContext();

  const dropCounter = useRef(0);
  const lastTime = useRef(0);

  //drop level calc in milliseconds
  const getDropInterval = useCallback(() => {
    return Math.max(100, 800 * Math.pow(0.8, level - 1));
  }, [level]);

  const gameTick = useCallback(() => {
    if (gameOver || isPaused) return;

    const now = Date.now();
    const deltaTime = now - lastTime.current;
    lastTime.current = now;

    dropCounter.current += deltaTime;

    if (dropCounter.current > getDropInterval()) {
      moveDown();
      dropCounter.current = 0;
    }
  }, [moveDown, gameOver, isPaused, getDropInterval]);

  //useTick
  useTick(gameTick);

  const drawGrid = useCallback(
    (graphics) => {
      graphics.clear();

      const gridSize = 30; //size of the cell
      const width = 10 * gridSize; //this will make grid 10 cells wide
      const height = 20 * gridSize; //grid will be 20 high

      graphics.setFillStyle({ color: 0x000000 });
      graphics.rect(0, 0, width, height);
      graphics.fill();

      graphics.setStrokeStyle({ width: 1, color: 0x333333 });

      for (let i = 0; i <= COLS; i++) {
        graphics.moveTo(i * gridSize, 0);
        graphics.lineTo(i * gridSize, height);
      }

      for (let j = 0; j <= ROWS; j++) {
        graphics.moveTo(0, j * gridSize);
        graphics.lineTo(width, j * gridSize);
      }

      graphics.stroke();

      const displayBoard = updateBoard();
      if (displayBoard) {
        for (let row = 0; row < ROWS; row++) {
          for (let col = 0; col < COLS; col++) {
            const cellValue = displayBoard[row][col];
            if (cellValue !== 0) {
              graphics.setFillStyle({ color: cellValue });
              graphics.rect(col * gridSize, row * gridSize, gridSize, gridSize);
              graphics.fill();
            }
          }
        }
      }

      const ghostPosition = getGhostPosition();
      if (ghostPosition && currentPiece && ghostPosition.y !== position.y) {
        const { shape, color } = currentPiece;
        const { x, y } = ghostPosition;

        graphics.setFillStyle({
          color,
          alpha: 0.3,
        });

        for (let row = 0; row < shape.length; row++) {
          for (let col = 0; col < shape[row].length; col++) {
            if (shape[row][col] !== 0) {
              const boardY = row + y;
              const boardX = col + x;

              if (
                boardY >= 0 &&
                boardY < ROWS &&
                boardX >= 0 &&
                boardX < COLS
              ) {
                graphics.rect(
                  boardX * gridSize,
                  boardY * gridSize,
                  gridSize,
                  gridSize
                );
                graphics.fill();
              }
            }
          }
        }
      }
    },
    [currentPiece, position, COLS, ROWS, updateBoard, getGhostPosition]
  );

  return (
    <pixiContainer>
      <pixiGraphics draw={drawGrid} />
    </pixiContainer>
  );
};

export default GameBoard;
