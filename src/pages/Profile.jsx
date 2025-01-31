import React, { useState, useEffect } from "react";
import { checkIfLoggedIn, logout, setNewRole, setNewPassword } from "../auth";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Clock,
  Briefcase,
  IdCard,
  CornerUpLeft,
  Edit,
  Save,
} from "lucide-react";
import toast from "react-hot-toast";
import Button from "../components/Button";
import Input from "../components/Input";
import DefaultPicture from "../assets/default_user.jpg";

const Profile = () => {
  const [member, setMember] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditingRole, setIsEditingRole] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [newRole, setNewRoleValue] = useState("");
  const [emailForRole, setEmailForRole] = useState("");
  const [newPassword, setNewPasswordValue] = useState("");
  const [emailForPassword, setEmailForPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const { ok, user } = await checkIfLoggedIn();
        if (ok && user) {
          setMember(user);
        } else {
          navigate("/login");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        navigate("/login");
      } finally {
        setIsLoading(false);
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
        toast.success("Conta desconectada com sucesso.");
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 2000);
      } else {
        throw new Error("Falha ao desconectar.");
      }
    } catch (err) {
      setError("Um erro inesperado ocorreu.");
      toast.error("Um erro inesperado ocorreu: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleUpdate = async () => {
    setIsLoading(true);
    if (!newRole || !emailForRole) {
      toast.error("Por favor, preencha todos os campos.");
      setIsLoading(false);
      return;
    }
    try {
      const response = await setNewRole(newRole, emailForRole);
      if (!response.success) {
        toast.error(
          response.message || "Erro ao atualizar o cargo. Tente novamente."
        );
      } else {
        setIsEditingRole(false);
        toast.success("Cargo atualizado com sucesso.");
      }
    } catch (err) {
      toast.error("Erro ao atualizar o cargo: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordUpdate = async () => {
    setIsLoading(true);
    if (!newPassword || !emailForPassword) {
      toast.error("Por favor, preencha todos os campos.");
      setIsLoading(false);
      return;
    }
    try {
      const response = await setNewPassword(newPassword, emailForPassword);
      if (!response.success) {
        toast.error(
          response.message || "Erro ao atualizar a senha. Tente novamente."
        );
      } else {
        setIsEditingPassword(false);
        toast.success("Senha atualizada com sucesso.");
      }
    } catch (err) {
      toast.error("Erro ao atualizar a senha: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!member) {
    return <div>Loading...</div>;
  }

  const formatDate = (date) => {
    return (
      new Date(date).toLocaleString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC",
      }) || "Data inválida"
    );
  };

  const username =
    member.username.charAt(0).toUpperCase() + member.username.slice(1) || "N/A";
  const userInfo = [
    { icon: <User />, label: "Nome", value: username },
    { icon: <Mail />, label: "Email", value: member.email || "N/A" },
    {
      icon: <Clock />,
      label: "Conta criada em",
      value: formatDate(member.createdAt),
    },
    {
      icon: <Briefcase />,
      label: "Cargo",
      value: `${
        member.role.charAt(0).toUpperCase() + member.role.slice(1)
      } (Posição ${member.rolePosition})`,
    },
    {
      icon: <IdCard />,
      label: "Número de Identificação",
      value: member._id.slice(0, 9) + "*".repeat(member._id.slice(9).length),
    },
  ];

  return (
    <section className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 space-y-6">
        <div className="text-center">
          <div className="mx-auto h-24 w-24 rounded-full bg-gray-200 overflow-hidden">
            <img
              src={DefaultPicture}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">{username}</h2>
          <p className="text-gray-600">{member.email}</p>
        </div>

        <div className="space-y-4">
          {userInfo.map((item) => (
            <div
              key={item.label}
              className="flex items-center border-b border-gray-200 py-2">
              <div className="text-indigo-600 mr-3">{item.icon}</div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  {item.label}
                </dt>
                <dd className="text-gray-900">{item.value}</dd>
              </div>
            </div>
          ))}
        </div>

        {member.rolePosition === 0 && (
          <div className="flex flex-col justify-center items-center gap-4">
            <Button
              label="Editar Cargo"
              icon={<Edit />}
              click={() => setIsEditingRole((prev) => !prev)}
            />
            {isEditingRole && (
              <div className="bg-gray-50 p-4 rounded-md space-y-4 w-full">
                <Input
                  placeholder="Novo Cargo"
                  onChange={(e) => setNewRoleValue(e.target.value)}
                />
                <Input
                  placeholder="Email do Usuário"
                  onChange={(e) => setEmailForRole(e.target.value)}
                />
                <div className="flex justify-end space-x-2">
                  <Button
                    label="Salvar"
                    click={handleRoleUpdate}
                    icon={<Save />}
                  />
                  <Button
                    label="Cancelar"
                    secondary
                    click={() => setIsEditingRole(false)}
                  />
                </div>
              </div>
            )}
            <Button
              label="Alterar Senha"
              icon={<Edit />}
              click={() => setIsEditingPassword((prev) => !prev)}
            />
            {isEditingPassword && (
              <div className="bg-gray-50 p-4 rounded-md space-y-4 w-full">
                <Input
                  type="password"
                  placeholder="Nova Senha"
                  onChange={(e) => setNewPasswordValue(e.target.value)}
                />
                <Input
                  placeholder="Email do Usuário"
                  onChange={(e) => setEmailForPassword(e.target.value)}
                />{" "}
                <div className="flex justify-end space-x-2">
                  <Button
                    label="Salvar"
                    click={handlePasswordUpdate}
                    icon={<Save />}
                  />
                  <Button
                    label="Cancelar"
                    secondary
                    click={() => setIsEditingPassword(false)}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        <Button
          label="Sair"
          icon={<CornerUpLeft />}
          click={handleLogout}
          className="w-full mt-6"
        />
      </div>
    </section>
  );
};

export default Profile;
