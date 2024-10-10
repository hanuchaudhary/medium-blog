import { CircleX } from "lucide-react";

interface UserBlogType {
  id: string;
  title: string;
  publishedAt: string;
  shortDescription: string;
  onClick: () => void;
}

const UserBlog = ({
  id,
  title,
  publishedAt,
  shortDescription,
  onClick,
}: UserBlogType) => {
  const editedContent =
    shortDescription.length < 100
      ? shortDescription
      : shortDescription.substring(0, 200) + "...";

  return (
    <div>
      <div
        id={id}
        className="mb-6 p-6 dark:bg-neutral-900 dark:hover:bg-neutral-800 duration-500 transition-colors rounded-lg bg-white hover:bg-green-50  shadow cursor-pointer select-none "
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="md:text-xl font-semibold dark:text-neutral-100 text-neutral-800 mb-2">
            {title}
          </h3>
          <div onClick={onClick}>
            <CircleX />
          </div>
        </div>
        <p className="md:text-base text-xs dark:text-neutral-400 text-neutral-700 mb-4">
          {editedContent}
        </p>

        <div className="flex items-center gap-5">
          <p className="dark:text-green-500 text-green-700 font-semibold">
            Likes: {(1+Math.random()*1000).toFixed()}
          </p>
          <p>{publishedAt}</p>
        </div>
      </div>
    </div>
  );
};

export default UserBlog;
