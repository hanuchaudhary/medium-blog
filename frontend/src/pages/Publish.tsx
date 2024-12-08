import { useState } from "react";
import axios from "axios";
import MarkdownEditor from "@uiw/react-markdown-editor";
import Navbar from "../components/Navbar";
import Spinner from "../components/Spinner";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

const Publish = () => {
  const navigate = useNavigate();
  const mdStr = `# Blog Content here`;
  const [loading, setLoading] = useState(false);
  const [createBlog, setCreateBlog] = useState({
    title: "",
    content: "",
    shortDescription: "",
  });
  const [aiPrompt, setAiPrompt] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [generatingContent, setGeneratingContent] = useState(false);

  const OnClickHandler = async () => {
    if (!createBlog.title || !createBlog.content) {
      setError("Title and content cannot be empty.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog/create`,
        createBlog,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      navigate("/blog/" + response.data.blog.id);
    } catch (error) {
      setError("Error creating blog. Please try again.");
      console.error("Error creating blog:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateAIContent = async () => {
    if (!aiPrompt) {
      setError("Please enter a prompt for AI content generation.");
      return;
    }

    try {
      setGeneratingContent(true);
      setError(null);
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog/generate-content`,
        { prompt: aiPrompt },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setCreateBlog({ ...createBlog, content: response.data.content });
    } catch (error) {
      setError("Error generating AI content. Please try again.");
      console.error("Error generating AI content:", error);
    } finally {
      setGeneratingContent(false);
    }
  };

  return (
    <div className="min-h-screen pt-14 bg-neutral-100 dark:bg-black">
      <Navbar onPublish={OnClickHandler} />
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center h-[calc(100vh-64px)]">
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left side: Generate Content */}
            <div className="md:w-1/3">
              <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                  AI Content Generator
                </h2>
                <div className="space-y-4">
                  <textarea
                    className="w-full px-4 py-2 text-md text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-700 rounded-lg border border-neutral-300 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                    placeholder="Enter prompt for AI content generation"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    rows={5}
                  />
                  <button
                    onClick={generateAIContent}
                    disabled={generatingContent}
                    className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50 transition duration-200"
                  >
                    {generatingContent ? "Generating..." : "Generate Content"}
                  </button>
                </div>
              </div>
            </div>

            <div className="md:w-2/3">
              <div className="bg-white dark:bg-neutral-800 md:p-6 p-3 rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-neutral-900 dark:text-white">
                  Create Your Blog Post
                </h1>
                {error && (
                  <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                    role="alert"
                  >
                    <span className="block sm:inline">{error}</span>
                  </div>
                )}
                <div className="space-y-6">
                  <section>
                    <h2 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-white">
                      Blog Title
                    </h2>
                    <input
                      type="text"
                      className="w-full px-4 py-2 text-lg text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-700 rounded-lg border border-neutral-300 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter your blog title"
                      value={createBlog.title}
                      onChange={(e) =>
                        setCreateBlog({ ...createBlog, title: e.target.value })
                      }
                    />
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-white">
                      Short Description
                    </h2>
                    <textarea
                      value={createBlog.shortDescription}
                      onChange={(e) =>
                        setCreateBlog({
                          ...createBlog,
                          shortDescription: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 text-md text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-700 rounded-lg border border-neutral-300 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                      placeholder="Enter a short description of your blog"
                      rows={3}
                    />
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-white">
                      Blog Content
                    </h2>
                    <div className="w-full text-neutral-900 dark:text-white">
                      <MarkdownEditor
                        value={createBlog.content || mdStr}
                        onChange={(value) =>
                          setCreateBlog({ ...createBlog, content: value })
                        }
                        className="min-h-[60vh] overflow-hidden rounded-lg border border-neutral-300 dark:border-neutral-600"
                        previewWidth="50%"
                      />
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Publish;

