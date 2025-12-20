import React, { useCallback, useEffect, useState } from "react";
import Search from "../components/Search";
import ProfileInfo from "../components/ProfileInfo";
import Spinner from "../components/Spinner";
import axios from "axios";
import toast from "react-hot-toast";
import Repos from "../components/Repos";
import SortRepo from "../components/SortRepo";

type Repo = {
  id: number;
  name: string;
  created_at: string;
  stargazers_count: number;
  forks_count: number;
  [key: string]: any;
};

const HomePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortType, setSortType] = useState("recent");

  const getUserandProfile = useCallback(
    async (username: string = "jeevanVishnu") => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/v1/user/profile/${username}`);
        const { repoRes, userProfile } = res.data;
        repoRes.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setUserProfile(userProfile);
        setRepos(repoRes);
        return { userProfile, repos };
      } catch (err: any) {
        toast.error(err.message || "Internal server error");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const onSearch = async (
    e: React.FormEvent<HTMLFormElement>,
    username: string
  ) => {
    e.preventDefault();
    setLoading(true);
    setUserProfile(null);
    setRepos([]);

    const { userProfile, repoRes } = await getUserandProfile(username);

    setUserProfile(userProfile);
    setRepos([...repoRes]);
    setLoading(false);
    setSortType("resent");
  };

  const onSort = (sortType) => {
    if (sortType === "recent") {
      repos.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    } else if (sortType === "stars") {
      repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
    } else if (sortType === "forks") {
      repos.sort((a, b) => b.forks_count - a.forks_count);
    }

    setSortType(sortType);
    setRepos([...repos]);
  };

  useEffect(() => {
    getUserandProfile();
  }, [getUserandProfile]);
  return (
    <div className="m-4">
      <Search onSearch={onSearch} />
      {repos.length > 0 && <SortRepo onSort={onSort} sortType={sortType} />}
      <div className="flex gap-4 flex-col lg:flex-row justify-center items-start">
        {userProfile && !loading && <ProfileInfo userProfile={userProfile} />}

        {!loading && <Repos repos={repos} />}
        {loading && <Spinner />}
      </div>
    </div>
  );
};

export default HomePage;
