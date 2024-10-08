import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import MarkdownEditor from "@uiw/react-markdown-editor"
import Navbar from "../components/Navbar"
import Spinner from "../components/Spinner"
import { BACKEND_URL } from "../config"

const Publish = () => {
  const navigate = useNavigate()
  const mdStr = `# Blog Content here`
  const [loading, setLoading] = useState(false)
  const [createBlog, setCreateBlog] = useState({
    title: "",
    content: "",
    shortDescription: "",
  })
  const [error, setError] = useState<string | null>(null)

  const OnClickHandler = async () => {
    console.log(createBlog)
    if (!createBlog.title || !createBlog.content) {
      setError("Title and content cannot be empty.")
      return
    }

    try {
      setLoading(true)
      setError(null)
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog/create`,
        createBlog,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      console.log(response.data.blog.id)
      navigate("/blog/" + response.data.blog.id)
    } catch (error) {
      setError("Error creating blog. Please try again.")
      console.error("Error creating blog:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-14 bg-neutral-100 dark:bg-black">
      <Navbar onPublish={OnClickHandler} />
      <div className="container mx-auto px-1 md:px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center h-[calc(100vh-64px)]">
            <Spinner />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto bg-neutral-300 dark:bg-neutral-950 p-1 md:p-4 rounded-xl">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <div className="space-y-4">
              <textarea
                className="w-full px-4 py-2 text-md md:text-2xl text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Blog Title"
                value={createBlog.title}
                onChange={(e) =>
                  setCreateBlog({ ...createBlog, title: e.target.value })
                }
              />
              <textarea
                value={createBlog.shortDescription}
                onChange={(e) =>
                  setCreateBlog({
                    ...createBlog,
                    shortDescription: e.target.value,
                  })
                }
                className="w-full px-4 py-2 text-md md:text-xl text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                placeholder="Short Description"
                rows={5}
              />
              <div className="w-full text-neutral-900 dark:text-white">
                <MarkdownEditor
                style={{backgroundColor : "#262626" , borderRadius : "1vw"}}
                  value={createBlog.content || mdStr}
                  onChange={(value) =>
                    setCreateBlog({ ...createBlog, content: value })
                  }
                  className="min-h-[60vh] overflow-hidden rounded-lg"
                  previewWidth="50%"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Publish