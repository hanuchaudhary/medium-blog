import { Link } from "react-router-dom"

interface BlogCardProps {
  to: string
  title: string
  content: string
  name: string
  shortDescription: string
  published: string
  id: string
}

const BlogComponents = ({
  title,
  content,
  name,
  published,
  shortDescription,
  id,
}: BlogCardProps) => {
  const editedContent =
    shortDescription.length < 100
      ? shortDescription
      : shortDescription.substring(0, 200) + "..."
  const logoName = name?.split(" ") || []

  return (
    <Link to={`/blog/${id}`} className="block ">
      <article className="font-mono hover:bg-green-50 transition-colors rounded-lg md:p-6 p-3 mb-6 border border-neutral-200 dark:hover:bg-neutral-700 bg-neutral-100 dark:bg-neutral-800 dark:border-neutral-900 duration-500">
        <header className="flex items-center space-x-4 mb-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 flex items-center justify-center bg-green-500 hover:bg-green-600 transition-colors text-white rounded-full font-semibold text-lg capitalize">
              {logoName.length > 1
                ? `${logoName[0][0]}${logoName[1][0]}`
                : logoName[0]
                ? logoName[0][0]
                : ""}
            </div>
          </div>
          <h2 className="font-semibold capitalize text-xl text-neutral-900 dark:text-neutral-100">
            {name}
          </h2>
        </header>
        <div className="mb-4">
          <h3 className="font-bold text-md md:text-2xl mb-2 text-neutral-800 dark:text-neutral-200 leading-tight">
            {title}
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 text-xs md:text-base line-clamp-3">
            {editedContent}
          </p>
        </div>
        <footer className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
          <span className="mr-3">⚡ {published}</span>
          <span>•</span>
          <span className="ml-3">{Math.ceil(content.length / 800)} min read</span>
        </footer>
      </article>
    </Link>
  )
}

export default BlogComponents