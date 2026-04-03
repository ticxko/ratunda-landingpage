export function WhatsAppBubble() {
  const whatsappNumber = "6281188819865";
  const message = encodeURIComponent("Halo Ratunda, saya ingin berkonsultasi mengenai renovasi rumah.");

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3 pointer-events-none">
      <div className="hidden sm:block bg-white text-foreground px-4 py-3 rounded-2xl text-sm font-bold shadow-2xl border border-gray-100 max-w-[200px] animate-in fade-in slide-in-from-bottom-2 duration-500">
        Hubungi kami dan sampaikan rencana Anda
      </div>
      <a
        href={`https://wa.me/${whatsappNumber}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="h-14 w-14 rounded-full bg-white shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center pointer-events-auto"
        title="Chat via WhatsApp"
        onClick={() => window.gtag?.('event', 'conversion', { send_to: 'AW-18020162559/pGTsCO234okcEP-315BD' })}
      >
        <svg viewBox="0 0 48 48" className="h-14 w-14" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="24" fill="#25D366" />
          <path
            fill="white"
            d="M24 10.5C16.544 10.5 10.5 16.544 10.5 24c0 2.385.638 4.716 1.849 6.763L10.5 37.5l6.963-1.826A13.44 13.44 0 0 0 24 37.5c7.456 0 13.5-6.044 13.5-13.5S31.456 10.5 24 10.5zm0 24.75a11.19 11.19 0 0 1-5.703-1.557l-.41-.243-4.133 1.084 1.103-4.026-.267-.424A11.19 11.19 0 0 1 12.75 24c0-6.213 5.037-11.25 11.25-11.25S35.25 17.787 35.25 24 30.213 35.25 24 35.25zm6.17-8.424c-.337-.169-1.994-.984-2.303-1.097-.308-.112-.533-.168-.757.169-.225.337-.869 1.097-1.066 1.322-.196.224-.393.252-.73.084-.337-.168-1.423-.524-2.71-1.672-1.002-.893-1.678-1.995-1.875-2.332-.196-.337-.021-.519.148-.687.152-.151.337-.393.506-.59.168-.196.224-.337.336-.561.113-.225.057-.421-.028-.59-.084-.168-.757-1.826-1.038-2.499-.273-.656-.55-.567-.757-.577l-.645-.011c-.225 0-.59.084-.898.421-.309.337-1.178 1.153-1.178 2.81 0 1.658 1.206 3.26 1.374 3.485.169.224 2.373 3.622 5.75 5.079.803.347 1.43.554 1.918.709.806.256 1.54.22 2.12.133.647-.096 1.994-.815 2.275-1.602.281-.786.281-1.46.196-1.601-.084-.14-.308-.224-.645-.393z"
          />
        </svg>
      </a>
    </div>
  );
}
