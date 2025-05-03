import React, { useEffect, useRef } from "react";
import { Application } from "@pixi/react";
import GameBoard from "./components/GameBoard";
import { TetrisProvider } from "./utils/TetrisContext";
import { useTetrisContext } from "./utils/TetrisContext";
import NextPiecePreview from "./components/NextPiecePreview";
import { useAuth } from "../../../../utils/AuthProvider";
import { useNavigate } from "react-router-dom";
import { saveScore } from "../../../../utils/saveScore";

const TetrisGameContent = () => {
  const {
    score,
    lines,
    level,
    resetGame,
    moveLeft,
    moveDown,
    moveRight,
    rotate,
    gameOver,
    isPaused,
    setIsPaused,
  } = useTetrisContext();

  const handleKeyDown = React.useCallback(
    (e) => {
      if (
        ["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp", "Space"].includes(
          e.key
        )
      ) {
        e.preventDefault();
      }

      switch (e.key) {
        case "ArrowLeft":
          moveLeft();
          break;
        case "ArrowRight":
          moveRight();
          break;
        case "ArrowDown":
          moveDown();
          break;
        case "ArrowUp":
          rotate();
          break;
        default:
          break;
      }
    },
    [moveLeft, moveRight, moveDown, rotate]
  );

  // useEffect(() => {
  //   window.addEventListener("keydown", handleKeyDown);
  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [handleKeyDown]);

  const gameContainerRef = useRef(null);

  useEffect(() => {
    if (gameContainerRef.current) {
      gameContainerRef.current.focus();
    }
  }, []);

  const handleResetGame = () => {
    resetGame();
    setTimeout(() => {
      if (gameContainerRef.current) {
        gameContainerRef.current.focus();
      }
    }, 100);
  };

  // stuff for high scores on game over screen
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div
      className="relative border-4 border-gray-700 rounded-lg overflow-hidden"
      tabIndex={0}
      ref={gameContainerRef}
      onKeyDown={handleKeyDown}
      onFocus={() => console.log("game focused")}
      onBlur={() => console.log("Game lost focus")}
      style={{ outline: "none" }}
    >
      <Application
        width={300}
        height={600}
        options={{ backgroundColor: 0x111111, antialias: true }}
      >
        <GameBoard />
      </Application>

      {/* next pice */}
      <div className="absolute top-4 right-70 bg-black opacity-70 p-2 rounded text-white">
        <div className="text-center mb-1">Next Piece: </div>
        <div className="h-20 w-20 bg bg-gray-900 flex items-center justify-center">
          <Application
            width={80}
            height={80}
            options={{
              backgroundAlpha: 0,
              antialias: true,
            }}
          >
            <NextPiecePreview />
          </Application>
        </div>
      </div>

      {/* Game info overlay */}

      <div className="absolute top-4 right-4 text-3xl bg-black opacity-70 p-2 rounded text-white">
        <div>Score: {score}</div>
        <div>Level: {level}</div>
        <div>Lines: {lines}</div>
      </div>

      {/* game over */}
      {gameOver && (
        <div className="absolute inset-0 bg-black opacity-80 flex flex-col items-center justify-center text-white z-100">
          <h2 className="text-4xl font-bold text-red-500 mb-4">GAME OVER</h2>
          <div className="text-2xl mb-6">
            <p className="mb-1">
              Score: <span className="text-emerald-400">{score}</span>
            </p>
            <p className="mb-1">
              Level: <span className="text-emerald-400">{level}</span>
            </p>
            <p className="mb-1">
              Lines: <span className="text-emerald-400">{lines}</span>
            </p>
          </div>

          {/* saving score area */}
          {user ? (
            <div className="mb-6">
              <button
                onClick={async () => {
                  try {
                    await saveScore("tetris", score, {
                      level: level,
                      lines: lines,
                    });
                    alert("Score saved successfully!");
                  } catch (err) {
                    console.error("Error saving score:", err);
                    alert("Failed to save score");
                  }
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded mb-4"
              >
                Save High Score
              </button>
              <p className="text-gray-300 mb-2 text-sm">
                Playing as {user.email.split("@")[0]}
              </p>
            </div>
          ) : (
            <div className="mb-6">
              <p className="text-gray-300 mb-2">Want to save your score?</p>
              <div className="flex gap-3">
                <button
                  onClick={() => navigate("/arcade/login")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  Sign In
                </button>
                <button
                  onClick={resetGame}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
                >
                  Play Again
                </button>
              </div>
            </div>
          )}

          <button
            onClick={resetGame}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-lg text-xl font-bold transition-colors"
          >
            Play Again
          </button>
        </div>
      )}

      <button
        onClick={handleResetGame}
        className="absolute bottom-4 right-4 bg-emerald-600 text-white px-4 py-2 rounded cursor-pointer"
      >
        Play Again
      </button>
      <button
        onClick={() => setIsPaused(!isPaused)}
        className="absolute bottom-20 right-4 bg-blue-600 text-white px-4 py-4 rounded cursor-pointer z-100"
      >
        {isPaused ? "Resume" : "Pause"}
      </button>

      {isPaused && !gameOver && (
        <div className="absolute inset-0 bg-black opacity-70 flex items-center justify-center text-white">
          <h2 className="text-4xl font-bold">PAUSED</h2>
        </div>
      )}
    </div>
  );
};

const TetrisApp = () => {
  return (
    <TetrisProvider>
      <TetrisGameContent />
    </TetrisProvider>
  );
};
export default TetrisApp;
