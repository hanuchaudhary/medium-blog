import { CircleX } from "lucide-react";

interface UserBlogType {
  id: string;
  title: string;
  content: string;
  onClick : () => void  
}

const UserBlog = ({ id, title, content  , onClick}: UserBlogType) => {
  return (
    <div>
      <div
        id={id}
        className="mb-6 p-4 bg-neutral-700 rounded-lg shadow cursor-pointer select-none relative"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-neutral-200 mb-2">
            {title}
          </h3>
          <div onClick={onClick}>
            <CircleX />
          </div>
        </div>
        <p className="text-neutral-400 mb-4">
          {content.length < 200 ? content : content.substring(0, 150) + "..."}
        </p>
        <p className="text-green-400 font-semibold">Likes: 10</p>
      </div>
    </div>
  );
};

export default UserBlog;
