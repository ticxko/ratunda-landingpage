import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
}

export function Marquee({ items, className }: MarqueeProps) {
  return (
    <div className={cn("relative flex overflow-hidden w-full py-8 bg-primary/5", className)}>
      <div className="flex animate-scroll whitespace-nowrap pause-on-hover">
        {/* Render items twice to create seamless loop */}
        {[...items, ...items].map((item, idx) => (
          <div
            key={`${item}-${idx}`}
            className="
              mx-4 px-6 py-2 rounded-full
              bg-white border border-primary/10 text-primary
              font-medium text-sm md:text-base shadow-sm
              hover:bg-primary hover:text-white hover:shadow-md
              transition-all duration-300 cursor-default
            "
          >
            {item}
          </div>
        ))}
      </div>
      
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
    </div>
  );
}
