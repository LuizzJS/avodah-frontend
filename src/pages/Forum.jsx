import { useEffect, useState } from "react";
import { API_URL, checkIfLoggedIn } from "../auth.js";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import toast from "react-hot-toast";

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [formError, setFormError] = useState("");
  const [user, setUser] = useState(null);

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

    try {
      const response = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          author: user.username,
          authorId: user.id,
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
    if (!user || user.id !== authorId) {
      toast.error("You can only delete your own posts.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}/posts/remove/${postId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
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
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto p-6 py-12">
        <h1 className="text-5xl font-bold mb-8 text-center text-gray-800 drop-shadow-lg">
          Forum
        </h1>

        <div className="bg-white shadow-xl rounded-lg p-8 mb-8 transition duration-300 hover:scale-105">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">
            Create New Post
          </h2>
          {formError && <div className="text-red-500 mb-4">{formError}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Button
              label="Create Post"
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            />
          </form>
        </div>

        <ul className="space-y-6">
          {posts.map((post) => (
            <li
              key={post.id}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300 hover:scale-105">
              <div className="flex flex-col sm:flex-row justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2 hover:underline">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-2 break-words line-clamp-3">
                    {post.content}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {formatDate(post.date)}
                  </p>
                </div>
                <div className="mt-4 sm:mt-0 text-right sm:text-left w-fit">
                  <p className="text-gray-500 text-sm">
                    Author: @{post.author}
                  </p>
                  {user &&
                    (post.authorId === user.id || user.rolePosition > 1) && (
                      <button
                        onClick={() => handleDelete(post.id, post.authorId)}
                        className="text-red-500 text-sm mt-2 sm:mt-0 hover:underline">
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
