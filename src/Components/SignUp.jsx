import React, { useState } from "react";
import { signUp } from "../utils/auth";

const SignUp = ({ onSuccess, onSwitchToLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwors do not match");
      return;
    }

    setLoading(true);

    try {
      await signUp(email, password);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message || "Failed to sign up");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">
        Create Account
      </h2>
      {error && (
        <div className="text-red-500 bg-red-100 p-2 rounded text-center">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="signup-email" className="block mb-1 text-white">
          Email
        </label>
        <input
          id="signup-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded bg-gray-800 text-white"
        />
      </div>

      <div>
        <label htmlFor="signup-password" className="block mb-1 text-white">
          Password
        </label>
        <input
          id="signup-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="w-full px-3 py-2 border rounded bg-gray-800 text-white"
        />
        <p className="text-xs text-gray-400 mt-1">
          Password must be at least 6 characters
        </p>
      </div>

      <div>
        <label htmlFor="confirm-password" className="block mb-1 text-white">
          Confirm Password
        </label>
        <input
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded bg-gray-800 text-white"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 cursor-pointer"
      >
        {loading ? "Creating Account..." : "Sign Up"}
      </button>

      <div className="text-center text-sm text-gray-400">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-blue-400 hover:underline cursor-pointer"
        >
          Log in
        </button>
      </div>
    </form>
  );
};

export default SignUp;
