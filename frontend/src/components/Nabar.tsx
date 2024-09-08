const Nabar = () => {
  return (
    <div>
      <nav className="flex items-center justify-between font-mono bg-white py-3 px-8 border-b">
        <div className="text-2xl font-bold text-gray-800">Medium</div>
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Search"
            className="w-full py-2 px-4 bg-gray-100 rounded-full focus:outline-none"
          />
        </div>
        <div className="flex items-center space-x-4">
          <button className="py-2 px-4 bg-gray-100 rounded-full hover:bg-gray-200">
            Write
          </button>

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

export default Nabar;
