import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WhatsAppBubble() {
  const whatsappNumber = "6281188819865"; // Replaced with a common ID format
  const message = encodeURIComponent("Halo Ratunda, saya ingin berkonsultasi mengenai renovasi rumah.");
  
  const handleClick = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3 pointer-events-none">
      <div className="bg-white text-foreground px-4 py-3 rounded-2xl text-sm font-bold shadow-2xl border border-gray-100 max-w-[200px] animate-in fade-in slide-in-from-bottom-2 duration-500">
        Hubungi kami dan sampaikan rencana Anda
      </div>
      <Button
        onClick={handleClick}
        size="icon"
        className="h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-2xl hover:scale-110 transition-all duration-300 border-none group pointer-events-auto"
        title="Chat via WhatsApp"
      >
        <MessageCircle className="h-8 w-8 fill-current" />
      </Button>
    </div>
  );
}
