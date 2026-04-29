"use client";

import { useMemo, useReducer, useState } from "react";
import { useRouter } from "next/navigation";
import PortfolioPreview from "@/components/PortfolioPreview";
import ProjectCard from "@/components/ProjectCard";
import SkillBadge from "@/components/SkillBadge";
import { Project, Skill, SocialLink, StudentPortfolio } from "@/types/portfolio";

type PortfolioFormState = Partial<StudentPortfolio>;

type Action =
  | { type: "SET_FIELD"; field: keyof PortfolioFormState; value: string }
  | { type: "ADD_SKILL"; payload: Skill }
  | { type: "REMOVE_SKILL"; id: string }
  | { type: "ADD_PROJECT"; payload: Project }
  | { type: "REMOVE_PROJECT"; id: string }
  | { type: "SET_SOCIAL_LINKS"; payload: SocialLink[] };

const steps = [
  "Basic Info",
  "Skills",
  "Projects",
  "Social Links",
  "Preview & Save"
];

const initialState: PortfolioFormState = {
  fullName: "",
  username: "",
  title: "",
  bio: "",
  avatarUrl: "",
  skills: [],
  projects: [],
  socialLinks: []
};

function reducer(state: PortfolioFormState, action: Action): PortfolioFormState {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "ADD_SKILL":
      return { ...state, skills: [...(state.skills || []), action.payload] };
    case "REMOVE_SKILL":
      return {
        ...state,
        skills: (state.skills || []).filter((skill) => skill.id !== action.id)
      };
    case "ADD_PROJECT":
      return { ...state, projects: [...(state.projects || []), action.payload] };
    case "REMOVE_PROJECT":
      return {
        ...state,
        projects: (state.projects || []).filter(
          (project) => project.id !== action.id
        )
      };
    case "SET_SOCIAL_LINKS":
      return { ...state, socialLinks: action.payload };
    default:
      return state;
  }
}

function inputClassName() {
  return "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";
}

