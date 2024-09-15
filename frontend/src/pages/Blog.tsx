import FullBlog from "../components/FullBlog";
import { useSearchBlog } from "../Hooks/Bulk";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import Skeleton from "../components/Skeleton";

const Blog = () => {

  const { id } = useParams();
  const { data, loading } = useSearchBlog({
    id: id || "",
  });

  if(loading){
    <Navbar/>
    return <div className="lg:px-52 md:px-24 px-4 my-10">
      <Skeleton/>
    </div>
  }

  return (
    <div>
      <Navbar />
      <div className="lg:px-52 md:px-24 px-4 my-10">
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
