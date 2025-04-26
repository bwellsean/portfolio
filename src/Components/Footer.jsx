import React from "react";
import { FaGithub, FaFacebook, FaLinkedin } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { Link } from "react-router-dom";
import ThemeButton from "./ThemeButton";

const Footer = () => {
  return (
    <footer>
      <div className="flex flex-row items-center w-full mt-4 ml-4 mb-2">
        <ThemeButton />
      </div>
      <div className="flex flex-row flex-wrap justify-center items-center gap-10 m-6">
        <IconContext.Provider
          value={{
            className:
              "h-10 w-10 text-[var(--c-emerald)] transition duration-300 hover:scale-125",
          }}
        >
          <a href="https://github.com/bwellsean" target="_blank">
            <FaGithub />
          </a>
          <a href="https://www.facebook.com/seanmblackwell" target="_blank">
            <FaFacebook />
          </a>
          <a href="https://www.linkedin.com/in/sean-blackwell/" target="_blank">
            <FaLinkedin />
          </a>
        </IconContext.Provider>
      </div>
      <div className="flex flex-col items-center mb-4">
        <ul className="p-4 text-lg">
          <li className="m-2 hover:underline decoration-wavy decoration-[var(--c-font-accent)] hover:scale-125 hover:text-shadow-lg transition-all ease-in-out duration-300">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="m-2 hover:underline decoration-wavy decoration-[var(--c-font-accent)] hover:scale-125 hover:text-shadow-lg transition-all ease-in-out duration-300">
            <Link to="/about">About</Link>
          </li>
          <li className="m-2 hover:underline decoration-wavy decoration-[var(--c-font-accent)] hover:scale-125 hover:text-shadow-lg transition-all ease-in-out duration-300">
            <Link to="/projects">Projects</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
