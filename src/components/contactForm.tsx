import { useState } from "react";

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
import {
  buildContactWhatsAppMessage,
  whatsAppRedirect,
} from "@/utils/whatsAppRedirect";

const subjectOptions = [
  { value: "investimentos", label: "Dúvidas sobre investimentos" },
  { value: "suporte", label: "Suporte" },
  { value: "parcerias", label: "Parcerias" },
  { value: "outro", label: "Outro" },
] as const;

export function ContactForm() {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedMessage = message.trim();
    const subjectLabel =
      subjectOptions.find((option) => option.value === subject)?.label ?? subject;

    if (!trimmedName || !subject || !trimmedMessage) return;

    const whatsappMessage = buildContactWhatsAppMessage({
      name: trimmedName,
      subject: subjectLabel,
      message: trimmedMessage,
    });

    whatsAppRedirect(whatsappMessage);
    setName("");
    setSubject("");
    setMessage("");
  };

  return (
    <div className="w-full flex-1">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <InputLabel
          label="Nome"
          type="text"
          placeholder="Digite seu nome"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />

        <Field className="gap-2">
          <FieldLabel className="text-sm font-bold text-white">Assunto</FieldLabel>
          <Select value={subject} onValueChange={setSubject} required>
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
          <FieldLabel className="text-sm font-bold text-white">Mensagem</FieldLabel>
          <Textarea
            className="h-50 resize-none"
            placeholder="O que você gostaria de falar?"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            required
          />
        </Field>

        <Button
          variant="default"
          type="submit"
          className="w-full rounded-lg py-6 text-base font-bold"
        >
          Entrar em contato
        </Button>
        <span className="text-center text-sm text-white">
          * Você será redirecionado para o whatsapp para continuar a conversa *
        </span>
      </form>
    </div>
  );
}
