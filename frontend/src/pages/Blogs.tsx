import BlogComponents from "../components/BlogComponents";
import Skeleton from "../components/Skeleton";
import Navbar from "../components/Navbar";
import { useFetchBlogs } from "../Hooks/Bulk";

export default function Blogs() {
  const { data, loading } = useFetchBlogs();

  if (loading) {
    return (
      <div className="min-h-screen pt-12 bg-neutral-100 dark:bg-black">
        <Navbar />
        <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
          <div className="space-y-8 md:space-y-12">
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-mono md:pt-32 pt-24 px-2 bg-neutral-100 dark:bg-black text-neutral-900 dark:text-neutral-100">
      <Navbar />
      <main className="container rounded-xl mx-auto bg-neutral-200 dark:bg-neutral-950 px-4 py-8 md:py-12 lg:py-16">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-800 dark:text-green-400 border-b-2 border-green-800 dark:border-green-400 pb-4 mb-8 md:mb-12">
          Blogs
        </h1>
        <div className="md:space-y-6">
          {data.map((item, idx) => {
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
                shortDescription={item.shortDescription}
                content={item.content}
                name={item.author.name}
                published={formattedDate} 
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}