import { Link, useNavigate } from "react-router-dom";
import Skeleton from "../components/Skeleton";
import Navbar from "../components/Navbar";
import { useDelete, useProfile } from "../Hooks/Bulk";
import { CircleX } from "lucide-react";
import UserBlog from "../components/UserBlog";
import Button from "../components/Button";

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
      <div className="bg-neutral-900 ">
        <Navbar />
        <div className="lg:px-52 flex flex-col gap-5 md:px-24 px-4 my-10">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="p-3 md:p-20 dark:bg-neutral-900 dark:text-white bg-neutral-100 text-black relative">
        <div className="flex items-end w-full justify-end pb-4">
          <Link to={"/blogs"}>
            <CircleX className="text-black dark:text-neutral-300 font-semibold" />
          </Link>
        </div>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-semibold dark:text-green-500 text-green-950">
              {data?.name}
            </h1>
            <p className="text-green-800 dark:text-green-600">{data?.email}</p>
          </div>
          <div>
            <Button text="Logout" onClick={handleLogout} />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-6 dark:text-green-500 text-green-950">
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
    </div>
  );
};

export default Profile;
