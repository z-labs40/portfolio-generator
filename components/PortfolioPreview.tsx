import ProjectCard from "@/components/ProjectCard";
import SkillBadge from "@/components/SkillBadge";
import SocialLinks from "@/components/SocialLinks";
import { StudentPortfolio } from "@/types/portfolio";

interface PortfolioPreviewProps {
  portfolio: Partial<StudentPortfolio>;
}

export default function PortfolioPreview({ portfolio }: PortfolioPreviewProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-4">
        {portfolio.avatarUrl ? (
          <img
            src={portfolio.avatarUrl}
            alt={portfolio.fullName || "Avatar"}
            className="h-16 w-16 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 text-lg font-semibold text-slate-600">
            {(portfolio.fullName || "S").slice(0, 1)}
          </div>
        )}
        <div>
          <h3 className="font-sora text-xl font-semibold text-slate-900">
            {portfolio.fullName || "Your Name"}
          </h3>
          <p className="text-slate-600">{portfolio.title || "Your Title"}</p>
        </div>
      </div>

      <p className="mb-6 text-sm text-slate-700">
        {portfolio.bio || "Your portfolio bio preview will appear here."}
      </p>

      <section className="mb-6">
        <h4 className="mb-2 font-sora text-sm font-semibold text-slate-900">
          Skills
        </h4>
        <div className="flex flex-wrap gap-2">
          {(portfolio.skills || []).map((skill) => (
            <SkillBadge key={skill.id} skill={skill} />
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h4 className="mb-2 font-sora text-sm font-semibold text-slate-900">
          Projects
        </h4>
        <div className="grid gap-3 md:grid-cols-2">
          {(portfolio.projects || []).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section>
        <h4 className="mb-2 font-sora text-sm font-semibold text-slate-900">
          Contact
        </h4>
        <SocialLinks links={portfolio.socialLinks || []} />
      </section>
    </div>
  );
}
