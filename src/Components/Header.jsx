import React from "react";
import ThemeButton from "./ThemeButton";
import "./../App.css";
import { NavLink } from "react-router";

const Header = () => {
  return (
    <header>
      <div className="flex flex-row justify-between items-center shadow-lg dark:bg-[#242424] dark:text-[var(--c-font-dark)]">
        <img src="public/assets/logo.jpg" className="w-25 h-25 ml-4 p-2" />
        {/* <div className="hidden md:flex m-4">
          <ThemeButton />
        </div> */}

        <h1 className="text-xl md:text-3xl cursor-pointer m-5 tansition-all duration-200 hover:text-[var(--c-font-accent)] hover:rotate-[-20deg] hover:text-shadow-lg hover:animate-bounce hover:underline-animation hover:underline hover:decoration-wavy hover:scale-150 hover:translate-y-8">
          <NavLink to="/">{`<Sean Blackwell />`}</NavLink>
        </h1>

        <div className="hidden md:block">
          <ul className="flex gap-4 mr-8 md:gap-12">
            <li className="wiggle text-2xl cursor-pointer hover:bg-[var(--c-emerald)] hover:underline hover:decoration-wavy hover:decoration-[var(--c-font-accent)] hover:-translate-x-[10px] hover:-translate-y-2 transition-all duration-300 p-2 rounded-lg hover:shadow-lg hover:text-[var(--c-cream)]">
              <NavLink to="/contact">Say Hello</NavLink>
            </li>
            <li className="text-2xl cursor-pointer hover:bg-[var(--c-emerald)] hover:underline hover:decoration-wavy hover:decoration-[var(--c-font-accent)] hover:-translate-x-[10px] hover:-translate-y-2 transition-all duration-300 p-2 rounded-lg hover:shadow-lg hover:text-[var(--c-cream)]">
              <NavLink to="/about">About</NavLink>
            </li>
            <li className="text-2xl cursor-pointer hover:bg-[var(--c-emerald)] hover:underline hover:decoration-wavy hover:decoration-[var(--c-font-accent)] hover:-translate-x-[10px] hover:-translate-y-2 transition-all duration-300 p-2 rounded-lg hover:shadow-lg hover:text-[var(--c-cream)]">
              <NavLink to="projects">Projects</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
