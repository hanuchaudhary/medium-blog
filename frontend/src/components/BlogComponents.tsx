import { Link } from "react-router-dom";

interface blogCardProps {
  to: string;
  title: string;
  content: string;
  name: string;
  published: string;
  id: string;
}

const BlogComponents = ({
  title,
  content,
  name,
  published,
  id,
}: blogCardProps) => {
  const logoName = name?.split(" ") || [];

  return (
    <Link to={`/blog/${id}`}>
      <div className="font-mono w-full py-8 border-b select-none">
        <div className="flex items-center gap-2">
          <div className="avatar">
            <div className="w-10 h-10 select-none cursor-pointer flex items-center justify-center bg-green-500 capitalize font-semibold hover:bg-green-600 hover:scale-105 transition-transform text-white rounded-full">
              {logoName.length > 1
                ? `${logoName[0][0]}${logoName[1][0]}`
                : logoName[0]
                ? logoName[0][0]
                : ""}
            </div>
          </div>
          <h1 className="font-semibold capitalize text-xl md:text-2xl">{name}</h1>
        </div>
        <div>
          <div className="my-5 cursor-pointer">
            <h1 className="font-semibold capitalize md:text-3xl text-2xl mb-2">{title}</h1>
            <p className="text-zinc-700 w-full capitalize">
              {content.length < 100
                ? content
                : content.substring(0, 200) + "..."}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="date flex">
            <div className="icon">⚡</div>
            <h1 className="font-semibold">{published} | </h1>
          </div>
          <p>{Math.ceil(content.length / 100) + " Min Read"}</p>
        </div>
      </div>
    </Link>
  );
};

export default BlogComponents;
