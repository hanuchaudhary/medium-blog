import { useState } from "react";
import Navbar from "../components/Navbar";
import Spinner from "../components/Spinner";
import { CreateBlogType } from "@hanuchaudhary/medium-app";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

const Publish = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [createBlog, setCreateBlog] = useState<CreateBlogType>({
    title: "",
    content: "",
  });

  const OnClickHandler = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog/create`,
        createBlog,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      navigate("/blog/" + response.data.id);
    } catch (error) {
      setLoading(false);
      console.error("Error creating blog:", error);
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
          <div className="grid m-auto grid-cols-8  md:m-auto font-mono p-4 md:p-20">
            <div className="icon border-2 rounded-full h-5 w-5 md:h-20 md:w-20 flex items-center justify-center border-neutral-300 text-neutral-300 select-none mr-5">
              <h1 className="md:text-8xl text-xl leading-none tracking-tighter ">
                +
              </h1>
            </div>
            <div className="col-span-6">
              <div className="title pb-4">
                <input
                  value={createBlog.title}
                  onChange={(e) =>
                    setCreateBlog({ ...createBlog, title: e.target.value })
                  }
                  className="outline-none text-2xl md:text-5xl"
                  type="text"
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
