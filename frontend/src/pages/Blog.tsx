import FullBlog from "../components/FullBlog";
import { useBlog } from "../Hooks/Bulk";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";

const Blog = () => {
  const { id } = useParams();
  const { data, loading } = useBlog({
    id: id || "",
  });

  if(loading){
    <Navbar/>
    return <div>loading...</div>
  }

  return (
    <div>
      <Navbar />
      <div className="mx-52 my-10">
        <FullBlog
          name={data?.author.name || "User"}
          title="There are FIVE levels of UI skill."
          content="xyx"
        />
      </div>
    </div>
  );
};

export default Blog;
