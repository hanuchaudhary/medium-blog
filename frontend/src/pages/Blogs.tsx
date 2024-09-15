import BlogComponents from "../components/BlogComponents";
import Skeleton from "../components/Skeleton";
import Navbar from "../components/Navbar";
import { useFetchBlogs } from "../Hooks/Bulk";

export const Blogs = () => {
  const { data, loading } = useFetchBlogs();

  if (loading) {
    return (
      <div className="w-full my-10">
        <Navbar />
        <div className="md:px-52 px-4 w-full my-10 flex flex-col gap-20">
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      </div>
    );
  }
  return (
    <div className="w-full overflow-hidden">
      <Navbar />
      <div className="px-4 md:px-48">
        {data.map((item, idx) => (
          <BlogComponents
            id={item.id}
            to={`/blog/${item.id}`}
            key={idx}
            title={item.title}
            content={item.content}
            name={item.author.name}
            published="11 Sept,2077"
          />
        ))}
      </div>
    </div>
  );
};
