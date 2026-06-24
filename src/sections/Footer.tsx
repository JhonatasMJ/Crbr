import LogoBlack from "@/assets/logoBlack.svg";

const footerLinks = [
  {
    title: "Navegação",
    links: [
      { label: "Início", href: "#home" },
      { label: "Soluções", href: "#solutions" },
      { label: "Aplicativo", href: "#app" },
      { label: "Simulação", href: "#simulacao" },
    ],
  },
  {
    title: "Contatos",
    links: [
      { label: "Instagram", href: "#contact" },
      { label: "Whatsapp", href: "#contact" },
      { label: "Email", href: "#contact" },
    ],
  },
  {
    title: "Baixe o App",
    links: [
      { label: "Play Store", href: "#app" },
      { label: "App Store", href: "#app" },
    ],
  },
];

export const Footer = () => {
  return (
    <footer>
      <div className="section-padding bg-yellow-base">
        <div className="container">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-16">
            <div className="flex flex-col gap-6 lg:min-h-[200px] lg:justify-between">
              <div className="flex flex-col gap-4">
                <img
                  src={LogoBlack}
                  alt="CRBR"
                  className="size-12 md:size-14"
                />
                <p className="max-w-sm text-xl font-bold text-black md:text-2xl">
                  Deixe seu dinheiro trabalhar por você
                </p>
              </div>
              <p className="hidden text-sm font-medium text-black lg:block">
                CRBR © Todos os direitos reservados
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12 lg:gap-16">
              {footerLinks.map((column) => (
                <div key={column.title} className="flex flex-col gap-3">
                  <h4 className="text-base font-bold text-black">
                    {column.title}
                  </h4>
                  <ul className="flex flex-col gap-2">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-base text-black transition-opacity hover:opacity-70"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p className="text-sm font-medium text-black lg:hidden">
              CRBR © Todos os direitos reservados
            </p>
          </div>
        </div>
      </div>

      <div className="bg-black py-2 text-center">
        <span className="text-sm text-white">
          Desenvolvido por{" "}
          <a
            className="cursor-pointer text-yellow-base underline"
            href="https://www.instagram.com/lucas.nunes.dev/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Jhowww
          </a>
        </span>
      </div>
    </footer>
  );
};
