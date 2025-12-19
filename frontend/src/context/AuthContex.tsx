
import axios from "axios";
import {
  createContext,
  useEffect,
  useState,
  useContext,
} from "react";
import toast from "react-hot-toast";

export const AuthContext = createContext<any>(null);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/v1/auth/check");
        setAuthUser(res.data.user);
      } catch (err: any) {
        toast.error(err?.response?.data?.message || "Auth check failed");
      } finally {
        setLoading(false);
      }
    };

    checkUserLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
