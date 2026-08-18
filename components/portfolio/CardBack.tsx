import type { FormEvent } from "react";

import type { Profile } from "@/types/profile";

type CardBackProps = {
  profile: Profile;
  onBack: () => void;
};

const inputClass =
  "w-full border-b border-neutral-900/15 bg-transparent py-2 text-sm text-neutral-950 placeholder:text-neutral-400 focus:border-neutral-950 focus:outline-none";

export default function CardBack({ profile, onBack }: CardBackProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = String(data.get("nombre") ?? "");
    const body = [
      `Nombre: ${data.get("nombre")}`,
      "",
      `${data.get("mensaje")}`,
    ].join("\n");
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <div className="flex h-full w-full flex-col justify-between gap-6 p-6 sm:p-8 lg:p-10">
      <div className="flex items-start justify-between gap-4">
        <p className="text-[9px] tracking-[0.12em] text-neutral-600 sm:text-[10px]">
          {profile.email}
        </p>
        <button
          type="button"
          onClick={onBack}
          className="cursor-pointer text-[9px] font-medium uppercase tracking-[0.2em] text-neutral-800 transition-colors hover:text-neutral-950 sm:text-[10px]"
        >
          Volver
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="text-[22px] font-semibold uppercase leading-none tracking-[0.08em] text-neutral-950 sm:text-2xl">
            Contacto
          </h2>
          <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-500 sm:text-[10px]">
            Escríbeme y te responderé
          </p>
        </div>

        <label className="flex flex-col gap-1">
          <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-500 sm:text-[10px]">
            Nombre
          </span>
          <input
            type="text"
            name="nombre"
            required
            placeholder="Tu nombre"
            className={inputClass}
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-500 sm:text-[10px]">
            Mensaje
          </span>
          <textarea
            name="mensaje"
            required
            rows={3}
            placeholder="Cuéntame sobre tu proyecto..."
            className={`${inputClass} resize-none`}
          />
        </label>

        <button
          type="submit"
          className="mt-2 w-full cursor-pointer border border-neutral-950 bg-neutral-950 px-4 py-3 text-[10px] font-medium uppercase tracking-[0.25em] text-white transition-colors hover:bg-neutral-800 sm:text-[11px]"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
