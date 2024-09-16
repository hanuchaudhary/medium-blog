import { CircleX } from "lucide-react";
import { Link } from "react-router-dom";

interface fullBlogProps {
  id?: string;
  title: string;
  content: string;
  name: string;
  publishedAt?: string;
  author?: {
    name: string;
  };
}

const FullBlog = ({ title, content, name ,publishedAt }: fullBlogProps) => {
  const logoName = name?.split(" ") || [];

  return (
    <div>
      <div className="w-full">
        <div className="flex justify-between gap-2 font-mono md:bg-none bg-neutral-100 p-2 rounded-md">
          <div className="flex items-center">
            <div className="lg:w-14 lg:h-14 md:w-10 md:h-10 w-8 h-8 text-md lg:text-2xl capitalize select-none cursor-pointer flex items-center justify-center bg-green-500 font-semibold hover:bg-green-600 hover:scale-105 mr-3 shadow-sm text-gray-100 transition-transform rounded-full">
              {logoName.length > 1
                ? `${logoName[0][0]}${logoName[1][0]}`
                : logoName[0]
                ? logoName[0][0]
                : ""}
            </div>
            <div className="">
              <h1 className="font-semibold md:text-xl capitalize">{name}</h1>
              <div className="flex md:gap-3 gap-1">
                <h1 className="font-semibold md:text-md text-xs text-neutral-500">
                  {Math.ceil(content.length / 100) + " Minutes Read"}
                </h1>
                <div className="font-semibold md:text-md text-xs">|</div>
                <p className="published font-semibold md:text-md text-xs text-neutral-500">{publishedAt}</p>
              </div>
            </div>
          </div>
          <Link to={"/blogs"} className="text-neutral-500">
            <CircleX className="lg:h-10 lg:w-10 md:w-8 md:h-8 h-5 w-5"  />
          </Link>
        </div>
        <div className="content font-mono">
          <h1 className="font-semibold lg:text-5xl md:text-3xl text-2xl  my-7 capitalize">
            {title}
          </h1>
          <p className="md:text-xl text-md capitalize">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default FullBlog;
