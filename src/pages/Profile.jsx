import { useState, useEffect } from "react";
import { checkIfLoggedIn, logout, API_URL } from "../auth";
import { useNavigate, useLocation } from "react-router-dom";
import { User, Mail, Clock, Briefcase, IdCard } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import Button from "../components/Button";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isAltUser, setIsAltUser] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const loggedInUser = await checkIfLoggedIn();
        const userId = new URLSearchParams(location.search).get("id");

        if (userId) {
          const response = await axios.get(`${API_URL}/getUser?id=${userId}`);
          if (response.data.ok && response.data.user) {
            setUser(response.data.user);
            setIsAltUser(response.data.user._id !== loggedInUser.user._id);
          } else {
            navigate("/login");
          }
        } else {
          if (loggedInUser.ok && loggedInUser.user) {
            setUser(loggedInUser.user);
            setIsAltUser(false);
          } else {
            navigate("/login");
          }
        }
      } catch {
        navigate("/login");
      }
    };
    fetchUser();
  }, [location.search, navigate]);

  const handleLogout = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await logout();
      if (response.success) {
        toast.success("Conta deslogada com sucesso.");
        setTimeout(() => navigate("/"), 2000);
      } else {
        throw new Error("Falha ao deslogar.");
      }
    } catch {
      setError("Um erro inesperado ocorreu.");
      toast.error("Um erro inesperado ocorreu.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <section className="h-full w-full flex justify-center items-center">
        <p>Carregando...</p>
      </section>
    );
  }

  const formatDate = (date) =>
    new Date(date).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    }) || "Data inválida";

  const userInfo = [
    { icon: <User />, label: "Nome", value: user.username },
    { icon: <Mail />, label: "Email", value: user.email || "N/A" },
    {
      icon: <Clock />,
      label: "Conta criada em",
      value: formatDate(user.createdAt),
    },
    {
      icon: <Briefcase />,
      label: "Cargo",
      value: `${
        user.role.charAt(0).toUpperCase() + user.role.slice(1)
      } (posição ${user.rolePosition})`,
    },
    {
      icon: <IdCard />,
      label: "Número de identificação",
      value: user._id.slice(0, 9) + "*".repeat(user._id.slice(9).length),
    },
  ];

  return (
    <section className="h-full w-full flex justify-center items-center relative">
      <div className="flex flex-col items-left gap-3 shadow-md rounded-xl p-4 bg-white">
        <h1 className="text-5xl font-oswald font-bold text-center">
          INFORMAÇÕES DO USUÁRIO
        </h1>
        {userInfo.map(({ icon, label, value }) => (
          <div key={label} className="flex items-center gap-2">
            {icon}{" "}
            <p>
              {label}: <strong>{value}</strong>
            </p>
          </div>
        ))}
        {error && <p className="text-sm text-red-600">{error}</p>}
        {!isAltUser && (
          <div className="flex justify-center mt-4">
            <Button
              label={isLoading ? "Deslogando..." : "Deslogar"}
              click={handleLogout}
              disabled={isLoading}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Profile;
