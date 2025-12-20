import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaHeart } from "react-icons/fa";
import { formatDate } from "../utils/function";

/* Optional but recommended type */
interface LikeUser {
  _id: string;
  userName: string;
  avatarUrl: string;
  LikedData: string;
}

const LikePage = () => {
  const [likes, setLikes] = useState<LikeUser[]>([]);

  useEffect(() => {
    const getLikes = async () => {
      try {
        const res = await axios.get("/api/v1/user/likes", {
          withCredentials: true,
        });

        if (res.data?.error) {
          throw new Error("Data fetching error");
        }

        setLikes(res.data.likedBy || []);
      } catch (err: any) {
        toast.error(err.message || "Something went wrong");
      }
    };

    getLikes();
  }, []);

  return (
    <div className="relative overflow-x-auto shadow-md rounded-lg px-4">
      <table className="w-full text-sm text-left rtl:text-right bg-glass overflow-hidden">
        <thead className="text-xs uppercase bg-glass">
          <tr>
            <th className="p-4">No</th>
            <th className="px-6 py-3">Username</th>
            <th className="px-6 py-3">Date</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {likes.length > 0 ? (
            likes.map((user, idx) => (
              <tr className="bg-glass border-b" key={user._id}>
                <td className="p-4">{idx + 1}</td>

                <td className="flex items-center px-6 py-4 whitespace-nowrap">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={user.avatarUrl}
                    alt={user.userName}
                  />
                  <div className="ps-3">
                    <div className="text-base font-semibold">
                      {user.userName}
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  {formatDate(user.LikedData)}
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <FaHeart size={22} className="text-red-500 mx-2" />
                    Liked your profile
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center py-4">
                No Likes
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LikePage;
