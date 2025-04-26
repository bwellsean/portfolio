import React, { useState } from "react";
import ThemeButton from "./ThemeButton";
import "./../App.css";
import { NavLink } from "react-router";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
    console.log("Button clicked", isOpen);
  };

  return (
    <header className="sticky z-50 top-0 w-full">
      <div className="flex flex-row justify-between items-center shadow-lg dark:bg-[#242424] dark:text-[var(--c-font-dark)]">
        <img
          src="/assets/logo.jpg"
          className="hidden lg:flex w-25 h-25 ml-4 p-2"
        />
        <div className="p-4 z-50">
          <button
            onClick={handleClick}
            className="lg:hidden flex flex-col justify-center items-center cursor-pointer gap-1"
          >
            <span
              className={`bg-[var(--c-font-light)] block transition-all duration-300 ease-out h-1 w-8 rounded-sm ${
                isOpen ? "rotate-45 translate-y-2" : "-translate-y-0.5"
              }`}
            ></span>
            <span
              className={`bg-[var(--c-font-light)] block transition-all duration-300 ease-out h-1 w-8 rounded-sm ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`bg-[var(--c-font-light)] block transition-all duration-300 ease-out h-1 w-8 rounded-sm ${
                isOpen ? "-rotate-45 -translate-y-2" : "translate-y-0.5"
              }`}
            ></span>
          </button>
        </div>

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

      {/* Mobile navigation menu */}
      <div
        className={`lg:hidden fixed top-[64px] left-0 right-0 bg-white dark:bg-[#242424] shadow-lg transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col items-center py-4">
          <ul className="flex flex-col items-center w-full gap-4">
            <li className="text-2xl cursor-pointer hover:bg-[var(--c-emerald)] hover:underline hover:decoration-wavy hover:decoration-[var(--c-font-accent)] transition-all duration-300 p-2 rounded-lg hover:shadow-lg hover:text-[var(--c-cream)] w-3/4 text-center">
              <NavLink to="/" onClick={handleClick}>
                Home
              </NavLink>
            </li>
            <li className="text-2xl cursor-pointer hover:bg-[var(--c-emerald)] hover:underline hover:decoration-wavy hover:decoration-[var(--c-font-accent)] transition-all duration-300 p-2 rounded-lg hover:shadow-lg hover:text-[var(--c-cream)] w-3/4 text-center">
              <NavLink to="/contact" onClick={handleClick}>
                Say Hello
              </NavLink>
            </li>
            <li className="text-2xl cursor-pointer hover:bg-[var(--c-emerald)] hover:underline hover:decoration-wavy hover:decoration-[var(--c-font-accent)] transition-all duration-300 p-2 rounded-lg hover:shadow-lg hover:text-[var(--c-cream)] w-3/4 text-center">
              <NavLink to="/about" onClick={handleClick}>
                About
              </NavLink>
            </li>
            <li className="text-2xl cursor-pointer hover:bg-[var(--c-emerald)] hover:underline hover:decoration-wavy hover:decoration-[var(--c-font-accent)] transition-all duration-300 p-2 rounded-lg hover:shadow-lg hover:text-[var(--c-cream)] w-3/4 text-center">
              <NavLink to="projects" onClick={handleClick}>
                Projects
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
