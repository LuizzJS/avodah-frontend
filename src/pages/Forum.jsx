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
      } catch {
        setError("Failed to check user status.");
      }
    };

    checkUser();
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      setFormError("Preencha todos os campos.");
      return;
    }

    setFormError("");
    if (!user) {
      toast.error("Você precisa estar logado para criar um post.");
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
        setPosts((prevPosts) => [...prevPosts, newPost]);
        toast.success("Post criado com sucesso!");
        setTitle("");
        setContent("");
      } else {
        const errorData = await response.json();
        setFormError(errorData.message || "Erro ao criar o post.");
      }
    } catch {
      toast.error("Erro ao criar o post.");
    }
  };

  const handleDelete = async (postId, authorId) => {
    if (!user || user.id !== authorId) {
      toast.error("Você só pode excluir seus próprios posts.");
      return;
    }

    const confirmDelete = window.confirm(
      "Tem certeza de que deseja excluir este post?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}/posts/remove/${postId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
        toast.success("Post excluído com sucesso!");
      } else {
        const errorData = await response.json();
        toast.error("Falha ao excluir o post: " + errorData.message);
      }
    } catch {
      toast.error("Erro ao excluir o post.");
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
        Carregando...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Erro: {error}
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6 relative">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Fórum
      </h1>

      <div className="bg-white shadow-xl rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Criar Novo Post</h2>
        {formError && <div className="text-red-500 mb-4">{formError}</div>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Conteúdo"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button label="Criar Post" type="submit" />
        </form>
      </div>

      <ul className="space-y-6">
        {posts.map((post) => (
          <li
            key={post.id}
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
                <p className="text-gray-500 text-sm">Autor: @{post.author}</p>
                {user &&
                  (post.authorId === user.id || user.rolePosition > 1) && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(post.id, post.authorId);
                      }}
                      className="text-red-500 text-sm">
                      Excluir
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
