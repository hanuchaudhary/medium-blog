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
      <div className="font-mono hover:bg-neutral-100 transition-colors rounded-md p-2 w-full py-5 md:py-8 border-b select-none">
        <div className="flex items-center gap-2">
          <div className="avatar">
            <div className="md:w-10 md:h-10 h-7 w-7 select-none cursor-pointer flex items-center justify-center bg-green-500 text-sm capitalize font-semibold hover:bg-green-600 hover:scale-105 transition-transform text-white rounded-full">
              {logoName.length > 1
                ? `${logoName[0][0]}${logoName[1][0]}`
                : logoName[0]
                ? logoName[0][0]
                : ""}
            </div>
          </div>
          <h1 className="font-semibold capitalize text-lg md:text-2xl">{name}</h1>
        </div>
        <div>
          <div className="my-5 cursor-pointer">
            <h1 className="font-semibold leading-tight capitalize md:text-3xl text-lg mb-2">{title}</h1>
            <p className="text-zinc-700 text-xs md:text-lg w-full capitalize">
              {content.length < 100
                ? content
                : content.substring(0, 200) + "..."}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="date flex">
            <div className="icon">⚡</div>
            <h1 className="font-semibold text-sm">{published} | </h1>
          </div>
          <p className="text-sm">{Math.ceil(content.length / 100) + " Min Read"}</p>
        </div>
      </div>
    </Link>
  );
};

export default BlogComponents;
