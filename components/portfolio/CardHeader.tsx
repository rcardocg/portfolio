import type { Profile } from "@/types/profile";

type CardHeaderProps = {
  profile: Profile;
};

export default function CardHeader({ profile }: CardHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <p className="text-[9px] tracking-[0.12em] text-neutral-600 sm:text-[10px]">
        {profile.email}
      </p>
      <div className="flex flex-col items-end gap-1 text-right">
        <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-neutral-800 sm:text-[10px]">
          {profile.name}
        </span>
        <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-500 sm:text-[10px]">
          {profile.role}
        </span>
      </div>
    </div>
  );
}
