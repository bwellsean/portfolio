import supabase from "./supabase";

export const saveScore = async (gameType, score, metadata = {}) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("User must be logged in to save scores");
    }

    const { data, error } = await supabase.from("high_scores").insert([
      {
        user_id: user.id,
        game: gameType,
        score: score,
        metadata: metadata,
      },
    ]);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error saving score:", error);
    throw error;
  }
};

export const getTopScores = async (gameType, limit = 10) => {
  try {
    const { data, error } = await supabase
      .from("high_scores")
      .select(
        `
      id,
      score,
      created_at,
      metadata,
      users:user_id (email)
      `
      )
      .eq("game", gameType)
      .order("score", { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  } catch (error) {
    console.log("Error fetching scores:", error);
    return [];
  }
};

export const getUserBestScore = async (gameType) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    // This query gets a single score result
    const { data, error } = await supabase
      .from("high_scores")
      .select("score, created_at")
      .eq("game", gameType)
      .eq("user_id", user.id)
      .order("score", { ascending: false })
      .limit(1)
      .single();

    if (error) {
      // If no records are found, we get a 406 error with .single()
      if (error.code === "PGRST116") {
        return null; // No scores found for this game
      }
      console.error("Error fetching user score:", error);
      return null;
    }

    // Since we're using .single(), data is already the object we need
    return data.score;
  } catch (error) {
    console.error("Error fetching user score:", error);
    return null;
  }
};

export const getAllUserBestScores = async () => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return {};

    // This query gets all scores for the user
    const { data, error } = await supabase
      .from("high_scores")
      .select("game, score")
      .eq("user_id", user.id)
      .order("score", { ascending: false });

    if (error) {
      console.error("Error fetching user scores:", error);
      return {};
    }

    // Create an object mapping game types to highest scores
    const bestScores = {};

    // Process all the scores and keep only the highest for each game
    data.forEach((score) => {
      if (!bestScores[score.game] || score.score > bestScores[score.game]) {
        bestScores[score.game] = score.score;
      }
    });

    return bestScores;
  } catch (error) {
    console.error("Error fetching user scores:", error);
    return {};
  }
};
