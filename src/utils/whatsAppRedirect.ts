const numberWhatsApp = "5516996039438";

export const whatsAppRedirect = (message: string) => {
    window.open(`https://wa.me/${numberWhatsApp}?text=${message}`, '_blank');
}