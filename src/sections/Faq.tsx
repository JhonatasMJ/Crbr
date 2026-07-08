import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RevealGroup, RevealItem } from "@/components/scroll-reveal";
import { ScrollReveal } from "@/components/scroll-reveal";
import { FaqCards, FaqItems } from "@/data/Faq";

export function Faq() {
  return (
    <section
      id="faq"
      className="section-padding w-full scroll-mt-24 bg-yellow-base"
    >
      <div className="container grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
        <div className="min-w-0">
          <ScrollReveal direction="left">
            <h2 className="text-2xl font-bold text-black sm:text-3xl lg:text-4xl xl:text-5xl">
              Perguntas Frequentes
            </h2>
            <p className="mt-3 max-w-xl text-sm font-medium text-black/80 sm:mt-4 sm:text-base lg:mb-10 lg:text-lg">
              Encontre respostas para as principais dúvidas sobre nossos
              investimentos, processos e condições.
            </p>
          </ScrollReveal>

          <RevealGroup
            className="mt-6 grid grid-cols-1 gap-5 sm:mt-8 sm:gap-6 lg:mt-0 lg:gap-8"
            stagger={0.12}
          >
            {FaqCards.map((card, index) => (
              <RevealItem
                key={card.title}
                variant="slide-left"
                index={index}
                className="flex items-start gap-3 sm:items-center sm:gap-4"
              >
                <div className="shrink-0 rounded-md bg-yellow-dark p-2.5 sm:p-3">
                  <card.icon
                    weight="fill"
                    className="size-6 text-black sm:size-8"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-bold text-black sm:text-lg lg:text-xl">
                    {card.title}
                  </h3>
                  <p className="mt-0.5 text-sm font-medium text-black/80 sm:text-base">
                    {card.description}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <RevealGroup
          className="flex w-full min-w-0 flex-col gap-4 sm:gap-5 lg:gap-6"
          stagger={0.08}
        >
          <Accordion
            type="single"
            collapsible
            className="flex w-full flex-col gap-4 sm:gap-5 lg:gap-6"
            defaultValue="pagamento"
          >
            {FaqItems.map((item, index) => (
              <RevealItem key={item.value} index={index} className="w-full">
                <AccordionItem
                  value={item.value}
                  className="cursor-pointer"
                >
                  <AccordionTrigger className="text-left text-sm leading-snug break-words sm:text-base">
                    {item.trigger}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm sm:text-base">
                    {item.content}
                  </AccordionContent>
                </AccordionItem>
              </RevealItem>
            ))}
          </Accordion>
        </RevealGroup>
      </div>
    </section>
  );
}
