"use client";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-municipal py-6 border-t border-gray-200 shadow-inner">
      <div className="max-w-screen-xl mx-auto text-center space-y-2">
        <p className="text-sm font-medium">
          Versão do sistema: 2.0.0 - 25/08/2025
        </p>
        <p className="text-sm font-medium">
          Desenvolvido por Marcelo - Departamento de TI/CPD
        </p>
        <p className="text-xs text-gray-500">
          Copyright &copy; {currentYear} - Prefeitura Municipal de Manduri - Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
