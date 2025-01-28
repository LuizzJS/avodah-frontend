import { useState } from "react";
import { login } from "../auth";
import { useNavigate } from "react-router-dom";
import { Input, Link, Button } from "../export.js";
import { User2, Lock, LogIn } from "lucide-react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await login(username.trim(), password.trim());

      if (response.success) {
        toast.success("Logado com sucesso");
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 2000);
      } else {
        const errorText = "Credenciais incorretas. Tente novamente.";
        setError(errorText);
        toast.error(errorText);
      }
    } catch (error) {
      console.error("Error during login:", error);
      const errorText = "Ocorreu um erro. Por favor, tente novamente.";
      setError(errorText);
      toast.error(errorText);
    }
  };

  return (
    <section className="h-full w-full flex justify-center items-center">
      <div className="w-80 h-96 bg-transparent rounded-xl shadow-md flex justify-center items-center flex-col gap-4 px-4">
        <h1 className="text-5xl font-oswald font-bold text-center">LOGIN</h1>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            icon={User2}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nome"
            type="text"
            required
          />
          <Input
            icon={Lock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            type="password"
            required
          />
          {errorMessage && (
            <p className="text-sm text-red-600">{errorMessage}</p>
          )}
          <Button
            type="submit"
            click={handleSubmit}
            label="Login"
            icon={<LogIn />}
          />
        </form>
        <Link href="/register" label="Ainda não tem uma conta? Registre-se" />
      </div>
    </section>
  );
};

export default LoginPage;
