import { Link } from "react-router-dom";

const GameCard = ({ title, screenImg, bannerImg, gameLink, highScore }) => {
  return (
    <div className="w-60 bg-[var(--c-cream)] rounded-2xl shadow-2xl transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-emerald-300 hover:shadow-2xl">
      <div className="p-4">
        {/* Banner Image */}
        <div className="border-4 mb-4 border-black rounded-xl">
          <img
            src={bannerImg}
            alt={`${title} banner`}
            className=" w-full rounded-xl"
          />
        </div>

        {/* Screen Image */}
        <div className="w-52 h-52">
          <img
            src={screenImg}
            alt={`${title} game`}
            className="rounded-2xl border-4 border-black shadow-xl w-full"
          />
        </div>

        {/* Score */}
        <div className="mt-3">
          <h3 className="text-xl text-[var(--c-font-light)] font-bold">
            High score:{" "}
            <span className="text-[var(--c-green)]">{highScore}</span>
          </h3>
        </div>

        {/* Play Button */}
        <Link
          to={gameLink}
          className="block w-full cursor-pointer bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg text-center mt-4 transition-colors"
        >
          PLAY
        </Link>
      </div>
    </div>
  );
};

export default GameCard;
