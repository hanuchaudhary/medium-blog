import { Link, useLocation } from "react-router-dom";

const Navbar = ({onClick} : any) => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div>
      <nav className="flex items-center justify-between font-mono bg-white py-3 px-8 border-b">
        <Link to={"/blogs"} className="text-2xl font-bold text-gray-800">
          Medium
        </Link>
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Search"
            className="w-full py-2 px-4 bg-gray-100 rounded-full focus:outline-none"
          />
        </div>
        <div className="flex items-center space-x-4">
          {path === "/publish" ? (
            <div>
              <button onClick={onClick} className="py-2 px-4 bg-green-500 rounded-full hover:bg-green-600">
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

          <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
            🔔
          </button>

          <div className="w-10 h-10 flex items-center justify-center bg-gray-500 text-white rounded-full">
            A
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
