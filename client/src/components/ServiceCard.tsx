import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  icon: LucideIcon;
  delay?: number;
  onClick?: () => void;
}

export function ServiceCard({ title, icon: Icon, delay = 0, onClick }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="
        group flex flex-col items-center justify-center p-6
        bg-white rounded-2xl border border-gray-100
        shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20
        transition-all duration-300 cursor-pointer
      "
    >
      <div className="
        p-4 rounded-xl bg-card text-primary mb-4
        group-hover:bg-primary group-hover:text-white
        transition-colors duration-300
      ">
        <Icon className="w-8 h-8" strokeWidth={1.5} />
      </div>
      <h3 className="text-center font-display font-semibold text-gray-800 text-lg group-hover:text-primary transition-colors">
        {title}
      </h3>
    </motion.div>
  );
}
