import React, { useCallback } from "react";
import { extend } from "@pixi/react";
import { Graphics, Container } from "pixi.js";
import { useTetrisContext } from "../utils/TetrisContext";

// Make the components available as JSX elements
extend({ Container, Graphics });

const NextPiecePreview = () => {
  const { nextPiece } = useTetrisContext();

  // Draw the next piece preview
  const drawNextPiece = useCallback(
    (graphics) => {
      graphics.clear();

      if (!nextPiece) return;

      const gridSize = 20; // Smaller grid size for preview
      const { shape, color } = nextPiece;

      const pieceWidth = shape[0].length * gridSize;
      const pieceHeight = shape.length * gridSize;

      const offsetX = (80 - pieceWidth) / 2;
      const offsetY = (80 - pieceHeight) / 2;
      // Draw the piece
      graphics.setFillStyle({ color });

      for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
          if (shape[row][col] !== 0) {
            graphics.rect(
              offsetX + col * gridSize,
              offsetY + row * gridSize,
              gridSize,
              gridSize
            );
            graphics.fill();
          }
        }
      }
    },
    [nextPiece]
  );

  return (
    <pixiContainer x={0} y={0}>
      <pixiGraphics draw={drawNextPiece} />
    </pixiContainer>
  );
};

export default NextPiecePreview;
