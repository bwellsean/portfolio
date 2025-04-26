import React from "react";
import Header from "../Components/Header";
import Hero from "../Components/Hero";
import About from "./About";
import Projects from "./Projects";
import Contact from "./Contact";
import useDocumentTitle from "../Hooks/useDocumentTitle";

const Home = () => {
  useDocumentTitle("Home");

  return (
    <div>
      <Hero />
      <About />
      <Projects />
      <Contact />
    </div>
  );
};

export default Home;
