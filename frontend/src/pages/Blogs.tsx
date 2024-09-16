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
      <div className="px-4 md:px-24 lg:px-48">
        <h1 className="py-2 md:py-5 select-none font-semibold text-2xl md:text-4xl text-green-900 border-b-2 border-dashed mb-8 border-green-900">
          Blogs
        </h1>
        {data.map((item, idx) => {
          // @ts-ignore
          const date = new Date(item.publishedAt);
          const formattedDate = date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          });

          return (
            <BlogComponents
              id={item.id}
              to={`/blog/${item.id}`}
              key={idx}
              title={item.title}
              content={item.content}
              name={item.name}
              published={formattedDate} // Pass formatted date here
            />
          );
        })}
      </div>
    </div>
  );
};
