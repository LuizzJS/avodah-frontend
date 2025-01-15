import { useState, useEffect } from "react";
import { checkIfLoggedIn, logout, API_URL } from "../auth";
import { useNavigate, useLocation } from "react-router-dom";
import {
  User,
  Mail,
  Clock,
  Briefcase,
  IdCard,
  ArrowBigLeftDash,
  CornerUpLeft,
} from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import Button from "../components/Button";
import DefaultPicture from "../assets/default_user.jpg";

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
        const { ok, user } = await checkIfLoggedIn();
        const userId = new URLSearchParams(location.search).get("id");

        if (userId) {
          const { data } = await axios.get(`${API_URL}/getUser?id=${userId}`);
          if (data.ok && data.user) {
            setUser(data.user);
            setIsAltUser(data.user._id !== user._id);
          } else {
            navigate("/login");
          }
        } else {
          if (ok && user) {
            setUser(user);
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
      const { success } = await logout();
      if (success) {
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
    navigate("/login");
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
  const username =
    user.username[0].toUpperCase() + user.username.slice(1) || "N/A";
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
      <div className="w-full max-w-4xl p-4 bg-white rounded-lg shadow-lg flex justify-between items-center gap-6">
        <div className="flex gap-4 items-center justify-center">
          <div
            id="profile-picture"
            className="rounded-full w-16 h-16 bg-gray-200 flex justify-center items-center">
            <img src={DefaultPicture} className="object-cover rounded-full" />
          </div>
          <div>
            <h1 className="text-2xl font-bold mt-4">{username}</h1>
            <p className="text-sm text-gray-500 ">{user.email}</p>
          </div>
        </div>
        {error && error}
        <Button label="Sair" icon={<CornerUpLeft />} click={handleLogout} />
      </div>
    </section>
  );
};

export default Profile;
