import React, { useState, useEffect, useCallback } from "react";
import imageCompression from "browser-image-compression";
import { useNavigate } from "react-router-dom";
import {
  checkIfLoggedIn,
  logout,
  setNewRole,
  setNewPassword,
  changePicture,
} from "../auth.js";
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
  const [editMode, setEditMode] = useState({ role: false, password: false });
  const [formData, setFormData] = useState({
    role: "",
    password: "",
    email: "",
  });
  const [picture, setPicture] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { ok, user } = await checkIfLoggedIn();
        if (ok && user) {
          setMember(user);
          setPicture(user.profilePicture || DefaultPicture);
        } else navigate("/login");
      } catch {
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const { success } = await logout();
      if (success) {
        toast.success("Conta desconectada.");
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 1500);
      }
    } catch {
      toast.error("Erro ao desconectar.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (type) => {
    const { email, role, password } = formData;
    const value = type === "role" ? role : password;
    const updateFunc = type === "role" ? setNewRole : setNewPassword;

    if (!value || !email) return toast.error("Preencha todos os campos.");

    try {
      const response = await updateFunc(value, email);
      if (response.success) {
        toast.success(`${type === "role" ? "Cargo" : "Senha"} atualizado(a).`);
        setEditMode((prev) => ({ ...prev, [type]: false }));
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
    if (!file || !file.type.startsWith("image/"))
      return toast.error("Apenas imagens são permitidas.");

    try {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 0.1,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      });
      const reader = new FileReader();

      reader.onloadend = async () => {
        const imageBase64 = reader.result;
        setPicture(imageBase64);
        const response = await changePicture(member, imageBase64);
        response.success
          ? toast.success("Imagem atualizada com sucesso!")
          : toast.error(response.message || "Erro ao atualizar imagem.");
      };

      reader.readAsDataURL(compressedFile);
    } catch (error) {
      toast.error("Erro ao processar a imagem.");
    }
  };

  if (isLoading || !member)
    return (
      <div className="flex justify-center items-center h-[100%] w-[100%]">
        Loading...
      </div>
    );

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
            {["role", "password"].map((type) => (
              <div key={type}>
                <Button
                  label={type === "role" ? "Editar Cargo" : "Alterar Senha"}
                  icon={<Edit />}
                  click={() =>
                    setEditMode((prev) => ({ ...prev, [type]: !prev[type] }))
                  }
                />
                {editMode[type] && (
                  <div className="bg-gray-50 p-4 rounded-md">
                    <Input
                      type={type === "password" ? "password" : "text"}
                      placeholder={
                        type === "role" ? "Novo Cargo" : "Nova Senha"
                      }
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          [type]: e.target.value,
                        }))
                      }
                    />
                    <Input
                      placeholder="Email"
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                    />
                    <div className="flex justify-end space-x-2">
                      <Button
                        label="Salvar"
                        click={() => handleUpdate(type)}
                        icon={<Save />}
                      />
                      <Button
                        label="Cancelar"
                        secondary
                        click={() =>
                          setEditMode((prev) => ({ ...prev, [type]: false }))
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}

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
