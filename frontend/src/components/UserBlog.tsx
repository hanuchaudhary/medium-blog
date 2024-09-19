import DOMPurify from "dompurify";
import { CircleX } from "lucide-react";

interface UserBlogType {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
  onClick: () => void;
}

const UserBlog = ({
  id,
  title,
  content,
  publishedAt,
  onClick,
}: UserBlogType) => {
  const editedContent =
    content.length < 100 ? content : content.substring(0, 200) + "...";

  return (
    <div>
      <div
        id={id}
        className="mb-6 p-6 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors rounded-lg hover:bg-neutral-200  shadow cursor-pointer select-none relative"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold dark:text-neutral-100 text-neutral-800 mb-2">
            {title}
          </h3>
          <div onClick={onClick}>
            <CircleX />
          </div>
        </div>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(editedContent),
          }}
          className="dark:text-neutral-400 text-neutral-700 mb-4"
        ></p>

        <div className="flex items-center gap-5">
          <p className="dark:text-green-500 text-green-700 font-semibold">
            Likes: 10
          </p>
          <p>{publishedAt}</p>
        </div>
      </div>
    </div>
  );
};

export default UserBlog;
