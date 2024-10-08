import FullBlog from "../components/FullBlog";
import { useSearchBlog } from "../Hooks/Bulk";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const Blog = () => {
  const { id } = useParams();
  const { data, loading } = useSearchBlog({
    id: id || "",
  });

  const date = new Date(data?.publishedAt || "");
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  if (loading) {
    return (
      <div className="dark:bg-neutral-900 h-screen">
        <Navbar />
        <div className="pt-40 w-[90%] m-auto">
          <BarLoader width={"100%"} color="green" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="lg:px-52 pt-24 md:px-24 px-2 dark:bg-black py-5  ">
        <FullBlog
          publishedAt={formattedDate}
          name={data?.author.name || "Anoymonous"}
          title={data?.title || "Title"}
          content={data?.content || "Content"}
        />
      </div>
    </div>
  );
};

export default Blog;
