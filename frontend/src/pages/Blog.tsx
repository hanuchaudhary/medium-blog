import FullBlog from "../components/FullBlog";
import { useSearchBlog } from "../Hooks/Bulk";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import FullBlogLoader from "../components/FullBlogLoader";

const Blog = () => {
  const { id } = useParams();
  const { data, loading } = useSearchBlog({
    id: id || "",
  });

  if(loading){
    <Navbar/>
    return <div className="md:px-52 px-4 my-10">
      <FullBlogLoader/>
    </div>
  }

  return (
    <div>
      <Navbar />
      <div className="md:px-52 px-4 my-10">
        <FullBlog
          name={data?.author.name || "Anoymonous"}
          title={data?.title || "Title"}
          content={data?.content || "Content"}
        />
      </div>
    </div>
  );
};

export default Blog;
