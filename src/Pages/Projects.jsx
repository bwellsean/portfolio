import React from "react";
import useDocumentTitle from "../Hooks/useDocumentTitle";
import "./../index.css";
const Projects = () => {
  useDocumentTitle("Projects");

  return (
    <section className="flex flex-col justify-center text-[var(--c-cream)] dark:text-[var(--c-green)] items-center bg-[url(public/assets/texture.png)] bg-fill p-4">
      <h2 className="text-3xl text-[var(--c-font-light)] text-shadow-lg">
        {`<The Things`}
        <span className="bg-[var(--c-font-light)] text-[var(--c-cream)]">
          {" "}
          I build!
        </span>
        {` />`}
      </h2>
      <div className="card-grid grid grid-cols-1 md:grid-cols-3 md:grid-rows-1 text-[var(--c-font-light)]">
        <div className="bg-[var(--c-green)] dark:bg-[var(--c-cream)] m-4 p-4 rounded-lg shadow-lg hover:translate-y-[-5px] hover:shadow-2xl transition ease-in-out duration-300">
          <h3 className="text-xl text-center text-shadow-md underline decoration-wavy decoration-[var(--c-font-accent)]">
            RecipeRip
          </h3>
          <p>
            In its current form, RecipeRip's main feature takes a link from any
            food blog and uses AI powered by Gemini to pull the "rip" the recipe
            out of the blog, organizing the information neatly into ingredients
            needed and instructions. Other features include a recipe book to
            save ripped recipes, a shopping list, and a place to enter your own
            recipe. In the future, we hope to add the ability to rip recipes
            from videos as well as implement a community to share recipes.
          </p>
          <h3 className="text-md mt-2 underline decoration-wavy">Tech Stack</h3>
          <ul className="list-disc marker:text-[var(--c-font-accent)] ml-4">
            <li>Next.JS React</li>
            <li>Typescript</li>
            <li>MongoDB</li>
          </ul>
        </div>
        <div className="bg-[var(--c-green)] dark:bg-[var(--c-cream)] m-4 p-4 rounded-lg shadow-lg hover:translate-y-[-5px] hover:shadow-2xl transition ease-in-out duration-300">
          <h3 className="text-xl text-center text-shadow-md underline decoration-wavy decoration-[var(--c-font-accent)]">
            Freelance Web design
          </h3>
          <p>
            I have recently completed a couple of projects for clients at an
            HVAC company called{" "}
            <a
              href="https://heroeshvac.com"
              target="_blank"
              className="text-emerald-800 underline decoration-wavy"
            >
              Air Heroes{" "}
            </a>
            and a local law firm{" "}
            <a
              href="https://law-firm-ashen-beta.vercel.app/"
              target="_blank"
              className="text-emerald-800 underline decoration-wavy"
            >
              Stephen G. Taylor
            </a>
          </p>
          <h3 className="text-md mt-2 underline decoration-wavy">Tech Stack</h3>
          <ul className="list-disc marker:text-[var(--c-font-accent)] ml-4">
            <li>React w/Vite</li>
            <li>TailwindCSS</li>
            <li>Express</li>
          </ul>
        </div>
        <div className="bg-[var(--c-green)] dark:bg-[var(--c-cream)] m-4 p-4 rounded-lg shadow-lg hover:translate-y-[-5px] hover:shadow-2xl transition ease-in-out duration-300">
          <h3 className="text-xl text-center text-shadow-md underline decoration-wavy decoration-[var(--c-font-accent)]">
            Student Social App
          </h3>
          <p>
            NoTox(possibly renamed later) is, at its core, a social media app.
            The difference? This app is designed for students k-12 to learn how
            to have a positive online presence. The main feature being an AI
            filter to check for toxicity in every post or comment.
          </p>
          <h3 className="text-md mt-2 underline decoration-wavy">Tech Stack</h3>
          <ul className="list-disc marker:text-[var(--c-font-accent)] ml-4">
            <li>React with Vite</li>
            <li>Typescript</li>
            <li>Appwrite backend service</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Projects;
