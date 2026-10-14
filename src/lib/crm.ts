// Texto LGPD mostrado no formulário. O CRM guarda exatamente esta frase como
// prova do consentimento, então o que aparece na tela e o que é enviado têm que
// ser a mesma constante.
//
// O envio do lead ao CRM não acontece mais no navegador: o servidor do site
// entrega (src/lib/crm-entrega.ts), com tentativas e registro do estado.
export const CONSENT_TEXT =
  "Ao enviar, você autoriza a PS Proteção a usar seu nome e WhatsApp para retornar este contato e enviar o orçamento.";
