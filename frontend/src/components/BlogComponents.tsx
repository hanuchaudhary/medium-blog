import { Link } from "react-router-dom";

interface blogCardProps {
  to : string
  title: string;
  content: string;
  name: string;
  published: string;
}

const BlogComponents = ({ title, content, name, published , to}: blogCardProps) => {

  return (
    <div>
        <div className="font-mono py-8 border-b select-none">
          <div className="flex items-center gap-2">
            <div className="avatar h-7 w-7 bg-zinc-600 flex items-center justify-center rounded-full">
              <h1 className="font-semibold capitalize text-white">{name[0]}</h1>
            </div>
            <h1 className="font-semibold capitalize text-xl">{name}</h1>
          </div>
          <Link to={to} className="my-5 cursor-pointer">
            <h1 className="font-semibold capitalize text-2xl">{title}</h1>
            <p className="text-zinc-700 capitalize">{content}</p>
          </Link>
          <div className="flex items-center gap-2">
            <div className="icon">⚡</div>
            <div className="date">
              <h1>{published}</h1>
            </div>
            <p>3 minutes read</p>
          </div>
        </div>
    </div>
  );
};

export default BlogComponents;
