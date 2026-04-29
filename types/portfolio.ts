export interface Skill {
  id: string;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
}

export interface SocialLink {
  platform: "GitHub" | "LinkedIn" | "Twitter" | "Portfolio" | "Email";
  url: string;
}

export interface StudentPortfolio {
  id: string;
  username: string;
  fullName: string;
  title: string;
  bio: string;
  avatarUrl?: string;
  skills: Skill[];
  projects: Project[];
  socialLinks: SocialLink[];
  createdAt: string;
  updatedAt: string;
}
