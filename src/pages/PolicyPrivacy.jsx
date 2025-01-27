const policies = [
  {
    title: "1. Informações Coletadas",
    description:
      "Coletamos informações como nome, e-mail e dados de navegação quando você interage com nosso site, através de formulários, interações e cookies. Utilizamos ferramentas de análise para entender melhor o comportamento do usuário.",
  },
  {
    title: "2. Uso das Informações",
    description:
      "Utilizamos suas informações para otimizar nossos serviços, enviar atualizações relevantes, responder a solicitações e personalizar sua experiência em nosso site. Não compartilhamos seus dados para fins de marketing de terceiros sem seu consentimento explícito.",
  },
  {
    title: "3. Compartilhamento de Informações",
    description:
      "Não vendemos, trocamos ou alugamos suas informações pessoais. Podemos compartilhar dados com parceiros confiáveis que nos auxiliam na operação do site, sob estrita confidencialidade. Cumprimos todas as leis de proteção de dados aplicáveis.",
  },
  {
    title: "4. Segurança das Informações",
    description:
      "Esta política pode ser atualizada periodicamente. Recomendamos a revisão regular desta página para se manter informado sobre nossas práticas de privacidade. A data da última atualização será sempre exibida.",
  },
  {
    title: "5. Alterações nesta Política",
    description:
      "Implementamos medidas de segurança robustas para proteger suas informações contra acessos não autorizados. Embora nos esforcemos para garantir a segurança total, reconhecemos que nenhum método de transmissão online é 100% inviolável.",
  },
  {
    title: "6. Contato",
    description:
      "Para dúvidas sobre esta política, entre em contato: asdministerioavodah@gmail.com",

    contact: true,
  },
];

const PolicyPrivacy = () => {
  return (
    <section className="max-w-5xl mx-auto p-8  rounded-2xl my-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-indigo-800 tracking-tight mb-4 animate-pulse">
          Política de Privacidade
        </h1>
        <p className="text-gray-600 text-lg">
          Seu direito à privacidade é fundamental para nós. Leia atentamente
          nossa política.
        </p>
      </div>

      <div className="space-y-6">
        {policies.map(({ title, description, contact }) => {
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

export default PolicyPrivacy;
