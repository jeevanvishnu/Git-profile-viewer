import axios from "axios";
import React from "react";
import { MdLogout } from "react-icons/md";
import { useAuthContext } from "../context/AuthContex";
import toast from "react-hot-toast";
const Logout = () => {
  const { authUser, setAuthUser } = useAuthContext();
  const handleLogout = async () => {
    try {
      const res = await axios.get("/api/v1/auth/logout", {
        withCredentials: true,
      });
      const data = res.data;
      console.log(data);
      setAuthUser(null);
      toast.success("Logout sucessfully")
    } catch (err) {
      toast.error(err.message || "Some error logout");
    }
  };
  return (
    <div>
      <img
        src={authUser?.avatarUrl}
        alt="icon"
        className="w-10 h-10 rounded-full border border-gray-800"
      />

      <div
        className="cursor-pointer flex items-center p-2 rounded-lg bg-glass mt-auto border border-gray-800"
        onClick={handleLogout}
      >
        <MdLogout size={22} />
      </div>
    </div>
  );
};

export default Logout;
