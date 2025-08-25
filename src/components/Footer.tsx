const Footer = () => {
    const currentYear = new Date().getFullYear(); // Pega o ano atual
  
    return (
      <footer className="bg-gray-800 text-white py-4 mt-8">
        <div className="max-w-screen-xl mx-auto text-center">
          <p className="text-sm">
            Versão do sistema: 2.0.0 - 25/08/2025
          </p>
          <p className="text-sm">
            Desenvolvido por Marcelo - Departamento de TI/CPD
          </p>
          <p className="text-sm">
            Copyright &copy; {currentYear} - Prefeitura Municipal de Manduri - Todos os direitos reservados.
          </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  