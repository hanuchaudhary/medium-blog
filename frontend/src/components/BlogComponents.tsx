import { Link } from "react-router-dom";

interface blogCardProps {
  to: string;
  title: string;
  content: string;
  name: string;
  published: string;
  id :string
}

const BlogComponents = ({
  title,
  content,
  name,
  published,
  id
}: blogCardProps) => {
  

  return (
    <Link to={`/blog/${id}`}>
      <div className="font-mono py-8   border-b select-none">
        <div className="flex items-center gap-2">
          <div className="avatar h-7 w-7 bg-zinc-600 flex items-center justify-center rounded-full">
            <h1 className="font-semibold capitalize text-white">{name[0]}</h1>
          </div>
          <h1 className="font-semibold capitalize text-xl">{name}</h1>
        </div>
        <div>
          <div className="my-5 cursor-pointer">
            <h1 className="font-semibold capitalize text-2xl">{title}</h1>
            <p className="text-zinc-700 capitalize">
              {content.length > 200
                ? content
                : content.substring(0, 300) + "..."}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="icon">⚡</div>
          <div className="date">
            <h1>{published}</h1>
          </div>
          <p>{Math.ceil(content.length / 60) + " Min Read"}</p>
        </div>
      </div>
    </Link>
  );
};

export default BlogComponents;
