"use client";

import { useState } from "react";

import type { Profile } from "@/types/profile";

import { cn } from "@/lib/cn";
import Card from "@/components/ui/Card";
import CardHeader from "@/components/portfolio/CardHeader";
import CardTitle from "@/components/portfolio/CardTitle";
import CardFooter from "@/components/portfolio/CardFooter";
import CardBack from "@/components/portfolio/CardBack";

type PortfolioCardProps = {
  profile: Profile;
};

export default function PortfolioCard({ profile }: PortfolioCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="animate-fade-in-up w-full [perspective:1200px]">
      <div
        className={cn(
          "relative [transform-style:preserve-3d] transition-transform duration-700 ease-out",
          isFlipped && "[transform:rotateY(180deg)]",
        )}
      >
        <div className="[backface-visibility:hidden]">
          <Card className="flex min-h-[380px] w-full flex-col justify-between gap-8 p-6 sm:aspect-[1.55] sm:min-h-0 sm:gap-10 sm:p-8 lg:p-10">
            <CardHeader
              profile={profile}
              isFlipped={isFlipped}
              onFlip={() => setIsFlipped((flipped) => !flipped)}
            />
            <CardTitle profile={profile} />
            <CardFooter profile={profile} />
          </Card>
        </div>
        <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <Card className="h-full w-full">
            <CardBack profile={profile} onBack={() => setIsFlipped(false)} />
          </Card>
        </div>
      </div>
    </div>
  );
}
