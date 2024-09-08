import BlogComponents from "../components/BlogComponents";
import Nabar from "../components/Nabar";
import { useBlogs } from "../Hooks/Bulk";

export const Blogs = () => {
  const { data, loading } = useBlogs();

  if(loading){
    return <div>
        <Nabar/>
        loading....
    </div>
  }
  return (
    <div>
      <Nabar />
      <div className="mx-52">
        {data.map((item, idx) => (
          <BlogComponents
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
