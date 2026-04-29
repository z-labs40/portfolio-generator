import { ExternalLink, GitBranch, Trash2 } from "lucide-react";
import { Project } from "@/types/portfolio";

interface ProjectCardProps {
  project: Project;
  onRemove?: () => void;
  variant?: "light" | "dark";
}

export default function ProjectCard({
  project,
  onRemove,
  variant = "light"
}: ProjectCardProps) {
  const isDark = variant === "dark";

  return (
    <article
      className={`group rounded-2xl border p-5 transition duration-300 hover:-translate-y-1 ${
        isDark
          ? "border-slate-600/80 bg-slate-900/50 shadow-lg shadow-black/20 hover:border-brand/60 hover:bg-slate-900/70"
          : "border-slate-200 bg-white shadow-sm hover:shadow-lg"
      }`}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <h3 className={`font-sora text-lg font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
          {project.title}
        </h3>
        {onRemove ? (
          <button
            type="button"
            onClick={onRemove}
            className={`rounded-lg p-2 transition ${
              isDark
                ? "text-slate-400 hover:bg-red-500/10 hover:text-red-300"
                : "text-slate-500 hover:bg-red-50 hover:text-red-600"
            }`}
            aria-label={`Remove ${project.title}`}
          >
            <Trash2 size={16} />
          </button>
        ) : null}
      </div>

      <p className={`mb-4 text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}>
        {project.description}
      </p>

      <div className="mb-4 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className={`rounded-md px-2 py-1 text-xs font-medium ${
              isDark
                ? "bg-slate-800 text-slate-200 ring-1 ring-slate-700"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4 text-sm">
        {project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-brand transition hover:translate-x-0.5 hover:text-indigo-400"
          >
            <GitBranch size={14} />
            GitHub
          </a>
        ) : null}
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-accent transition hover:translate-x-0.5 hover:text-cyan-300"
          >
            <ExternalLink size={14} />
            Live Demo
          </a>
        ) : null}
      </div>
    </article>
  );
}
