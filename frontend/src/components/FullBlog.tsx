import { CircleX } from "lucide-react";
import { Link } from "react-router-dom";

interface fullBlogProps {
  id?: string;
  title: string;
  content: string;
  name: string;
  published?: string;
  author?: {
    name: string;
  };
}

const FullBlog = ({ title, content, name }: fullBlogProps) => {
  const logoName = name?.split(" ") || [];

  return (
    <div>
      <div className="w-full">
        <div className="flex justify-between gap-2 font-mono">
          <div className="flex items-center">
            <div className="w-14 h-14 text-2xl capitalize select-none cursor-pointer flex items-center justify-center bg-green-500 font-semibold hover:bg-green-600 hover:scale-105 mr-3 shadow-sm text-gray-100 transition-transform rounded-full">
              {logoName.length > 1
                ? `${logoName[0][0]}${logoName[1][0]}`
                : logoName[0]
                ? logoName[0][0]
                : ""}
            </div>
            <div className="">
              <h1 className="font-semibold text-xl capitalize">{name}</h1>
              <div className="flex gap-2">
                <h1 className="font-semibold text-neutral-500">
                  {Math.ceil(content.length / 100) + " Minutes Read"}
                </h1>
                <p className="published"></p>
              </div>
            </div>
          </div>
          <Link to={"/blogs"} className="text-neutral-500">
            <CircleX className="md:h-10 md:w-10 h-7 w-7"  />
          </Link>
        </div>
        <div className="content font-mono">
          <h1 className="font-semibold md:text-5xl text-3xl my-7 capitalize">
            {title}
          </h1>
          <p className="md:text-xl text-lg capitalize">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default FullBlog;
