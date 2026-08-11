import type { Profile } from "@/types/profile";

type CardTitleProps = {
  profile: Profile;
};

export default function CardTitle({ profile }: CardTitleProps) {
  return (
    <div className="flex flex-col items-center gap-3 text-center sm:gap-4">
      <h1 className="text-[26px] font-semibold uppercase leading-none tracking-[0.08em] text-neutral-950 sm:text-4xl md:text-[40px]">
        {profile.name}
      </h1>
      <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-600 sm:text-xs">
        {profile.role}
      </p>
    </div>
  );
}
