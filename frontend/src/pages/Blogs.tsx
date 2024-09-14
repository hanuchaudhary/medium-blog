import BlogComponents from "../components/BlogComponents";
import BlogsLoader from "../components/BlogsLoader";
import Nabar from "../components/Navbar";
import { useFetchBlogs } from "../Hooks/Bulk";

export const Blogs = () => {
  const { data, loading } = useFetchBlogs();

  if (loading) {
    return (
      <div className="w-full my-10">
        <Nabar />
        <div className="mx-52 my-10">
          <BlogsLoader />
        </div>
      </div>
    );
  }
  return (
    <div>
      <Nabar />
      <div className="mx-52">
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
