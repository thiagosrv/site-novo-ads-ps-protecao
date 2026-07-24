import { MessageCircle } from "lucide-react";
import clsx from "clsx";

export default function WhatsAppCta({
  href,
  label,
  className,
  onClick,
}: {
  href: string;
  label: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={clsx(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full text-center font-heading font-semibold tracking-wide bg-gradient-to-r from-yellow to-yellow-dark text-navy transition-all duration-300 hover:from-[#25D366] hover:to-[#1fae59] hover:text-white hover:shadow-lg hover:shadow-[#25D366]/25",
        className
      )}
    >
      <span className="inline-flex items-center justify-center gap-2 transition-opacity duration-300 group-hover:opacity-0">
        {label}
      </span>
      <span className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <MessageCircle size={18} />
        Estamos Online
      </span>
    </a>
  );
}
