import { FaWhatsapp } from "react-icons/fa6";
import { whatsappLink, WHATSAPP_MESSAGES } from "../data/siteConfig.js";

export default function FloatingWhatsApp() {
  return (
    <a
      className="whatsapp-float"
      href={whatsappLink(WHATSAPP_MESSAGES.floating)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with SevenKNC Global Exim on WhatsApp"
    >
      <span className="whatsapp-float__pulse">
        <FaWhatsapp size={28} />
      </span>
      <span className="whatsapp-float__tip">Chat with us on WhatsApp</span>
    </a>
  );
}
