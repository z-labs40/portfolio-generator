"use client";

import { useEffect, useMemo, useState } from "react";
import { BriefcaseBusiness, Copy, CopyCheck, Sparkles, Wrench } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import SkillBadge from "@/components/SkillBadge";
import SocialLinks from "@/components/SocialLinks";
import { mockPortfolios } from "@/lib/mockData";
import { StudentPortfolio } from "@/types/portfolio";

interface PortfolioPageProps {
  params: {
    username: string;
  };
}

export default function PortfolioPage({ params }: PortfolioPageProps) {
  const [savedPortfolio, setSavedPortfolio] = useState<StudentPortfolio | null>(null);

  useEffect(() => {
    const rawSaved = localStorage.getItem("student-portfolios");
    if (!rawSaved) return;

    const savedPortfolios = JSON.parse(rawSaved) as StudentPortfolio[];
    const match = savedPortfolios.find(
      (entry) => entry.username.toLowerCase() === params.username.toLowerCase()
    );
    setSavedPortfolio(match || null);
  }, [params.username]);

  // TODO: Replace with API call -> GET /api/portfolios/:username
  const portfolio =
    savedPortfolio ||
    mockPortfolios.find(
      (entry) => entry.username.toLowerCase() === params.username.toLowerCase()
    );
  const [copied, setCopied] = useState(false);

  const groupedSkills = useMemo(() => {
    if (!portfolio) return {};
    return portfolio.skills.reduce<Record<string, typeof portfolio.skills>>(
      (acc, skill) => {
        const list = acc[skill.category] || [];
        list.push(skill);
        acc[skill.category] = list;
        return acc;
      },
      {}
    );
  }, [portfolio]);
  const totalSkills = portfolio?.skills.length || 0;
  const totalProjects = portfolio?.projects.length || 0;

  if (!portfolio) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_#1e293b_0%,_#0b1021_45%,_#050816_100%)] px-6 text-center text-white">
        <div className="max-w-xl">
          <h1 className="font-sora text-4xl font-bold">Portfolio Not Found</h1>
          <p className="mt-4 text-slate-300">
            We could not find a portfolio for username &quot;{params.username}&quot;.
          </p>
        </div>
      </main>
    );
  }

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_#312e81_0%,_#1e1b4b_26%,_#0f172a_55%,_#020617_100%)] text-slate-100">
      <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-fuchsia-500/15 blur-3xl" />

      <section className="relative mx-auto max-w-6xl px-6 py-14">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-300/20 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-100">
            <Sparkles size={14} />
            Live Portfolio
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-100">
            <Wrench size={14} />
            {totalSkills} Skills
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-fuchsia-300/20 bg-fuchsia-500/10 px-3 py-1 text-xs font-medium text-fuchsia-100">
            <BriefcaseBusiness size={14} />
            {totalProjects} Projects
          </span>
        </div>

        <div className="mb-12 flex flex-col justify-between gap-6 rounded-3xl border border-slate-600/80 bg-slate-900/45 p-8 shadow-2xl shadow-black/20 backdrop-blur md:flex-row md:items-center">
          <div className="flex items-center gap-5">
            {portfolio.avatarUrl ? (
              <img
                src={portfolio.avatarUrl}
                alt={portfolio.fullName}
                className="h-20 w-20 rounded-full object-cover ring-2 ring-white/20"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-700 text-2xl font-bold ring-2 ring-white/20">
                {portfolio.fullName.slice(0, 1)}
              </div>
            )}
            <div>
              <h1 className="font-sora text-3xl font-bold">{portfolio.fullName}</h1>
              <p className="text-accent">{portfolio.title}</p>
              <p className="mt-1 text-sm text-slate-300">@{portfolio.username}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={copyLink}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-500 bg-slate-800/70 px-4 py-2 text-sm transition duration-200 hover:-translate-y-0.5 hover:border-brand/60 hover:bg-slate-700"
          >
            {copied ? <CopyCheck size={16} /> : <Copy size={16} />}
            {copied ? "Link Copied" : "Copy Portfolio Link"}
          </button>
        </div>

        <section className="mb-12 rounded-3xl border border-slate-700/70 bg-slate-900/35 p-7 backdrop-blur-sm">
          <h2 className="mb-3 font-sora text-2xl font-semibold">About</h2>
          <p className="max-w-3xl leading-7 text-slate-300">{portfolio.bio}</p>
        </section>

        <section className="mb-12 rounded-3xl border border-slate-700/70 bg-slate-900/35 p-7 backdrop-blur-sm">
          <h2 className="mb-4 font-sora text-2xl font-semibold">Skills</h2>
          <div className="space-y-4">
            {Object.entries(groupedSkills).map(([category, skills]) => (
              <div key={category}>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-400">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <SkillBadge key={skill.id} skill={skill} dark />
                  ))}
                </div>
              </div>
            ))}
            {!totalSkills ? (
              <p className="text-sm text-slate-400">
                No skills added yet. Add skills in dashboard edit to make this section pop.
              </p>
            ) : null}
          </div>
        </section>

        <section className="mb-12 rounded-3xl border border-slate-700/70 bg-slate-900/35 p-7 backdrop-blur-sm">
          <h2 className="mb-4 font-sora text-2xl font-semibold">Projects</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {portfolio.projects.map((project) => (
              <ProjectCard key={project.id} project={project} variant="dark" />
            ))}
          </div>
          {!totalProjects ? (
            <p className="mt-2 text-sm text-slate-400">
              No projects added yet. Add at least one project to make your portfolio more engaging.
            </p>
          ) : null}
        </section>

        <section className="rounded-3xl border border-slate-700/70 bg-slate-900/35 p-7 backdrop-blur-sm">
          <h2 className="mb-4 font-sora text-2xl font-semibold">Contact</h2>
          <SocialLinks links={portfolio.socialLinks} dark />
        </section>
      </section>
    </main>
  );
}
