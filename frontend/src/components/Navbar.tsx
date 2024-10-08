"use client";

import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CircleX, MoonIcon, Search, SunIcon } from "lucide-react";
import { useProfile } from "../Hooks/Bulk";
import SearchBlogComponent from "./SearchBlogComponent";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useTheme } from "../provider/ThemeProvider";

function useDebounce(inputValue: string, ms: number) {
  const [value, setValue] = useState(inputValue);

  useEffect(() => {
    const tId = setTimeout(() => {
      setValue(inputValue);
    }, ms);

    return () => clearTimeout(tId);
  }, [inputValue, ms]);

  return value;
}

interface BlogInterface {
  title: string;
  content: string;
  id: string;
  author: {
    name: string;
  };
}

interface NavbarProps {
  onPublish?: () => void;
}

const Navbar = ({ onPublish }: NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchBackground, setSearchBackground] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const { data } = useProfile();
  const [blog, setBlog] = useState<BlogInterface[]>([]);
  const logoName = data?.name.split(" ") || [];
  const [searchQuery, setSearchQuery] = useState("");
  const debounceValue = useDebounce(searchQuery, 200);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const fetchBlogs = async () => {
      if (debounceValue.trim() === "") {
        setBlog([]);
        return;
      }

      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/v1/blog/bulk?filter=${debounceValue}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setBlog(response.data.blogs);
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      }
    };

    fetchBlogs();
  }, [debounceValue]);

  const handleMenu = () => setMenu((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className="relative font-mono">
      {searchBackground && searchQuery.trim() !== "" && (
        <div className="absolute inset-x-0 top-full bg-black bg-opacity-50 rounded-b-xl">
          <div className="flex flex-col gap-1 my-4 mx-4 md:mx-10 rounded-lg shadow-xl">
            {blog.length > 0 ? (
              blog.map((e) => (
                <SearchBlogComponent
                  key={e.id}
                  to={`/blog/${e.id}`}
                  title={e.title}
                  name={e.author.name}
                />
              ))
            ) : (
              <h1 className="w-full font-semibold text-center">
                No blog Find..
              </h1>
            )}
          </div>
        </div>
      )}

      <nav className="fixed top-0 flex items-center justify-between w-full backdrop-blur-lg bg-opacity-10 py-4 px-6 md:px-10 bg-white dark:bg-opacity-10 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-900 rounded-b-xl">
        <div className="absolute top-full right-6 md:right-10 mt-2 z-10">
          {menu && (
            <div className="bg-white dark:bg-neutral-900 rounded-lg flex gap-2 flex-col shadow-lg p-2">
              <Link
                to={"/me"}
                className="w-full text-left px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:bg-neutral-800 bg-neutral-200 dark:hover:bg-neutral-800 rounded-md transition-colors duration-200"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:bg-neutral-800 bg-neutral-200 dark:hover:bg-neutral-700 rounded-md transition-colors duration-200"
              >
                Logout
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:bg-neutral-800 bg-neutral-200 dark:hover:bg-neutral-700 rounded-md transition-colors duration-200">
                Deactivate
              </button>
            </div>
          )}
        </div>

        <Link
          to="/blogs"
          className="text-2xl font-bold text-neutral-800 dark:text-white transition-colors duration-200"
        >
          <span className="hidden md:inline">Medium.</span>
          <span className="inline md:hidden">M.</span>
        </Link>

        {path != "/publish" && (
          <div className="hidden md:block relative w-1/3" ref={searchRef}>
            <input
              type="text"
              onClick={() => setSearchBackground(true)}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="w-full py-2 px-4 bg-neutral-200 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 transition-all duration-200"
            />
          </div>
        )}

        <div className="flex items-center space-x-4">
          <div className="relative flex items-center md:hidden">
            <input
              type="text"
              onClick={() => setSearchBackground(true)}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className={`transition-all duration-300 ${
                search ? "w-40 opacity-100" : "w-0 opacity-0"
              } py-2 px-4 bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400`}
            />
            <button
              onClick={() => setSearch((prev) => !prev)}
              className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors duration-200"
            >
              {search ? (
                <CircleX className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
              ) : (
                <Search className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
              )}
            </button>
          </div>

          {path === "/publish" ? (
            <div className="flex items-center space-x-2 md:space-x-4">
              <Link to="/blogs">
                <button className="py-1 px-3 md:py-2 md:px-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full transition-colors duration-200">
                  Discard
                </button>
              </Link>
              <button
                onClick={onPublish}
                className="py-1 px-3 md:py-2 md:px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full transition-colors duration-200"
              >
                Publish
              </button>
            </div>
          ) : (
            <Link to="/publish">
              <button
                className={`py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full transition-colors duration-200 ${
                  search ? "hidden md:block" : "block"
                }`}
              >
                Write
              </button>
            </Link>
          )}

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors duration-200"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <MoonIcon className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
            ) : (
              <SunIcon className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
            )}
          </button>

          <button
            onClick={handleMenu}
            className={`w-10 h-10 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full transition-colors duration-200 ${
              search ? "hidden md:flex" : "flex"
            }`}
          >
            {logoName.length > 1
              ? `${logoName[0][0]}${logoName[1][0]}`
              : logoName[0]
              ? logoName[0][0]
              : ""}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
