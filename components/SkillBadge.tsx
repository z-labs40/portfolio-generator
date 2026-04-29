import { X } from "lucide-react";
import clsx from "clsx";
import { Skill } from "@/types/portfolio";

interface SkillBadgeProps {
  skill: Skill;
  onRemove?: () => void;
  dark?: boolean;
}

const levelStyles: Record<Skill["level"], string> = {
  Beginner: "bg-blue-100 text-blue-700 border-blue-200",
  Intermediate: "bg-amber-100 text-amber-700 border-amber-200",
  Advanced: "bg-emerald-100 text-emerald-700 border-emerald-200"
};

const darkLevelStyles: Record<Skill["level"], string> = {
  Beginner: "bg-blue-500/15 text-blue-200 border-blue-400/30",
  Intermediate: "bg-amber-500/15 text-amber-200 border-amber-400/30",
  Advanced: "bg-emerald-500/15 text-emerald-200 border-emerald-400/30"
};

export default function SkillBadge({ skill, onRemove, dark = false }: SkillBadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium transition duration-200 hover:-translate-y-0.5",
        dark ? darkLevelStyles[skill.level] : levelStyles[skill.level]
      )}
    >
      {skill.name} ({skill.level})
      {onRemove ? (
        <button
          type="button"
          onClick={onRemove}
          className="rounded-full p-0.5 transition hover:bg-black/10"
          aria-label={`Remove ${skill.name}`}
        >
          <X size={12} />
        </button>
      ) : null}
    </span>
  );
}
