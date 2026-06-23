import { ContactForm } from "@/components/contactForm";
import { ArrowUpIcon, ClockIcon, ShieldCheckIcon } from "@phosphor-icons/react";

export function Contact() {
  return (
    <section id="contact" className="w-full scroll-mt-24 py-12 md:py-24 ">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-16 items-center ">
        <div className="max-w-full lg:max-w-[80%] ">
          <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-4xl mb-4">
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
          <div className="flex flex-col gap-8 mt-8">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-base rounded-md p-2 w-max">
              <ClockIcon weight="fill"  size={24} className="text-black" />
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
          <div className="flex items-center gap-4">
            <div className="bg-yellow-base rounded-md p-2 w-max">
              <ShieldCheckIcon weight="fill"  size={24} className="text-black" />
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
          </div>
         
          <span className="w-full flex h-px bg-blackLight mt-8 mb-6"></span>
          <p className="text-md font-medium text-white">
            Prefere falar diretamente conosco?
          </p>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1">
              <a className="text-md font-medium text-yellow-base" href="">
                Instagram
              </a>
              <ArrowUpIcon size={16} className="text-yellow-base rotate-45" />
            </div>
            <div className="flex items-center gap-1">
              <a className="text-md font-medium text-yellow-base" href="">
                Email
              </a>
              <ArrowUpIcon size={16} className="text-yellow-base rotate-45" />
            </div>
            <div className="flex items-center gap-1">
              <a className="text-md font-medium text-yellow-base" href="">
                WhatsApp
              </a>
              <ArrowUpIcon size={16} className="text-yellow-base rotate-45" />
            </div>
          </div>
        </div>
        <div className="flex-1 w-full">
        <ContactForm />
        </div>
     
      </div>
    </section>
  );
}