export default function PortfolioForm() {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [step, setStep] = useState(1);
  const [saveError, setSaveError] = useState("");
  const [skillDraft, setSkillDraft] = useState({
    name: "",
    level: "Beginner" as Skill["level"],
    category: "Frontend"
  });
  const [projectDraft, setProjectDraft] = useState({
    title: "",
    description: "",
    techStack: "",
    githubUrl: "",
    liveUrl: ""
  });
  const [socialDraft, setSocialDraft] = useState<Record<SocialLink["platform"], string>>({
    GitHub: "",
    LinkedIn: "",
    Twitter: "",
    Portfolio: "",
    Email: ""
  });

  const progress = useMemo(() => (step / steps.length) * 100, [step]);

  const addSkill = () => {
    if (!skillDraft.name.trim()) return;
    dispatch({
      type: "ADD_SKILL",
      payload: {
        id: crypto.randomUUID(),
        name: skillDraft.name.trim(),
        level: skillDraft.level,
        category: skillDraft.category.trim()
      }
    });
    setSkillDraft({ ...skillDraft, name: "" });
  };

  const addProject = () => {
    if (!projectDraft.title.trim() || !projectDraft.description.trim()) return;
    dispatch({
      type: "ADD_PROJECT",
      payload: {
        id: crypto.randomUUID(),
        title: projectDraft.title.trim(),
        description: projectDraft.description.trim(),
        techStack: projectDraft.techStack
          .split(",")
          .map((tech) => tech.trim())
          .filter(Boolean),
        githubUrl: projectDraft.githubUrl.trim() || undefined,
        liveUrl: projectDraft.liveUrl.trim() || undefined
      }
    });
    setProjectDraft({
      title: "",
      description: "",
      techStack: "",
      githubUrl: "",
      liveUrl: ""
    });
  };

  const syncSocialLinks = () => {
    const links: SocialLink[] = (Object.keys(socialDraft) as SocialLink["platform"][])
      .filter((platform) => socialDraft[platform].trim())
      .map((platform) => ({ platform, url: socialDraft[platform].trim() }));
    dispatch({ type: "SET_SOCIAL_LINKS", payload: links });
  };

  const savePortfolio = () => {
    const username = (state.username || "").trim().toLowerCase();
    if (!username) {
      setSaveError("Username is required before saving.");
      return;
    }

    const usernamePattern = /^[a-z0-9-]+$/;
    if (!usernamePattern.test(username)) {
      setSaveError("Username can only contain lowercase letters, numbers, and hyphens.");
      return;
    }

    setSaveError("");
    const now = new Date().toISOString();
    const portfolioPayload: StudentPortfolio = {
      id: state.id || crypto.randomUUID(),
      username,
      fullName: state.fullName?.trim() || "Unnamed Student",
      title: state.title?.trim() || "Student Developer",
      bio: state.bio?.trim() || "",
      avatarUrl: state.avatarUrl?.trim() || undefined,
      skills: state.skills || [],
      projects: state.projects || [],
      socialLinks: state.socialLinks || [],
      createdAt: state.createdAt || now,
      updatedAt: now
    };

    // TODO: Replace with API call -> POST /api/portfolios
    const rawSaved = localStorage.getItem("student-portfolios");
    const savedPortfolios = rawSaved ? (JSON.parse(rawSaved) as StudentPortfolio[]) : [];
    const existingIndex = savedPortfolios.findIndex(
      (portfolio) => portfolio.username === username
    );

    if (existingIndex >= 0) {
      savedPortfolios[existingIndex] = portfolioPayload;
    } else {
      savedPortfolios.push(portfolioPayload);
    }

    localStorage.setItem("student-portfolios", JSON.stringify(savedPortfolios));
    router.push(`/portfolio/${username}`);
  };

  return (
    <div className="space-y-6 rounded-2xl bg-white p-6 shadow-sm">
      <div>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="font-sora text-xl font-semibold text-slate-900">
            Portfolio Builder
          </h2>
          <span className="text-sm text-slate-500">
            Step {step} of {steps.length}
          </span>
        </div>
        <div className="mb-4 h-2 rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-brand transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 md:grid-cols-5">
          {steps.map((label, index) => (
            <span
              key={label}
              className={index + 1 === step ? "font-semibold text-brand" : ""}
            >
              {index + 1}. {label}
            </span>
          ))}
        </div>
      </div>

      {step === 1 ? (
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-1">
            <span className="text-sm text-slate-600">Full Name</span>
            <input
              className={inputClassName()}
              value={state.fullName || ""}
              onChange={(e) =>
                dispatch({ type: "SET_FIELD", field: "fullName", value: e.target.value })
              }
            />
          </label>
          <label className="space-y-1">
            <span className="text-sm text-slate-600">Username (slug)</span>
            <input
              className={inputClassName()}
              value={state.username || ""}
              onChange={(e) =>
                dispatch({ type: "SET_FIELD", field: "username", value: e.target.value })
              }
            />
          </label>
          <label className="space-y-1">
            <span className="text-sm text-slate-600">Title</span>
            <input
              className={inputClassName()}
              value={state.title || ""}
              onChange={(e) =>
                dispatch({ type: "SET_FIELD", field: "title", value: e.target.value })
              }
            />
          </label>
          <label className="space-y-1">
            <span className="text-sm text-slate-600">Avatar URL</span>
            <input
              className={inputClassName()}
              value={state.avatarUrl || ""}
              onChange={(e) =>
                dispatch({ type: "SET_FIELD", field: "avatarUrl", value: e.target.value })
              }
            />
          </label>
          <label className="space-y-1 md:col-span-2">
            <span className="text-sm text-slate-600">Bio</span>
            <textarea
              className={inputClassName()}
              rows={4}
              value={state.bio || ""}
              onChange={(e) =>
                dispatch({ type: "SET_FIELD", field: "bio", value: e.target.value })
              }
            />
          </label>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="space-y-4">
          <div className="grid gap-3 md:grid-cols-4">
            <input
              className={inputClassName()}
              placeholder="Skill name"
              value={skillDraft.name}
              onChange={(e) => setSkillDraft({ ...skillDraft, name: e.target.value })}
            />
            <select
              className={inputClassName()}
              value={skillDraft.level}
              onChange={(e) =>
                setSkillDraft({ ...skillDraft, level: e.target.value as Skill["level"] })
              }
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
            <input
              className={inputClassName()}
              placeholder="Category (e.g. Frontend)"
              value={skillDraft.category}
              onChange={(e) =>
                setSkillDraft({ ...skillDraft, category: e.target.value })
              }
            />
            <button
              type="button"
              onClick={addSkill}
              className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
            >
              Add Skill
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {(state.skills || []).map((skill) => (
              <SkillBadge
                key={skill.id}
                skill={skill}
                onRemove={() => dispatch({ type: "REMOVE_SKILL", id: skill.id })}
              />
            ))}
          </div>
        </div>
      ) : null}

      {step === 3 ? (
        <div className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            <input
              className={inputClassName()}
              placeholder="Project title"
              value={projectDraft.title}
              onChange={(e) =>
                setProjectDraft({ ...projectDraft, title: e.target.value })
              }
            />
            <input
              className={inputClassName()}
              placeholder="Tech stack (comma-separated)"
              value={projectDraft.techStack}
              onChange={(e) =>
                setProjectDraft({ ...projectDraft, techStack: e.target.value })
              }
            />
            <textarea
              className={inputClassName()}
              placeholder="Project description"
              rows={3}
              value={projectDraft.description}
              onChange={(e) =>
                setProjectDraft({ ...projectDraft, description: e.target.value })
              }
            />
            <div className="space-y-3">
              <input
                className={inputClassName()}
                placeholder="GitHub URL"
                value={projectDraft.githubUrl}
                onChange={(e) =>
                  setProjectDraft({ ...projectDraft, githubUrl: e.target.value })
                }
              />
              <input
                className={inputClassName()}
                placeholder="Live URL"
                value={projectDraft.liveUrl}
                onChange={(e) =>
                  setProjectDraft({ ...projectDraft, liveUrl: e.target.value })
                }
              />
              <button
                type="button"
                onClick={addProject}
                className="w-full rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
              >
                Add Project
              </button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {(state.projects || []).map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onRemove={() => dispatch({ type: "REMOVE_PROJECT", id: project.id })}
              />
            ))}
          </div>
        </div>
      ) : null}

      {step === 4 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {(Object.keys(socialDraft) as SocialLink["platform"][]).map((platform) => (
            <label key={platform} className="space-y-1">
              <span className="text-sm text-slate-600">{platform}</span>
              <input
                className={inputClassName()}
                placeholder={`${platform} URL`}
                value={socialDraft[platform]}
                onChange={(e) =>
                  setSocialDraft({ ...socialDraft, [platform]: e.target.value })
                }
                onBlur={syncSocialLinks}
              />
            </label>
          ))}
        </div>
      ) : null}

      {step === 5 ? <PortfolioPreview portfolio={state} /> : null}

      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={() => setStep((value) => Math.max(1, value - 1))}
          disabled={step === 1}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Back
        </button>

        {step < steps.length ? (
          <button
            type="button"
            onClick={() => {
              if (step === 4) syncSocialLinks();
              setStep((value) => Math.min(steps.length, value + 1));
            }}
            className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            onClick={savePortfolio}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-cyan-300"
          >
            Save Portfolio
          </button>
        )}
      </div>
      {saveError ? (
        <p className="text-sm font-medium text-red-600">{saveError}</p>
      ) : null}
    </div>
  );
}
