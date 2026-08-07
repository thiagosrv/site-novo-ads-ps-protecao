import type { Metadata } from "next";
import ObrigadoContent from "@/components/ObrigadoContent";

export const metadata: Metadata = {
  title: "Obrigado | PS Proteção",
  description: "Sua solicitação foi recebida. Você será redirecionado para o WhatsApp.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ObrigadoPage() {
  return <ObrigadoContent />;
}
