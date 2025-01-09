import React from "react";

const ToS = () => {
  return (
    <section className="h-full w-full flex justify-center items-center px-8 bg-gray-100">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-5xl font-semibold text-blue-700 mb-4">
          Termos de Serviço
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Ao usar nosso serviço, você concorda com os seguintes termos e
          condições:
        </p>
        <div className="text-left text-gray-700 mb-6">
          <h2 className="text-2xl font-semibold">1. Aceitação dos Termos</h2>
          <p>
            Ao acessar ou usar os serviços fornecidos, você concorda em cumprir
            e estar sujeito aos termos e condições descritos aqui. Se você não
            concordar com qualquer parte desses termos, não poderá usar os
            serviços.
          </p>
          <h2 className="text-2xl font-semibold mt-4">2. Uso dos Serviços</h2>
          <p>
            Você concorda em usar nossos serviços de maneira legal, respeitando
            as leis aplicáveis e sem violar os direitos de terceiros. Você
            também se compromete a não usar nossos serviços para atividades
            ilícitas ou prejudiciais.
          </p>
          <h2 className="text-2xl font-semibold mt-4">
            3. Propriedade Intelectual
          </h2>
          <p>
            Todos os direitos de propriedade intelectual relacionados aos nossos
            serviços, incluindo, mas não se limitando a, textos, gráficos,
            imagens e software, são de nossa propriedade ou licenciados. Você
            não tem permissão para copiar, modificar ou distribuir esses
            materiais sem nossa autorização.
          </p>
          <h2 className="text-2xl font-semibold mt-4">
            4. Limitação de Responsabilidade
          </h2>
          <p>
            Não nos responsabilizamos por danos diretos, indiretos ou
            consequenciais decorrentes do uso dos nossos serviços, incluindo,
            mas não se limitando a, perda de dados ou danos financeiros.
          </p>
          <h2 className="text-2xl font-semibold mt-4">
            5. Modificações nos Termos
          </h2>
          <p>
            Reservamo-nos o direito de modificar estes termos a qualquer
            momento. Qualquer alteração será publicada nesta página, e você
            concorda em revisar regularmente os termos.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ToS;
