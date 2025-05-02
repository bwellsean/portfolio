import React from "react";
import TetrisApp from "../Components/Arcade/games/TetrisGame/TetrisApp";

const TetrisGame = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 min-h-screen bg-gray-900">
      <div className="flex flex-row">
        <a
          href="/arcade"
          className="text-white absolute left-4 top-40 bg-emerald-600 hover:bg-emerald-700 px-6 py-2 h-10 rounded-lg"
        >
          Back to Arcade
        </a>

        <h2 className="text-4xl text-emerald-400 mb-6">Tetris</h2>
      </div>
      {/* Game area? */}
      <div className="w-1/2">
        <TetrisApp />
      </div>
    </div>
  );
};

export default TetrisGame;
