import BlogComponents from "../components/BlogComponents";
import Nabar from "../components/Navbar";
import { useFetchBlogs } from "../Hooks/Bulk";

export const Blogs = () => {
  const { data, loading } = useFetchBlogs();

  if (loading) {
    return (
      <div>
        <Nabar />
        loading....
      </div>
    );
  }
  return (
    <div>
      <Nabar />
      <div className="mx-52">
        {data.map((item, idx) => (
          <BlogComponents
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
