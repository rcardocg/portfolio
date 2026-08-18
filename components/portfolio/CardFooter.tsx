import type { Profile } from "@/types/profile";

import ExternalLink from "@/components/ui/ExternalLink";

type CardFooterProps = {
  profile: Profile;
};

export default function CardFooter({ profile }: CardFooterProps) {
  return (
    <div className="flex items-center justify-center gap-2 text-[9px] uppercase tracking-[0.2em] text-neutral-600 sm:text-[10px]">
      <span>{profile.location}</span>
      <span aria-hidden="true">|</span>
      <ExternalLink
        href={profile.githubUrl}
        className="underline text-[9px] uppercase tracking-[0.2em] text-neutral-600 hover:text-neutral-950 sm:text-[10px]"
      >
        github.com/{profile.github}
      </ExternalLink>
    </div>
  );
}
