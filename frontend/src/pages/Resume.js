import { Link } from "react-router-dom";
import {
  Printer,
  Download,
  ArrowLeft,
  Mail,
  Linkedin,
  Github,
  MapPin,
  CheckCircle2,
  Clock,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ThemeToggle } from "@/components/ThemeToggle";
import { resumePdfUrl } from "@/lib/api";
import {
  profile,
  summary,
  skillGroups,
  experience,
  projects,
  certifications,
} from "@/data/portfolio";

const ResumeSection = ({ title, children }) => (
  <div className="avoid-break">
    <h2 className="font-display text-sm font-semibold uppercase tracking-[0.15em] text-primary print-text-black">
      {title}
    </h2>
    <Separator className="my-3" />
    {children}
  </div>
);

const Resume = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Toolbar */}
      <div className="no-print sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-4 py-3 sm:px-6">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="resume-back-button">
              <ArrowLeft size={16} /> Back to Portfolio
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => window.print()}
              data-testid="resume-print-button"
            >
              <Printer size={15} /> Print
            </Button>
            <a href={resumePdfUrl} data-testid="resume-download-button">
              <Button size="sm" className="gap-2">
                <Download size={15} /> Download PDF
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Resume sheet */}
      <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="print-container rounded-xl border border-border bg-card p-6 shadow-[0_12px_40px_rgba(0,0,0,0.35)] sm:p-10">
          {/* Header */}

          <header className="avoid-break flex items-start justify-between gap-5">
            <div className="min-w-0">
              <h1 className="font-display text-3xl font-semibold tracking-tight print-text-black sm:text-4xl">
                {profile.name}
              </h1>
              <p className="mt-1 font-display text-base text-primary print-text-black">
                {profile.title}
              </p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-muted-foreground print-text-black">
                <a href={`mailto:${profile.email}`} className="flex items-center gap-1.5 hover:text-primary">
                  <Mail size={13} /> {profile.email}
                </a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-primary">
                  <Linkedin size={13} /> LinkedIn
                </a>
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-primary">
                  <Github size={13} /> GitHub
                </a>
                <span className="flex items-center gap-1.5">
                  <MapPin size={13} /> {profile.location}
                </span>
              </div>
            </div>

            {/* Passport photo */}
            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="button"
                  data-testid="resume-photo-button"
                  aria-label="View photo of Enoch Derek Doeblah"
                  className="group relative h-28 w-[84px] shrink-0 overflow-hidden rounded-md ring-1 ring-border transition-all hover:ring-2 hover:ring-primary/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:h-32 sm:w-24"
                >
                  <img
                    src="/me/enoch-headshot.jpg"
                    alt={profile.name}
                    className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  />
                </button>
              </DialogTrigger>
              <DialogContent
                className="max-w-sm overflow-hidden border-border bg-card p-0"
                data-testid="resume-photo-dialog"
              >
                <img
                  src="/me/enoch-headshot.jpg"
                  alt={profile.name}
                  className="max-h-[70vh] w-full object-cover"
                />
                <div className="p-4">
                  <DialogTitle className="font-display text-base font-semibold">
                    {profile.name}
                  </DialogTitle>
                  <DialogDescription className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {profile.title}
                  </DialogDescription>
                </div>
              </DialogContent>
            </Dialog>
          </header>

          <div className="my-6 h-0.5 w-full rounded bg-primary/40" />

          <div className="space-y-7">
            <ResumeSection title="Professional Summary">
              <p className="text-sm leading-relaxed text-muted-foreground print-text-black">
                {summary}
              </p>
            </ResumeSection>

            <ResumeSection title="Skills">
              <div className="grid gap-3 sm:grid-cols-2">
                {skillGroups.map((g) => (
                  <div key={g.category} className="avoid-break">
                    <p className="text-sm font-semibold print-text-black">
                      {g.category}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground print-text-black">
                      {g.skills.join(" · ")}
                    </p>
                  </div>
                ))}
              </div>
            </ResumeSection>

            <ResumeSection title="Experience">
              <div className="space-y-4">
                {experience.map((job, i) => (
                  <div key={i} className="avoid-break">
                    <div className="flex flex-wrap items-baseline justify-between gap-1">
                      <p className="text-sm font-semibold print-text-black">
                        {job.role} — {job.company}
                      </p>
                      <span className="font-mono text-xs text-muted-foreground print-text-black">
                        {job.period}
                      </span>
                    </div>
                    <ul className="mt-2 space-y-1.5">
                      {job.points.map((pt, j) => (
                        <li key={j} className="flex gap-2 text-sm text-muted-foreground print-text-black">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </ResumeSection>

            <ResumeSection title="Projects">
              <div className="space-y-4">
                {projects.map((proj) => (
                  <div key={proj.id} className="avoid-break">
                    <div className="flex flex-wrap items-baseline justify-between gap-1">
                      <p className="text-sm font-semibold print-text-black">
                        {proj.name}
                      </p>
                      <span className="font-mono text-xs text-muted-foreground print-text-black">
                        {proj.status}
                        {proj.live ? " · digitalliberia.com" : ""}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground print-text-black">
                      {proj.details}
                    </p>
                    <p className="mt-1.5 font-mono text-xs text-muted-foreground print-text-black">
                      {proj.tech.join(" · ")}
                    </p>
                  </div>
                ))}
              </div>
            </ResumeSection>

            <ResumeSection title="Certifications">
              <div className="space-y-2">
                {certifications.map((c) => {
                  const done = c.status === "Completed";
                  return (
                    <div
                      key={c.name}
                      className="avoid-break flex items-center justify-between gap-2"
                    >
                      <span className="flex items-center gap-2 text-sm print-text-black">
                        {done ? (
                          <CheckCircle2 size={15} className="text-primary" />
                        ) : (
                          <Clock size={15} className="text-[hsl(38_90%_60%)]" />
                        )}
                        <span>
                          {c.name}
                          {c.issuer && (
                            <span className="text-muted-foreground print-text-black">
                              {" "}
                              — {c.issuer}
                              {c.date ? ` (${c.date})` : ""}
                            </span>
                          )}
                        </span>
                      </span>
                      <span className="flex items-center gap-2">
                        {c.file && (
                          <a
                            href={c.file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="no-print inline-flex items-center gap-1 text-xs text-primary hover:underline"
                          >
                            <FileText size={12} /> View
                          </a>
                        )}
                        <Badge
                          variant="outline"
                          className="font-mono text-[10px] text-muted-foreground print-text-black"
                        >
                          {c.status}
                        </Badge>
                      </span>
                    </div>
                  );
                })}
              </div>
            </ResumeSection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
