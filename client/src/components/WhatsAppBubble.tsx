import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WhatsAppBubble() {
  const whatsappNumber = "6281234567890"; // Replaced with a common ID format
  const message = encodeURIComponent("Halo Ratunda, saya ingin berkonsultasi mengenai renovasi rumah.");
  
  const handleClick = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <Button
        onClick={handleClick}
        size="icon"
        className="h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-2xl hover:scale-110 transition-all duration-300 border-none group"
        title="Chat via WhatsApp"
      >
        <MessageCircle className="h-8 w-8 fill-current" />
        <span className="absolute right-full mr-4 bg-white text-foreground px-3 py-1.5 rounded-lg text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-gray-100">
          Chat WhatsApp
        </span>
      </Button>
    </div>
  );
}
