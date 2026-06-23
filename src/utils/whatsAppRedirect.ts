const numberWhatsApp = "5516996039438";

type ContactWhatsAppPayload = {
  name: string;
  subject: string;
  message: string;
};

export function buildContactWhatsAppMessage({
  name,
  subject,
  message,
}: ContactWhatsAppPayload) {
  return `Nome: ${name}\nAssunto: ${subject}\nMensagem: ${message}\n\n*Mensagem enviada pelo site*`;
}

export const whatsAppRedirect = (message: string) => {
  window.open(
    `https://wa.me/${numberWhatsApp}?text=${encodeURIComponent(message)}`,
    "_blank",
  );
};
