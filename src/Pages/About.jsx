import React from "react";
import useDocumentTitle from "./../Hooks/useDocumentTitle";

const About = () => {
  useDocumentTitle("About");

  return (
    <section className="bg-[var(--c-emerald)] text-[var(--c-font-dark)] p-10 text-center shadow-xl">
      <div className="m-auto w-3/4">
        <h2 className="text-3xl">
          {`<Hi there!`}
          <span className="text-[var(--c-font-light)] text-shadow-lg bg-[var(--c-cream)]">
            {" "}
            I'm Sean.
          </span>
          {` />`}
        </h2>
        <p className="mt-6 text-md md:text-lg">
          Hey there! I'm a front-end developer who used to wrangle middle
          schoolers in computer science class. Now, I wrangle code (mostly for
          good, sometimes it puts up a fight 😉). I'm all about making the
          internet a prettier and more functional place using cool stuff like
          React, Next.js, and Tailwind CSS. My portfolio has a bunch of things
          I've built, including a web app that tries to make sense of all those
          recipes online (RecipeRip) and another that's got AI helping students
          be awesome online (because, you know, the internet can be weird).
          Ultimately, I just want to build things that help people and maybe
          make them smile. So, if you're looking for someone who's enthusiastic,
          maybe a little goofy, and definitely loves to code, let's chat!
        </p>
      </div>
    </section>
  );
};

export default About;
