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
        setPosts(await response.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const checkUser = async () => {
      const loggedInUser = await checkIfLoggedIn();
      if (loggedInUser.ok) setUser(loggedInUser.user);
    };

    checkUser();
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      setFormError("Both title and content are required.");
      return;
    }

    setFormError("");
    if (!user) return;

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
        setPosts((prevPosts) => [...prevPosts, newPost]);
        toast.success("Post created successfully!");
        setTitle("");
        setContent("");
      } else {
        const errorData = await response.json();
        setFormError(errorData.message);
      }
    } catch (error) {
      toast.error("Error creating post.");
    }
  };

  const handleDelete = async (postId, authorId) => {
    if (!user || user._id !== authorId) {
      toast.error("You can only delete your own posts.");
      return;
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
          prevPosts.filter((post) => post._id !== postId)
        );
        toast.success("Post deleted successfully!");
      } else {
        const errorData = await response.json();
        toast.error("Failed to delete post: " + errorData.message);
      }
    } catch (error) {
      toast.error("Error deleting post.");
    }
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Error: {error}
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6 relative">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Forum
      </h1>

      <div className="bg-white shadow-xl rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Create a New Post</h2>
        {formError && <div className="text-red-500 mb-4">{formError}</div>}

        <form onSubmit={handleSubmit} className="space-y-3">
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
          <Button label="Create Post" type="submit" />
        </form>
      </div>

      <ul className="space-y-6">
        {posts.map((post) => (
          <li
            key={post._id}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer">
            <div className="flex flex-col sm:flex-row justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-2">
                  {post.content.slice(0, 70)}
                  {post.content.length > 70 && "..."}
                </p>
                <p className="text-gray-500 text-xs">{formatDate(post.date)}</p>
              </div>
              <div className="mt-4 sm:mt-0 text-right sm:text-left">
                <p className="text-gray-500 text-sm">Author: @{post.author}</p>
                {user && post.authorId === user._id && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(post._id, post.authorId);
                    }}
                    className="text-red-500 text-sm">
                    Delete
                  </button>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Forum;
