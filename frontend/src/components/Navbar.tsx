import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import { Search } from "lucide-react";

const Navbar = ({ onClick }: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div>
      <nav className="relative flex items-center w-full justify-between font-mono bg-white py-3 px-4 md:px-8 border-b">
        {menu && (
          <div className="absolute top-14 z-10 right-10 md:top-14 md:right-14" onClick={handleMenu}>
            <DropdownMenu handleLogout={handleLogout} />
          </div>
        )}
        <div>
          <Link to={"/blogs"} className="text-2xl font-bold text-gray-800">
            Medium
          </Link>
        </div>
        <div className="search relative w-1/3 md:block hidden">
          <input
            type="text"
            placeholder="Search"
            className="w-full py-2 px-4 bg-gray-100 rounded-full focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-5">
        <div className="searchIcon block md:hidden">
          <Search/>
        </div>
          {path === "/publish" ? (
            <div>
              <button
                onClick={onClick}
                className="py-2 px-4 bg-green-500 rounded-full hover:bg-green-600"
              >
                Publish
              </button>
            </div>
          ) : (
            <Link to={"/publish"}>
              <button className="py-2 px-4 bg-green-100 rounded-full hover:bg-green-200">
                Write
              </button>
            </Link>
          )}

          <button className="p-2 md:block hidden bg-gray-100 rounded-full hover:bg-gray-200">
            🔔
          </button>

          <div
            onClick={handleMenu}
            // to={"/me"}
            className="w-10 h-10 select-none cursor-pointer flex items-center justify-center bg-green-500 hover:bg-green-600 hover:scale-105 transition-transform text-white rounded-full"
          >
            A
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
