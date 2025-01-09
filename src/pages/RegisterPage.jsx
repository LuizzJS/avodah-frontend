import { useState } from "react";
import { register, login } from "../auth";
import { useNavigate } from "react-router-dom";
import { Input, Link, Button } from "../export.js";
import { User2, Lock, Mail, Church } from "lucide-react";
import * as EmailValidator from "email-validator";
import { passwordStrength } from "check-password-strength";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Validate email
      const isValidEmail = EmailValidator.validate(email);
      if (!isValidEmail) {
        throw new Error("Email inválido.");
      }

      // Check password strength
      const passwordStrengthResult = passwordStrength(password);
      if (passwordStrengthResult.id < 1) {
        throw new Error(
          "A senha precisa ser mais forte. Use uma senha com pelo menos 8 caracteres, incluindo letras e números."
        );
      }

      // Register user
      const registerResponse = await register(username, email, password);
      if (registerResponse.ok) {
        toast.success("Cadastro realizado com sucesso, realizando login...");
        setTimeout(async () => {
          // Log in after registration
          const loginResponse = await login(username, password);
          if (loginResponse.success) {
            toast.success("Logado com sucesso.");
            setTimeout(() => {
              navigate("/");
              window.location.reload();
            }, 2000);
          } else {
            throw new Error("Login após cadastro falhou.");
          }
        }, 2000);
      } else {
        throw new Error("Algo deu errado. Tente novamente.");
      }
    } catch (err) {
      setError(err.message || "Algo deu errado. Tente novamente.");
      toast.error(err.message || "Algo deu errado. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="h-full w-full flex justify-center items-center">
      <div className="w-80 h-[450px] bg-transparent rounded-xl shadow-md flex flex-col justify-center items-center gap-4 px-4">
        <h1 className="text-5xl font-oswald font-bold">CADASTRO</h1>
        <Input
          icon={User2}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nome"
          type="text"
        />
        <Input
          icon={Mail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="text"
        />
        <Input
          icon={Lock}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          type="password"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button
          click={handleSubmit}
          label={isLoading ? "Cadastrando..." : "Realizar o cadastro"}
          icon={<Church />}
          disabled={isLoading} // Disable button while loading
        />
        <Link href="/login" label="Já possui uma conta? Realize o login" />
      </div>
    </section>
  );
};

export default RegisterPage;
