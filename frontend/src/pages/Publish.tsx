import { useState } from "react";
import Navbar from "../components/Navbar";
import { CreateBlogType } from "@hanuchaudhary/medium-app";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

const Publish = () => {
  const navigate = useNavigate();
  const [createBlog, setCreateBlog] = useState<CreateBlogType>({
    title: "",
    content: "",
  });

  const OnClickHandler = async () => {
    try {
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
      console.error("Error creating blog:", error);
    }
  };

  return (
    <div>
      <Navbar onClick={OnClickHandler} />
      <div className="grid grid-cols-8 w-4/5 m-auto  font-mono p-20">
        <div className="icon border-2 rounded-full h-20 w-20 flex items-center justify-center border-neutral-300 text-neutral-300 select-none mr-5">
          <h1 className="text-8xl leading-none tracking-tighter ">+</h1>
        </div>
        <div className="col-span-6">
          <div className="title pb-4">
            <input
              value={createBlog.title}
              onChange={(e) =>
                setCreateBlog({ ...createBlog, title: e.target.value })
              }
              className="outline-none text-5xl"
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
              className="outline-none text-xl w-full h-96"
              placeholder="Tell Your Story..."
              name="content"
              id="content"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Publish;