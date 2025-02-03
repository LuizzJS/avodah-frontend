import React, { useState, useEffect } from "react";
import {
  checkIfLoggedIn,
  logout,
  setNewRole,
  setNewPassword,
  changePicture,
} from "../auth";
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
  Upload,
} from "lucide-react";
import toast from "react-hot-toast";
import Button from "../components/Button";
import Input from "../components/Input";
import DefaultPicture from "../assets/default_user.jpg";

const Profile = () => {
  const [member, setMember] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditingRole, setIsEditingRole] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [picture, setPicture] = useState(DefaultPicture);
  const [newRole, setNewRoleValue] = useState("");
  const [emailForRole, setEmailForRole] = useState("");
  const [newPassword, setNewPasswordValue] = useState("");
  const [emailForPassword, setEmailForPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { ok, user } = await checkIfLoggedIn();
        if (ok && user) {
          setMember(user);
          setPicture(
            user.profilePicture !== "" ? user.profilePicture : DefaultPicture
          );
        } else {
          navigate("/login");
        }
      } catch {
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const { success } = await logout();
      if (success) {
        toast.success("Conta desconectada com sucesso.");
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 2000);
      }
    } catch {
      toast.error("Erro ao desconectar.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (
    updateFunc,
    value,
    email,
    successMsg,
    closeEdit
  ) => {
    if (!value || !email)
      return toast.error("Por favor, preencha todos os campos.");
    try {
      setIsLoading(true);
      const response = await updateFunc(value, email);
      if (response.success) {
        toast.success(successMsg);
        closeEdit(false);
      } else {
        toast.error(response.message || "Erro ao atualizar.");
      }
    } catch {
      toast.error("Erro ao atualizar.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Por favor, envie apenas imagens.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setPicture(reader.result);
    reader.readAsDataURL(file);

    await changePicture(file);
  };

  if (isLoading) return <div>Loading...</div>;
  if (!member) return <div>Loading...</div>;

  const userInfo = [
    { icon: <User />, label: "Nome", value: member.username },
    { icon: <Mail />, label: "Email", value: member.email },
    {
      icon: <Clock />,
      label: "Conta criada em",
      value: new Date(member.createdAt).toLocaleString("pt-BR"),
    },
    {
      icon: <Briefcase />,
      label: "Cargo",
      value: `${member.role} (Posição ${member.rolePosition})`,
    },
    { icon: <IdCard />, label: "ID", value: member._id.slice(0, 9) + "******" },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 space-y-6">
        <div className="text-center">
          <img
            src={picture}
            alt="Profile"
            className="mx-auto h-24 w-24 rounded-full object-cover"
          />
          <h2 className="mt-4 text-xl font-bold">{member.username}</h2>
          <p className="text-gray-600">{member.email}</p>
        </div>
        <div className="space-y-4">
          {userInfo.map(({ icon, label, value }) => (
            <div key={label} className="flex items-center border-b pb-2">
              <div className="text-indigo-600 mr-3">{icon}</div>
              <div>
                <dt className="text-sm font-medium text-gray-500">{label}</dt>
                <dd className="text-gray-900">{value}</dd>
              </div>
            </div>
          ))}
        </div>
        {member.rolePosition === 0 && (
          <div className="space-y-4">
            <Button
              label="Editar Cargo"
              icon={<Edit />}
              click={() => setIsEditingRole(!isEditingRole)}
            />
            {isEditingRole && (
              <div className="bg-gray-50 p-4 rounded-md">
                <Input
                  placeholder="Novo Cargo"
                  onChange={(e) => setNewRoleValue(e.target.value)}
                />
                <Input
                  placeholder="Email"
                  onChange={(e) => setEmailForRole(e.target.value)}
                />
                <div className="flex justify-end space-x-2">
                  <Button
                    label="Salvar"
                    click={() =>
                      handleUpdate(
                        setNewRole,
                        newRole,
                        emailForRole,
                        "Cargo atualizado",
                        setIsEditingRole
                      )
                    }
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
              click={() => setIsEditingPassword(!isEditingPassword)}
            />
            {isEditingPassword && (
              <div className="bg-gray-50 p-4 rounded-md">
                <Input
                  type="password"
                  placeholder="Nova Senha"
                  onChange={(e) => setNewPasswordValue(e.target.value)}
                />
                <Input
                  placeholder="Email"
                  onChange={(e) => setEmailForPassword(e.target.value)}
                />
                <div className="flex justify-end space-x-2">
                  <Button
                    label="Salvar"
                    click={() =>
                      handleUpdate(
                        setNewPassword,
                        newPassword,
                        emailForPassword,
                        "Senha atualizada",
                        setIsEditingPassword
                      )
                    }
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
            <Button
              label="Alterar Foto"
              icon={<Upload />}
              click={() => document.getElementById("fileInput").click()}
            />
            <input
              id="fileInput"
              type="file"
              className="hidden"
              onChange={handleUpload}
            />
          </div>
        )}
        <Button
          label="Sair"
          icon={<CornerUpLeft />}
          click={handleLogout}
          className="w-full"
        />
      </div>
    </section>
  );
};

export default Profile;
