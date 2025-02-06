import { useEffect, useState } from "react";
import { API_URL, checkIfLoggedIn } from "../auth.js";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import toast from "react-hot-toast";
import { AlignLeft, Heading, MessageCircle } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [formError, setFormError] = useState("");
  const [user, setUser] = useState(null);
  const [fullContent, setFullContent] = useState({});

  const containsSensitiveContent = async () => {
    const genAI = new GoogleGenerativeAI(
      "AIzaSyBTdHQfR3XdHSUPvCIZiLxZwVfs5J0mifo"
    );
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const response = await model.generateContent(
      `There's any sensitive content in this text: "${content} || ${title}"? Answer with Yes or No. Check every single word and all languages and types of writing methods. `
    );
    if (response) {
      return response.response.text().includes("Yes");
    }

    return false;
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_URL}/posts`);
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const checkUser = async () => {
      try {
        const loggedInUser = await checkIfLoggedIn();
        if (loggedInUser.ok) setUser(loggedInUser.user);
      } catch (err) {
        setError("Failed to check user status: " + err.message);
      }
    };

    checkUser();
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      setFormError("Please fill in all fields.");
      return;
    }

    setFormError("");
    if (!user) {
      toast.error("You must be logged in to create a post.");
      return;
    }
    const isContentSensitive = await containsSensitiveContent();
    if (isContentSensitive) {
      toast.error(
        "A sua publicação contém conteúdo sensivel, por favor, verifique o conteúdo e tente novamente."
      );
      return;
    }

    try {
      const response = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          author: user.username,
          authorId: user._id,
        }),
      });

      if (response.ok) {
        const newPost = await response.json();
        setPosts((prevPosts) => [newPost, ...prevPosts]);
        toast.success("Post created successfully!");
        setTitle("");
        setContent("");
      } else {
        const errorData = await response.json();
        setFormError(errorData.message || "Error creating the post.");
      }
    } catch (err) {
      toast.error("Error creating the post: " + err.message);
    }
  };

  const handleDelete = async (postId, authorId) => {
    if (user.rolePosition !== 0) {
      if (!user || user._id !== authorId) {
        toast.error("You can only delete your own posts.");

        return;
      }
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}/posts/remove/${postId}`, {
        method: "POST",
      });

      if (response.ok) {
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post.postId !== postId)
        );
        toast.success("Post deleted successfully!");
      } else {
        const errorData = await response.json();
        toast.error("Failed to delete the post: " + errorData.message);
      }
    } catch (err) {
      toast.error("Error deleting the post: " + err.message);
    }
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const toggleContent = (postId) => {
    setFullContent((prevContent) => ({
      ...prevContent,
      [postId]: !prevContent[postId],
    }));
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 text-red-500">
        Error: {error}
      </div>
    );

  return (
    <div className="bg-gray-100">
      <div className="max-w-3xl mx-auto p-6 py-12">
        <h1 className="text-5xl font-bold mb-8 text-center text-gray-800">
          Forum
        </h1>

        <div className="bg-white shadow-xl rounded-lg p-8 mb-8 transition duration-300 hover:scale-105">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">
            Criar Post
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Titulo"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              icon={Heading}
            />
            <Input
              type="text"
              placeholder="Descrição"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="h-full"
              icon={AlignLeft}
            />
            {formError && (
              <div className="text-red-500 mb-4 text-center">{formError}</div>
            )}
            <Button
              label="Enviar Post"
              type="submit"
              className="w-full"
              icon={<MessageCircle />}
            />
          </form>
        </div>

        <ul className="space-y-6">
          {posts.map((post) => (
            <li
              key={post.postId}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300 hover:scale-105">
              <div className="flex flex-col">
                <div className="flex flex-col sm:flex-row justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2 hover:underline break-words">
                      {post.title}
                    </h3>
                  </div>
                  <div className="mt-4 sm:mt-0 text-right sm:text-left w-fit">
                    <p className="text-gray-500 text-sm">
                      Author: @{post.author}
                    </p>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-gray-700 break-words ">
                    {post.content.length > 100 && !fullContent[post.postId]
                      ? `${post.content.substring(0, 100)}...`
                      : post.content}
                  </p>
                  {post.content.length > 100 && (
                    <button
                      onClick={() => toggleContent(post.postId)}
                      className="text-blue-500 text-sm mt-1 hover:underline">
                      {fullContent[post.postId] ? "Show Less" : "Show More"}
                    </button>
                  )}
                  <p className="text-gray-500 text-xs mt-2">
                    {formatDate(post.date)}
                  </p>
                </div>
                <div className="mt-4 flex justify-end">
                  {user &&
                    (post.authorId === user._id || user.rolePosition === 0) && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(post.postId, user._id);
                        }}
                        className="text-red-500 text-sm hover:underline">
                        Delete
                      </button>
                    )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Forum;
