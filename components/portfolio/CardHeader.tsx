import type { Profile } from "@/types/profile";

type CardHeaderProps = {
  profile: Profile;
  isFlipped: boolean;
  onFlip: () => void;
};

export default function CardHeader({ profile, isFlipped, onFlip }: CardHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <p className="text-[9px] tracking-[0.12em] text-neutral-600 sm:text-[10px]">
        {profile.email}
      </p>
      <div className="flex flex-col items-end gap-1 text-right">
        <button
          type="button"
          onClick={onFlip}
          className="mt-1 cursor-pointer border-b border-neutral-950/30 pb-0.5 text-[8px] uppercase tracking-[0.2em] text-neutral-700 transition-colors hover:border-neutral-950 hover:text-neutral-950 sm:text-[9px]"
        >
          {isFlipped ? "Volver" : "Contacto"}
        </button>
      </div>
    </div>
  );
}
