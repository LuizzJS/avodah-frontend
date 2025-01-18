import { useState, useEffect } from "react";
import { checkIfLoggedIn, logout } from "../auth";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Clock,
  Briefcase,
  IdCard,
  CornerUpLeft,
} from "lucide-react";
import toast from "react-hot-toast";
import Button from "../components/Button";
import DefaultPicture from "../assets/default_user.jpg";

const Profile = () => {
  const [member, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { ok, user } = await checkIfLoggedIn();
        if (ok && user) {
          setUser(user);
        } else {
          navigate("/login");
        }
      } catch {
        navigate("/login");
      }
    };
    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    setIsLoading(true);
    setError("");
    try {
      const { success } = await logout();
      if (success) {
        toast.success("Conta deslogada com sucesso.");
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 2000);
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

  if (!member) {
    return null;
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
    member.username[0].toUpperCase() + member.username.slice(1) || "N/A";
  const userInfo = [
    { icon: <User />, label: "Nome", value: member.username },
    { icon: <Mail />, label: "Email", value: member.email || "N/A" },
    {
      icon: <Clock />,
      label: "Conta criada em",
      value: formatDate(member.createdAt),
    },
    {
      icon: <Briefcase />,
      label: "Cargo",
      value: `
        ${
          member.role.charAt(0).toUpperCase() + member.role.slice(1)
        } (posição ${member.rolePosition})`,
    },
    {
      icon: <IdCard />,
      label: "Número de identificação",
      value: member._id.slice(0, 9) + "*".repeat(member._id.slice(9).length),
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
            <p className="text-sm text-gray-500 ">{member.email}</p>
          </div>
        </div>
        {error && error}
        <Button label="Sair" icon={<CornerUpLeft />} click={handleLogout} />
      </div>
    </section>
  );
};

export default Profile;
