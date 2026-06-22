import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FaqItems } from "@/data/Faq"
import { FaqCards } from "@/data/Faq"


export function Faq() {
  return (
    <div className="w-full bg-yellow-base py-12">
      <section id="faq" className="container grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-5xl font-bold">Perguntas Frequentes</h1>
          <p className="my-4 mb-12 text-lg w-4/5 font-medium">
            Encontre respostas para as principais dúvidas sobre nossos
            investimentos, processos e condições.
          </p>
          <div className="grid grid-cols-1 gap-10">
            {FaqCards.map((card) => (
              <div key={card.title} className=" flex items-center gap-4">
                <div className="bg-yellow-dark rounded-md p-3">
                <card.icon weight="fill" size={32} className="text-black" />
                </div>
                <div>
                <h2 className="text-xl font-bold">{card.title}</h2>
                <p className="text-md">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <Accordion
            type="single"
            collapsible
            className="flex w-full flex-col gap-6"
            defaultValue="pagamento"
          >
            {FaqItems.map((item) => (
              <AccordionItem key={item.value} value={item.value}>
                <AccordionTrigger>{item.trigger}</AccordionTrigger>
                <AccordionContent>{item.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  )
}
