import { Link, useNavigate } from "react-router-dom";
import FullBlogLoader from "../components/FullBlogLoader";
import Navbar from "../components/Navbar";
import { useProfile } from "../Hooks/Bulk";

const Profile = () => {
  const navigate = useNavigate();
  const { data, loading } = useProfile();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div>
          <FullBlogLoader />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-300 w-full h-full">
      <div className="text-5xl p-4 bg-blue-400 rounded-full h-16 w-16 flex items-center justify-center">
        <Link to={"/blogs"}>x</Link>
      </div>
      <div className="max-w-4xl mx-auto my-10 p-6 bg-neutral-800 text-neutral-100 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-green-400">
              {data?.name}
            </h1>
            <p className="text-neutral-400">{data?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
          >
            Logout
          </button>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-green-300">
            My Blogs
          </h2>
          {data?.blog.map((e) => (
            <div className="mb-6 p-4 bg-neutral-700 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-neutral-200 mb-2">
                {e.title}
              </h3>
              <p className="text-neutral-400 mb-4">{e.content}</p>
              <p className="text-green-400 font-semibold">Likes: 10</p>
            </div>
          ))}
          <p className="text-neutral-400">No more blogs to display.</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
