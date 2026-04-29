import { StudentPortfolio } from "@/types/portfolio";

export const mockPortfolios: StudentPortfolio[] = [
  {
    id: "p1",
    username: "sarah-dev",
    fullName: "Sarah Thompson",
    title: "Frontend Developer",
    bio: "I build accessible, fast, and delightful web interfaces using React and modern CSS tooling. I enjoy turning complex UX ideas into clean production-ready experiences.",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80",
    skills: [
      { id: "s1", name: "React", level: "Advanced", category: "Frontend" },
      { id: "s2", name: "Next.js", level: "Advanced", category: "Frontend" },
      { id: "s3", name: "TypeScript", level: "Advanced", category: "Frontend" },
      { id: "s4", name: "Tailwind CSS", level: "Intermediate", category: "Frontend" },
      { id: "s5", name: "Jest", level: "Intermediate", category: "Testing" }
    ],
    projects: [
      {
        id: "pr1",
        title: "Campus Event Hub",
        description:
          "A Next.js platform for students to discover and register for campus events with role-based dashboards.",
        techStack: ["Next.js", "TypeScript", "Tailwind", "Supabase"],
        githubUrl: "https://github.com/sarah/campus-event-hub",
        liveUrl: "https://campus-event-hub.vercel.app"
      },
      {
        id: "pr2",
        title: "FocusFlow",
        description:
          "Productivity tracker with Kanban tasks, pomodoro timers, and progress analytics.",
        techStack: ["React", "Vite", "Framer Motion", "Firebase"],
        githubUrl: "https://github.com/sarah/focus-flow",
        liveUrl: "https://focus-flow.app"
      }
    ],
    socialLinks: [
      { platform: "GitHub", url: "https://github.com/sarah-dev" },
      { platform: "LinkedIn", url: "https://linkedin.com/in/sarah-dev" },
      { platform: "Twitter", url: "https://twitter.com/sarah_dev" },
      { platform: "Email", url: "mailto:sarah.dev@example.com" }
    ],
    createdAt: "2026-04-10T10:00:00.000Z",
    updatedAt: "2026-04-18T12:30:00.000Z"
  },
  {
    id: "p2",
    username: "omar-data",
    fullName: "Omar Hassan",
    title: "Data Science Student",
    bio: "I use data to solve practical problems, from predictive modeling to dashboard storytelling. Currently focused on machine learning and MLOps foundations.",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80",
    skills: [
      { id: "s6", name: "Python", level: "Advanced", category: "Data Science" },
      { id: "s7", name: "Pandas", level: "Advanced", category: "Data Science" },
      { id: "s8", name: "scikit-learn", level: "Intermediate", category: "Machine Learning" },
      { id: "s9", name: "SQL", level: "Intermediate", category: "Backend" },
      { id: "s10", name: "Docker", level: "Beginner", category: "DevOps" }
    ],
    projects: [
      {
        id: "pr3",
        title: "Student Success Predictor",
        description:
          "Classification model predicting course completion risk and surfacing insights for advisors.",
        techStack: ["Python", "scikit-learn", "Pandas", "Plotly"],
        githubUrl: "https://github.com/omar-data/student-success-predictor"
      },
      {
        id: "pr4",
        title: "City Air Quality Dashboard",
        description:
          "Interactive dashboard visualizing AQI trends and pollutant breakdown by district.",
        techStack: ["Streamlit", "Python", "NumPy", "Seaborn"],
        githubUrl: "https://github.com/omar-data/air-quality-dashboard",
        liveUrl: "https://air-quality-dashboard.streamlit.app"
      }
    ],
    socialLinks: [
      { platform: "GitHub", url: "https://github.com/omar-data" },
      { platform: "LinkedIn", url: "https://linkedin.com/in/omar-data" },
      { platform: "Portfolio", url: "https://omar-data.dev" },
      { platform: "Email", url: "mailto:omar.data@example.com" }
    ],
    createdAt: "2026-03-22T09:45:00.000Z",
    updatedAt: "2026-04-20T08:15:00.000Z"
  }
];
