import { CircleX } from "lucide-react";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify"; // Import after installing

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

const FullBlog = ({ title, content, name, publishedAt }: fullBlogProps) => {
  const logoName = name?.split(" ") || [];

  return (
    <div className="">
      <div className="w-full ">
        <div className="flex justify-between gap-2 dark:bg-neutral-700 text-white font-mono md:bg-none bg-neutral-100 p-4 rounded-md">
          <div className="flex items-center ">
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
                <h1 className="font-semibold md:text-md text-xs dark:text-neutral-400 text-neutral-500">
                  {Math.ceil(content.length / 800) + " Minutes Read"}
                </h1>
                <div className="font-semibold md:text-md text-xs">|</div>
                <p className="published font-semibold md:text-md text-xs text-neutral-500 dark:text-neutral-400">
                  {publishedAt}
                </p>
              </div>
            </div>
          </div>
          <Link
            to={"/blogs"}
            className="text-neutral-500 flex items-center justify-center dark:text-neutral-400"
          >
            <CircleX className="lg:h-10 lg:w-10 md:w-8 md:h-8 h-5 w-5 hover:text-neutral-300 transition-colors" />
          </Link>
        </div>
        <div className="content font-mono">
          <h1 className="font-semibold dark:text-white lg:text-5xl md:text-3xl text-2xl  my-7 capitalize">
            {title}
          </h1>
          <p
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(content),
            }}
            className="md:text-xl text-md capitalize dark:text-neutral-200"
          ></p>
        </div>
      </div>
    </div>
  );
};

export default FullBlog;
