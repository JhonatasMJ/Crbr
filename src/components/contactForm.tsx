import { InputLabel } from "./inputLabel";
import { Button } from "./ui/button";
import { Field, FieldLabel } from "./ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

const subjectOptions = [
  { value: "investimentos", label: "Dúvidas sobre investimentos" },
  { value: "suporte", label: "Suporte" },
  { value: "parcerias", label: "Parcerias" },
  { value: "outro", label: "Outro" },
];

export function ContactForm() {
  return (
    <div className="w-full flex-1">
      <form className="flex flex-col gap-5">
        <InputLabel label="Nome" type="text" placeholder="Digite seu nome" />
        <Field className="gap-2">
          <FieldLabel className="text-sm font-bold text-white">
            Assunto
          </FieldLabel>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um assunto" />
            </SelectTrigger>
            <SelectContent>
              {subjectOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field className="gap-2">
          <FieldLabel className="text-sm font-bold text-white">
            Mensagem
          </FieldLabel>

          <Textarea
            className="resize-none h-50"
            placeholder="O que você gostaria de falar?"
            
          />
        </Field>

        <Button
          variant="default"
          type="submit"
          className="py-6 w-full rounded-lg text-sm font-bold"
        >
          Entrar em contato
        </Button>
        <span className="text-sm text-white text-center">* Você será redirecionado para o whatsapp para continuar a conversa *</span>
      </form>
    </div>
  );
}
