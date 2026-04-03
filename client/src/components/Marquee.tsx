import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MarqueeItem {
  text: string;
  icon: LucideIcon;
}

interface MarqueeProps {
  items: MarqueeItem[];
  className?: string;
  direction?: "left" | "right";
  speed?: "slow" | "medium" | "fast";
  fadeColor?: string;
}

export function Marquee({ items, className, direction = "left", speed = "medium", fadeColor }: MarqueeProps) {
  const speedClass = {
    slow: "animate-scroll-slow",
    medium: "animate-scroll",
    fast: "animate-scroll-fast"
  }[speed];

  const directionClass = direction === "right" ? "direction-reverse" : "";

  return (
    <div className={cn("relative flex overflow-hidden w-full py-1", className)}>
      <div className={cn("flex whitespace-nowrap pause-on-hover", speedClass, directionClass)}>
        {/* Render items multiple times to create seamless endless loop */}
        {[...items, ...items, ...items, ...items].map((item, idx) => (
          <div
            key={`${item.text}-${idx}`}
            className="
              mx-3 px-6 py-2.5 rounded-full
              bg-white border border-primary/10 text-primary
              font-bold text-sm md:text-lg shadow-md
              hover:bg-primary hover:text-white hover:shadow-lg
              transition-all duration-300 cursor-default
              flex items-center gap-3
            "
          >
            <item.icon className="w-5 h-5 md:w-6 h-6" />
            {item.text}
          </div>
        ))}
      </div>
      
      {/* Fade edges */}
      <div className={cn("absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r to-transparent z-10", fadeColor ?? "from-background")} />
      <div className={cn("absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l to-transparent z-10", fadeColor ?? "from-background")} />
    </div>
  );
}
