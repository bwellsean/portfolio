import React, { useState, useEffect } from "react";
import GameCard from "../Components/Arcade/GameCard";
import { useAuth } from "../utils/AuthProvider";
import { Link } from "react-router-dom";
import UserProfile from "../Components/UserProfile";
import { getAllUserBestScores } from "../utils/saveScore";
import ComingSoon from "../Components/Arcade/ComingSoon";

const ArcadePage = () => {
  const { user, loading } = useAuth();
  const [highScores, setHighScores] = useState({
    tetris: null,
    dino: null,
    quiz: null,
  });
  const [scoresLoading, setScoresLoading] = useState(false);

  useEffect(() => {
    const fetchUserScores = async () => {
      if (!user) return;

      setScoresLoading(true);
      try {
        const scoreMap = await getAllUserBestScores();

        setHighScores({
          tetris: scoreMap.tetris || null,
          dino: scoreMap.dino || null,
          quiz: scoreMap.quiz || null,
        });
      } catch (error) {
        console.error("Error fetching scores", error);
      } finally {
        setScoresLoading(false);
      }
    };
    fetchUserScores();
  }, [user]);

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  const getHighScoreDisplay = (game) => {
    if (!user) return "Login to track scores";
    if (scoresLoading) return "loading...";
    if (highScores[game] === null) return "No scores yet";
    return highScores[game].toLocaleString();
  };

  return (
    <div className="p-6 bg-[url(assets/arcadeBg.png)] bg-center ">
      <h2 className="text-4xl text-center p-4 text-[var(--c-font-dark)] dark:text-shadow-lg dark:text-shadow-emerald-500">{`<Welcome to the Arcade />`}</h2>

      <div className="mr-4">
        {user ? (
          <div className="flex flex-col float-left items-center gap-4">
            <span className="text-white text-2xl bg-purple-700 px-3 py-1 rounded-md">
              {user.email.split("@")[0]}
            </span>
            <UserProfile />
          </div>
        ) : (
          <Link
            to="/arcade/login"
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
          >
            Sign In to Save Scores
          </Link>
        )}
      </div>
      <div className="flex flex-row flex-wrap justify-center m-4 gap-6">
        <GameCard
          title="Tetris"
          bannerImg={"assets/tetrisBanner.jpg"}
          screenImg={"assets/tetrisCover.png"}
          gameLink={"/arcade/tetris"}
          highScore={getHighScoreDisplay("tetris")}
        />
        <GameCard
          title="DinoRun"
          bannerImg={"assets/dinoBanner.png"}
          screenImg={"assets/dinoScreen.png"}
          gameLink={"/arcade/dino"}
          highScore={getHighScoreDisplay("dino")}
        />
        <GameCard
          title="Sean Quiz App"
          bannerImg={"assets/QuizBanner.png"}
          screenImg={"assets/QuizScreen.png"}
          gameLink={"/arcade/quiz"}
          highScore={getHighScoreDisplay("quiz")}
        />
      </div>
      <div className="absolute left-184 top-57">
        <ComingSoon />
      </div>
      <div className="absolute right-57.5 top-57">
        <ComingSoon />
      </div>
    </div>
  );
};

export default ArcadePage;
