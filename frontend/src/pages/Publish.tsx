import { useState } from "react";
import Navbar from "../components/Navbar";
import Spinner from "../components/Spinner";
import { CreateBlogType } from "@hanuchaudhary/medium-app";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";

const Publish = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [createBlog, setCreateBlog] = useState<CreateBlogType>({
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
            Authorization : localStorage.getItem("token")
          },
        }
      );
      navigate("/blog/" + response.data.id);
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
          <div className="flex items-center h-screen justify-center bg-transparent">
            <Spinner />
          </div>
        ) : (
          <div className="grid m-auto grid-cols-8 md:m-auto font-mono p-4 md:p-20">
            <div className="icon select-none">
              <PlusCircle className="md:w-16 md:h-16 lg:w-24 lg:h-24 h-8 w-8 text-neutral-300" />
            </div>
            <div className="col-span-6">
              {error && (
                <div className="text-red-500 mb-4">{error}</div>
              )}
              <div className="title pb-4">
                <textarea
                  value={createBlog.title}
                  onChange={(e) =>
                    setCreateBlog({ ...createBlog, title: e.target.value })
                  }
                  className="outline-none text-2xl md:text-5xl w-full"
                  placeholder="Title"
                />
              </div>
              <div className="content">
                <textarea
                  value={createBlog.content}
                  onChange={(e) =>
                    setCreateBlog({ ...createBlog, content: e.target.value })
                  }
                  className="outline-none text-sm md:text-xl w-full h-96"
                  placeholder="Tell Your Story..."
                  name="content"
                  id="content"
                ></textarea>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Publish;
