import React, { useState } from "react";
import { signIn } from "../utils/auth";

const Login = ({ onSuccess, onSwitchToSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signIn(email, password);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message || "failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">
        Welcome to the Arcade!
      </h2>
      <h2 className="text-2xl font-bold mb-4 text-center text-white">Log In</h2>
      {error && (
        <div className="text-red-500 bg-red-100 p-2 rounded text-center">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="email" className="block mb-1 text-white">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded bg-gray-800 text-white"
        />
      </div>
      <div>
        <label htmlFor="password" className="block mb-1 text-white">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded bg-gray-800 text-white"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 cursor-pointer"
      >
        {loading ? "Siging in..." : "Sign In"}
      </button>
      <div className="text-center text-sm text-gray-400">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToSignup}
          className="text-blue-400 hover:underline cursor-pointer"
        >
          Sign up
        </button>
      </div>
    </form>
  );
};

export default Login;
