import {
  User,
  Mail,
  AlertOctagon,
  MessageSquareText,
  Loader,
} from "lucide-react";
import { API_URL } from "../auth.js";
import Button from "../components/Button";
import Input from "../components/Input";
import { useState } from "react";
import * as MailValidator from "email-validator";
import toast from "react-hot-toast";

const ErrorReport = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !description) {
      toast.error("Por favor, preencha todos os campos antes de enviar!");
      return;
    }

    if (!MailValidator.validate(email)) {
      toast.error("Por favor, insira um email válido!");
      return;
    }

    setIsSubmitting(true);
    toast.success(
      "Obrigado por reportar o erro. Entraremos em contato em breve!"
    );

    const formData = { name, email, description };
    await handleEmailSend(formData);

    setName("");
    setEmail("");
    setDescription("");
    setIsSubmitting(false);
  };

  const handleEmailSend = async (formData) => {
    try {
      const response = await fetch(`${API_URL}/send-report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Email sent successfully:", data);
      } else {
        toast.error("Ocorreu um erro ao enviar o relatório.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Ocorreu um erro ao enviar o relatório.");
    }
  };

  return (
    <section className="flex justify-center items-center h-full bg-gray-100">
      <div className="shadow-lg w-full max-w-lg p-8 bg-white rounded-xl">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 justify-center items-center">
          <h1 className="text-3xl font-bold font-oswald text-center text-gray-800 mb-4">
            REPORTAR ERRO
          </h1>

          <Input
            name="name"
            id="name"
            placeholder="Nome"
            icon={User}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            name="email"
            id="email"
            placeholder="Email"
            icon={Mail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            name="description"
            id="description"
            placeholder="Descrição do erro"
            icon={MessageSquareText}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button
            type="submit"
            label={isSubmitting ? "Enviando..." : "Reportar Erro"}
            className={`w-full py-2 px-4 rounded-lg font-medium ${
              isSubmitting ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            } text-white`}
            icon={
              isSubmitting ? (
                <Loader className="animate-spin" />
              ) : (
                <AlertOctagon />
              )
            }
            disabled={isSubmitting}
          />
        </form>
      </div>
    </section>
  );
};

export default ErrorReport;
