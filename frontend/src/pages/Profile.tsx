import { Link, useNavigate } from "react-router-dom";
import Skeleton from "../components/Skeleton";
import Navbar from "../components/Navbar";
import { useDelete, useProfile } from "../Hooks/Bulk";
import { CircleX } from "lucide-react";
import UserBlog from "../components/UserBlog";

const Profile = () => {
  const navigate = useNavigate();
  const { data, loading } = useProfile();
  
  const { deleteBlog, loading: deleteLoading, error, isDeleted } = useDelete();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleDelete = async (id: string) => {
    await deleteBlog(id);
    if (!error && isDeleted) {
      console.log(`Blog with ID ${id} deleted successfully!`);
    }
  };

  if (loading || deleteLoading) {
    return (
      <div>
        <Navbar />
        <div>
          <Skeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-neutral-300 text-neutral-100 rounded-lg shadow-lg relative">
      <div className="flex items-end w-full justify-end pb-4">
        <Link to={"/blogs"}>
          <CircleX color="black" />
        </Link>
      </div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-green-950">{data?.name}</h1>
          <p className="text-green-800">{data?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
        >
          Logout
        </button>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-6 text-green-950">
          -- My Blogs --
        </h2>
        {data?.blog.map((e) => (
          <UserBlog
            key={e.id}
            title={e.title}
            content={e.content}
            id={e.id}
            onClick={() => handleDelete(e.id)} 
          />
        ))}
        <p className="text-neutral-400">No more blogs to display.</p>
      </div>
    </div>
  );
};

export default Profile;
