import { CircleX } from "lucide-react";
import { Link } from "react-router-dom";
import MarkdownEditor from "@uiw/react-markdown-editor";

interface FullBlogProps {
  id?: string;
  title: string;
  content: string;
  name: string;
  publishedAt?: string;
  author?: {
    name: string;
  };
}

const FullBlog = ({ title, content, name, publishedAt }: FullBlogProps) => {
  const logoName = name?.split(" ") || [];

  return (
    <div className="bg-white py-2 md:py-8 font-mono dark:bg-neutral-900 min-h-screen rounded-2xl">
      <div className="max-w-5xl mx-auto px-2 md:px-6">
        <div className="flex justify-between items-center bg-neutral-100 dark:bg-neutral-800 p-4 rounded-xl shadow-md mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full transition-all duration-200 shadow-lg">
              <span className="text-lg md:text-xl lg:text-2xl">
                {logoName.length > 1
                  ? `${logoName[0][0]}${logoName[1][0]}`
                  : logoName[0]
                  ? logoName[0][0]
                  : ""}
              </span>
            </div>
            <div>
              <h2 className="font-semibold text-lg md:text-xl text-neutral-800 dark:text-neutral-200 capitalize">
                {name}
              </h2>
              <div className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                <span>{Math.ceil(content.length / 800) + " min read"}</span>
                <span>•</span>
                <span>{publishedAt}</span>
              </div>
            </div>
          </div>
          <Link
            to="/blogs"
            className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors duration-200"
          >
            <CircleX className="w-6 h-6 md:w-8 md:h-8" />
          </Link>
        </div>
        <article className="prose prose-lg dark:prose-invert max-w-none">
          <h1 className="text-md md:text-3xl lg:text-4xl font-bold mb-6 text-neutral-900 dark:text-neutral-100">
            {title}
          </h1>
          <div className="text-neutral-800 dark:text-neutral-200 ">
            <MarkdownEditor.Markdown style={{backgroundColor : "#262626", padding : "20px 10px" , borderRadius : "1vw"}} source={content} />
          </div>
        </article>
      </div>
    </div>
  );
};

export default FullBlog;
