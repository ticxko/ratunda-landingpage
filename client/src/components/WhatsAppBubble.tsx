import { MessageCircle } from "lucide-react";

export function WhatsAppBubble() {
  const whatsappNumber = "6281188819865";
  const message = encodeURIComponent("Halo Ratunda, saya ingin berkonsultasi mengenai renovasi rumah.");

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3 pointer-events-none">
      <div className="bg-white text-foreground px-4 py-3 rounded-2xl text-sm font-bold shadow-2xl border border-gray-100 max-w-[200px] animate-in fade-in slide-in-from-bottom-2 duration-500">
        Hubungi kami dan sampaikan rencana Anda
      </div>
      <a
        href={`https://wa.me/${whatsappNumber}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center pointer-events-auto"
        title="Chat via WhatsApp"
      >
        <MessageCircle className="h-8 w-8 fill-current" />
      </a>
    </div>
  );
}
