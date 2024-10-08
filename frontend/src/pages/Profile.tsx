import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useDelete, useProfile } from "../Hooks/Bulk";
import UserBlog from "../components/UserBlog";
import { BarLoader } from "react-spinners";
import { ArrowLeft, LogOut } from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();
  const { data, loading } = useProfile();
  const { deleteBlog, loading: deleteLoading, error, isDeleted } = useDelete();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  const handleDelete = async (id: string) => {
    await deleteBlog(id);
    if (!error && isDeleted) {
      console.log(`Blog with ID ${id} deleted successfully!`);
    }
  };

  return (
    <div className="dark:bg-black font-mono min-h-screen dark:text-white bg-neutral-100 text-black ">
      <Navbar />
      <div className="pt-24 md:pt-32 rounded-xl py-4 md:mx-40 bg-neutral-200 dark:bg-neutral-950 px-4">
        <div className="flex justify-between items-center mb-8">
          <div className="dark:bg-neutral-900 w-full rounded-xl p-2 md:p-4 flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-xl md:text-3xl font-semibold dark:text-green-500 text-green-950">
                {data?.name}
              </h1>
              <p className="text-green-800 md:text-base text-xs dark:text-green-600">
                {data?.email}
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <button
                onClick={handleLogout}
                className="bg-green-600 w-full md:w-auto leading-none md:py-2 px-2 border border-green-900 font-semibold py-1 flex items-center justify-center text-white rounded hover:bg-green-700 transition-colors"
              >
                <LogOut className="mr-2" size={18} />
                Logout
              </button>
              <Link
                to="/blogs"
                className="bg-green-600 w-full md:w-auto leading-none md:py-2 px-2 border border-green-900 font-semibold py-1 flex items-center justify-center text-white rounded hover:bg-green-700 transition-colors"
              >
                <ArrowLeft className="mr-2" size={18} />
                Back to Blogs
              </Link>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-6 dark:text-green-500 text-green-950">
            -- My Blogs --
          </h2>
          <div>
            {loading || deleteLoading ? (
              <BarLoader width={"100%"} color="green" />
            ) : (
              data?.blog.map((e) => {
                const date = new Date(e.publishedAt);
                const formattedDate = date.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                });
                return (
                  <UserBlog
                    key={e.id}
                    title={e.title}
                    shortDescription={e.shortDescription}
                    publishedAt={formattedDate}
                    id={e.id}
                    onClick={() => handleDelete(e.id)}
                  />
                );
              })
            )}
          </div>
          <p className="text-neutral-400 pt-5">No more blogs to display.</p>
        </div>
      </div>
    </div>
  );
}
