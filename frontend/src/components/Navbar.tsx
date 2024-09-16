import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import { Search } from "lucide-react";
import { useProfile } from "../Hooks/Bulk";
import SearchBlogComponent from "./SearchBlogComponent";
import axios from "axios";
import { BACKEND_URL } from "../config";

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

const Navbar = ({ onClick }: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const [menu, setMenu] = useState(false);
  const { data } = useProfile();
  const logoName = data?.name?.split(" ") || [];
  const [blog, setBlog] = useState([]); // Holds blog search results
  const [searchQuery, setSearchQuery] = useState(""); // Input value
  const debounceValue = useDebounce(searchQuery, 200);
  const [searchBackground, setSearchBackground] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null); // For detecting outside clicks

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await axios.get(
        `${BACKEND_URL}/api/v1/blog/bulk?filter=${debounceValue}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data.blogs);
      setBlog(response.data.blogs);
    };
    if (debounceValue) {
      fetchBlogs();
    }
  }, [debounceValue]);

  const handleMenu = () => {
    setMenu((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchBackground(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      {searchBackground && (
        <div className="background w-full h-full absolute bg-neutral-500 bg-opacity-45">
          <div className="bg-neutral-50 mt-20 mx-10 rounded-md">
            {blog.map((e) => (
              <SearchBlogComponent
                key={e.id}
                to={`/blog/${e.id}`}
                title={e.title}
                name={e.name}
              />
            ))}
          </div>
        </div>
      )}

      <nav className="relative flex items-center w-full justify-between font-mono bg-white py-3 px-4 md:px-8 border-b">
        {menu && (
          <div
            className="absolute top-14 transition-transform z-10 right-10 md:top-14 md:right-14"
            onClick={handleMenu}
          >
            <DropdownMenu handleLogout={handleLogout} />
          </div>
        )}
        <div>
          <Link
            to={"/blogs"}
            className="text-2xl md:block hidden font-bold text-gray-800"
          >
            Medium
          </Link>
          <Link
            to={"/blogs"}
            className="text-2xl block md:hidden font-bold text-gray-800"
          >
            M.
          </Link>
        </div>

        {/* Search Bar */}
        <div className="search relative w-1/3 md:block hidden" ref={searchRef}>
          <input
            type="text"
            onClick={() => setSearchBackground(true)}
            name="search"
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="w-full py-2 px-4 bg-gray-100 rounded-full focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-5">
          <div className="searchIcon block md:hidden">
            <Search />
          </div>
          {path === "/publish" ? (
            <div className="flex items-center justify-center gap-2 md:gap-4">
              <Link to={"/blogs"}>
                <button className="md:py-2 md:px-4 py-1 px-2 bg-red-500 text-red-900 font-semibold rounded-full hover:bg-red-600">
                  Discard
                </button>
              </Link>
              <button
                onClick={onClick}
                className="md:py-2 md:px-4 py-1 px-2 bg-green-500 text-green-900 font-semibold rounded-full hover:bg-green-600"
              >
                Publish
              </button>
            </div>
          ) : (
            <Link to={"/publish"}>
              <button className="py-2 px-4 text-green-900 font-semibold bg-green-100 rounded-full hover:bg-green-200">
                Write
              </button>
            </Link>
          )}

          <button className="p-2 md:block hidden bg-gray-100 rounded-full hover:bg-gray-200">
            🔔
          </button>

          <div onClick={handleMenu}>
            <div className="w-10 h-10 select-none cursor-pointer flex items-center justify-center bg-green-500 font-semibold hover:bg-green-600 hover:scale-105 transition-transform text-white rounded-full">
              {logoName.length > 1
                ? `${logoName[0][0]}${logoName[1][0]}`
                : logoName[0]
                ? logoName[0][0]
                : ""}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
