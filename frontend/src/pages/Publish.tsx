import { useState } from "react";
import Navbar from "../components/Navbar";
import Spinner from "../components/Spinner";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

const Publish = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [createBlog, setCreateBlog] = useState({
    title: "",
    content: "",
  });
  const [error, setError] = useState<string | null>(null);

  const OnClickHandler = async () => {
    if (!createBlog.title || !createBlog.content) {
      setError("Title and content cannot be empty.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog/create`,
        createBlog,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data.blog.id);
      navigate("/blog/" + response.data.blog.id);
    } catch (error) {
      setError("Error creating blog. Please try again.");
      console.error("Error creating blog:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Navbar onClick={OnClickHandler} />
      <div>
        {loading ? (
          <div className="flex items-center dark:bg-neutral-900 h-screen justify-center bg-transparent">
            <Spinner />
          </div>
        ) : (
          <div className="dark:bg-neutral-900 py-10 px-4 flex items-center justify-center font-mono ">
            <div>
              {error && (
                <div className="text-red-500 w-screen mb-4">{error}</div>
              )}
              <div className="title mb-4">
                <textarea
                  value={createBlog.title}
                  onChange={(e) =>
                    setCreateBlog({ ...createBlog, title: e.target.value })
                  }
                  className="outline-none md:w-[70vw] dark:bg-neutral-800 rounded-lg p-2 text-white text-lg md:text-2xl w-full"
                  placeholder="Title"
                />
              </div>
              <div className="content md:w-full text-white">
                <ReactQuill
                  theme="snow"
                  value={createBlog.content}
                  onChange={(content) =>
                    setCreateBlog({ ...createBlog, content })
                  }
                  className="dark:bg-neutral-800 text-xl rounded-lg text-white w-full h-96"
                  placeholder="Content here...."
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Publish;
