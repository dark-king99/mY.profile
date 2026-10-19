import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/portfolio";

export const Footer = () => {
  return (
    <footer className="no-print border-t border-border bg-[hsl(var(--surface-1))]">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
        <div className="text-center sm:text-left">
          <p className="font-display text-sm font-semibold">{profile.name}</p>
          <p className="font-mono text-xs text-muted-foreground">
            {profile.title}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            data-testid="footer-email-link"
            className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Mail size={18} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            data-testid="footer-linkedin-link"
            className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Linkedin size={18} />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            data-testid="footer-github-link"
            className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Github size={18} />
          </a>
        </div>
        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} · Built with care ·{" "}
          <Link to="/messages" className="hover:text-primary" data-testid="footer-messages-link">
            Inbox
          </Link>
        </p>
      </div>
    </footer>
  );
};
