import type { Profile } from "@/types/profile";

import Card from "@/components/ui/Card";
import CardHeader from "@/components/portfolio/CardHeader";
import CardTitle from "@/components/portfolio/CardTitle";
import CardFooter from "@/components/portfolio/CardFooter";

type PortfolioCardProps = {
  profile: Profile;
};

export default function PortfolioCard({ profile }: PortfolioCardProps) {
  return (
    <Card className="animate-fade-in-up flex min-h-[380px] w-full flex-col justify-between gap-8 p-6 sm:aspect-[1.55] sm:min-h-0 sm:gap-10 sm:p-8 lg:p-10">
      <CardHeader profile={profile} />
      <CardTitle profile={profile} />
      <CardFooter profile={profile} />
    </Card>
  );
}
