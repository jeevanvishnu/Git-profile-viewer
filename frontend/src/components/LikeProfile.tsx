import React from "react";
import { FaHeart } from "react-icons/fa6";
import { useAuthContext } from "../context/AuthContex";
import axios from "axios";
import toast from "react-hot-toast";
const LikeProfile = ({ userProfile }) => {
  const { authUser } = useAuthContext();

  const isOwnProfile = authUser?.userName === userProfile?.login;

  const handleLikeProfile = async () => {
    const username = userProfile?.login;
    try {
      const res = await axios.post(`/api/v1/user/likes/${username}`);

      const data = await res.data;

      if (data.error) {
        toast.error(data.error);
      }
      toast.success(data.message);
    } catch (err) {
      toast.error(err.message);
    }

    if (!authUser || isOwnProfile) return null;
  };

  return (
    <button
      className="p-2 text-xs w-full font-medium rounded-md bg-glass border border-blue-400 flex items-center gap-2"
      onClick={handleLikeProfile}
    >
      <FaHeart size={16} /> Like Profile
    </button>
  );
};

export default LikeProfile;
