import React, { createContext, useContext } from "react";
import useTetrisGame from "../hooks/useTetrisGame";

const TetrisContext = createContext(null);

export const TetrisProvider = ({ children }) => {
  const tetrisGame = useTetrisGame();

  return (
    <TetrisContext.Provider value={tetrisGame}>
      {children}
    </TetrisContext.Provider>
  );
};

export const useTetrisContext = () => {
  const context = useContext(TetrisContext);
  if (!context) {
    throw new Error("useTetrisContext must be used within a TetrisProvider");
  }
  return context;
};

export default TetrisContext;
