import React from "react";
import "./../index.css";

const Hero = () => {
  return (
    <main className="h-auto mt-10">
      <section className="flex col justify-center items-center">
        <div className="text-center">
          <h1 className="p-4 text-shadow-sm">
            Developer, Designer, & Educator
          </h1>
          <p className="text-lg text-shadow-sm p-4">
            I love building beautiful things with code and teaching the future
            of the industry.
          </p>
          <div>
            <img
              className="h-75 w-75 rounded-lg m-auto"
              src="public/assets/cartoonIcon.svg"
              alt="cartoon image of Sean"
            />
          </div>
          <img
            className="w-3/4 m-auto"
            src="public/assets/heroFooter.svg"
            alt="hero footer icons"
          />
        </div>
      </section>
    </main>
  );
};

export default Hero;
