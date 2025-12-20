import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Repos from "../components/Repos";
import Spinner from "../components/Spinner";

const ExplorePage = () => {
  const [language, setLanguage] = useState("");
  const [loading, setLoading] = useState(true);
  const [repos, setRepos] = useState([]);

  const exploreRepo = useCallback(async (language: string) => {
    setLoading(true);
    setRepos([]);
    try {
      const res = await axios.get(`/api/v1/explore/repos/${language}`);
      const { repos } = res.data;
      setRepos(repos);
      setLanguage(language);
      console.log("repos", repos);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    exploreRepo("javascript");
  }, [exploreRepo]);

  return (
    <div className="px-4">
      <div className="bg-glass max-w-2xl mx-auto rounded-md p-4">
        <h1 className="text-xl font-bold text-center">
          Explore Popular Repositories
        </h1>
        <div className="flex flex-wrap gap-2 my-2 justify-center">
          <img
            src="/javascript.svg"
            alt="JavaScript"
            className="h-11 sm:h-20 cursor-pointer"
            onClick={() => exploreRepo("javascript")}
          />
          <img
            src="/typescript.svg"
            alt="TypeScript logo"
            className="h-11 sm:h-20 cursor-pointer"
            onClick={() => exploreRepo("typescript")}
          />
          <img
            src="/c++.svg"
            alt="C++ logo"
            className="h-11 sm:h-20 cursor-pointer"
            onClick={() => exploreRepo("c++")}
          />
          <img
            src="/python.svg"
            alt="Python logo"
            className="h-11 sm:h-20 cursor-pointer"
            onClick={() => exploreRepo("python")}
          />
          <img
            src="/java.svg"
            alt="Java logo"
            className="h-11 sm:h-20 cursor-pointer"
            onClick={() => exploreRepo("java")}
          />
        </div>
        {repos.length > 0 && (
          <h2 className="text-lg font-semibold text-center my-4">
            <span className="bg-blue-100 text-blue-800 font-medium me-2 px-2.5 py-0.5 rounded-full ">
              {language.toUpperCase()}{" "}
            </span>
            Repositories
          </h2>
        )}
        {!loading && repos.length > 0 && (
          <Repos repos={repos} alwaysFullWidth />
        )}
        {loading && <Spinner />}
      </div>
    </div>
  );
};

export default ExplorePage;
