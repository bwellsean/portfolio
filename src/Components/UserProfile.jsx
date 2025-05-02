import React from "react";
import { signOut } from "../utils/auth";
import { useAuth } from "../utils/AuthProvider";

const UserProfile = () => {
  const { user } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg text-white text-center">
      <div className="flex flex-col items-center justify-between">
        <div className="">
          <div className="text-lg font-medium m-2">{user.email}</div>
          <div className="text-sm m-2 text-gray-400">
            Member since {new Date(user.created_at).toLocaleDateString()}
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm m-2 cursor-pointer"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
