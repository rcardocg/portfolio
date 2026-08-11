import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[3px] border border-neutral-900/10 bg-[#fdfcf9] shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-shadow duration-700 hover:shadow-[0_2px_10px_rgba(0,0,0,0.08)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
