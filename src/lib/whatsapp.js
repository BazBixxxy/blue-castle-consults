// src/lib/whatsapp.js
export function getWhatsAppLink(phone, message) {
  const digitsOnly = phone.replace(/[^\d]/g, "");
  return `https://wa.me/${digitsOnly}?text=${encodeURIComponent(message)}`;
}
