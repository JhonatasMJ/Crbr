import { ContactForm } from "@/components/contactForm";
import { ScrollReveal, ScrollStagger } from "@/components/scroll-reveal";
import { ArrowUpIcon, ClockIcon, ShieldCheckIcon } from "@phosphor-icons/react";

export function Contact() {
  return (
    <section id="contact" className="section-padding w-full scroll-mt-24">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-16 items-center ">
        <ScrollReveal direction="left" className="max-w-full lg:max-w-[77%]">
          <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-4xl mb-6">
            Ainda tem <span className="text-yellow-base">dúvidas?</span> Prontos
            para te ajudar.
          </h1>
          <p className="text-md font-medium text-white mb-4">
            Nossa equipe está pronta para ajudar você em cada etapa da sua
            jornada de investimento.
          </p>
          <p className="text-md font-medium text-white mb-4">
            Entre em contato e receba um atendimento rápido, transparente e
            personalizado.
          </p>
          <ScrollStagger className="flex flex-col gap-8 mt-10" stagger={0.1}>
            <div className="flex items-center gap-4">
              <div className="bg-yellow-base rounded-md p-2 w-max">
                <ClockIcon weight="fill" size={24} className="text-black" />
              </div>
              <div>
                <p className="text-md font-medium text-white">
                  Tempo de resposta
                </p>
                <p className="text-sm font-medium text-yellow-base">
                  Em até 24 horas
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-2">
              <div className="bg-yellow-base rounded-md p-2 w-max">
                <ShieldCheckIcon
                  weight="fill"
                  size={24}
                  className="text-black"
                />
              </div>
              <div>
                <p className="text-md font-medium text-white">
                  Atendimento Seguro
                </p>
                <p className="text-sm font-medium text-yellow-base">
                  Seus dados protegidos
                </p>
              </div>
            </div>
          </ScrollStagger>

          <span className="w-full flex h-px bg-blackLight mt-8 mb-6"></span>
          <p className="text-md font-medium text-white">
            Prefere falar diretamente conosco?
          </p>
          <div className="flex items-center gap-4 mt-2">
            <div className="group flex items-center gap-1 cursor-pointer">
              <a
                className="text-md font-medium text-yellow-base"
                href="https://www.instagram.com/crbr.invest/"
                target="_blank"
              >
                Instagram
              </a>

              <ArrowUpIcon
                size={16}
                className="text-yellow-base rotate-45 transition-all duration-300 group-hover:rotate-90"
              />
            </div>
            <div className="group flex items-center gap-1 cursor-pointer">
              <a
                className="text-md font-medium text-yellow-base"
                href="mailto:suporte@crbr-invest.com.br"
                target="_blank"
              >
                Email
              </a>
              <ArrowUpIcon size={16} className="text-yellow-base rotate-45 transition-all duration-300 group-hover:rotate-90" />
            </div>
            <div className="group flex items-center gap-1 cursor-pointer">
              <a
                className="text-md font-medium text-yellow-base"
                href="https://wa.me/5516991380243"
                target="_blank"
              >
                WhatsApp
              </a>
              <ArrowUpIcon size={16} className="text-yellow-base rotate-45 transition-all duration-300 group-hover:rotate-90" />
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal direction="right" delay={0.1} className="flex-1 w-full">
          <ContactForm />
        </ScrollReveal>
      </div>
    </section>
  );
}
