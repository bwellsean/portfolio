import React from "react";
import Header from "../Components/Header";
import Hero from "../Components/Hero";
import About from "./About";
import Projects from "./Projects";
import Contact from "./Contact";
import useDocumentTitle from "../Hooks/useDocumentTitle";
import useMetadata from "../Hooks/Meta";

const Home = () => {
  useDocumentTitle("Home");
  const metadata = useMetadata({
    title: "Home",
    description:
      "Sean Blackwell - Developer, Designer, & Educator. Building beautiful things with code and teaching the future of the industry.",
    keywords:
      "web development, front-end developer, react developer, educator, portfolio",
    ogTitle: "Sean Blackwell - Developer, Designer, & Educator",
    ogDescription:
      "Building beautiful things with code and teaching the future of the industry",
    ogImage: "https://sean-blackwell.com/assets/cartoonIcon.svg",
    ogUrl: "https://sean-blackwell.com",
    canonicalUrl: "https://sean-blackwell.com",
  });

  return (
    <div>
      {metadata}
      <Hero />
      <About />
      <Projects />
      <Contact />
    </div>
  );
};

export default Home;
