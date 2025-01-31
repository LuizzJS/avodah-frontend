import React from "react";

const terms = [
  {
    title: "1. Aceitação dos Termos",
    description:
      "Ao acessar e utilizar nosso site, você concorda com os Termos de Serviço aqui estabelecidos. Caso não concorde, recomendamos que não utilize nossos serviços.",
  },
  {
    title: "2. Modificações dos Termos",
    description:
      "Reservamo-nos o direito de atualizar ou modificar estes termos a qualquer momento. Notificaremos sobre mudanças significativas por meio do site ou e-mail, quando aplicável.",
  },
  {
    title: "3. Uso Permitido",
    description:
      "Você concorda em utilizar nossos serviços de forma legal, sem violar direitos de terceiros ou leis aplicáveis. O uso indevido pode resultar na suspensão ou bloqueio do acesso.",
  },
  {
    title: "4. Limitação de Responsabilidade",
    description:
      "Não nos responsabilizamos por danos diretos ou indiretos decorrentes do uso do site. Os serviços são fornecidos 'como estão', sem garantias de qualquer tipo.",
  },
  {
    title: "5. Contato",
    description:
      "Para dúvidas sobre estes termos, entre em contato: asdministerioavodah@gmail.com",
    contact: true,
  },
];

const ToS = () => {
  return (
    <section className="max-w-5xl mx-auto p-8 rounded-2xl my-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-indigo-800 tracking-tight mb-4 animate-pulse">
          Termos de Serviço
        </h1>
        <p className="text-gray-600 text-lg">
          Leia atentamente nossos termos antes de utilizar nossos serviços.
        </p>
      </div>

      <div className="space-y-6">
        {terms.map(({ title, description, contact }) => {
          const splittedDesc = contact ? description.split(":") : "";
          return (
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
              <h2 className="text-2xl font-semibold text-indigo-700 mb-2">
                {title}
              </h2>
              <p className={`text-gray-700 leading-relaxed flex `}>
                {contact ? splittedDesc[0] + ":" : description} &nbsp;
                {contact && (
                  <a
                    className="hover:text-indigo-800 transition duration-300 cursor-pointer"
                    href={"mailto:" + splittedDesc[1].trim()}>
                    {splittedDesc[1]}
                  </a>
                )}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ToS;
