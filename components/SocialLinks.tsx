import { AtSign, Briefcase, GitBranch, Globe, Mail } from "lucide-react";
import { SocialLink } from "@/types/portfolio";

interface SocialLinksProps {
  links: SocialLink[];
  dark?: boolean;
}

const iconMap = {
  GitHub: GitBranch,
  LinkedIn: Briefcase,
  Twitter: AtSign,
  Portfolio: Globe,
  Email: Mail
};

export default function SocialLinks({ links, dark = false }: SocialLinksProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {links.map((link) => {
        const Icon = iconMap[link.platform];
        return (
          <a
            key={`${link.platform}-${link.url}`}
            href={link.url}
            target={link.url.startsWith("mailto:") ? undefined : "_blank"}
            rel={link.url.startsWith("mailto:") ? undefined : "noreferrer"}
            className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition duration-200 hover:-translate-y-0.5 ${
              dark
                ? "bg-slate-800/90 text-slate-200 ring-1 ring-slate-700 hover:bg-slate-700 hover:ring-brand/50"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <Icon size={14} />
            {link.platform}
          </a>
        );
      })}
    </div>
  );
}
