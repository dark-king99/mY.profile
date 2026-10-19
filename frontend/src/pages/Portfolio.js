import { Link } from "react-router-dom";
import {
  Download,
  ArrowRight,
  MapPin,
  Server,
  Layout,
  Smartphone,
  Container,
  ExternalLink,
  Github,
  CheckCircle2,
  Clock,
  Briefcase,
  Sparkles,
  Eye,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { resumePdfUrl } from "@/lib/api";
import {
  profile,
  stats,
  about,
  skillGroups,
  projects,
  certifications,
  experience,
} from "@/data/portfolio";

const iconMap = { Server, Layout, Smartphone, Container };

const SectionHeader = ({ eyebrow, title, subtitle }) => (
  <div className="mb-10 flex flex-col gap-2">
    <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
      {eyebrow}
    </span>
    <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
      {title}
    </h2>
    {subtitle && (
      <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        {subtitle}
      </p>
    )}
  </div>
);

const Container_ = ({ id, className = "", children }) => (
  <section id={id} className={`mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 ${className}`}>
    {children}
  </section>
);

const Portfolio = () => {
  return (
    <div>
      {/* HERO */}
      <section className="hero-wash relative overflow-hidden">
        <div className="blueprint-grid absolute inset-0 opacity-70" aria-hidden="true" />
        <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-4 py-20 sm:px-6 sm:py-28 md:grid-cols-12 lg:px-8">
          <Reveal className="md:col-span-7">
            <Badge
              variant="outline"
              className="mb-5 gap-1.5 border-primary/30 bg-primary/10 font-mono text-xs text-primary"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              {profile.availability}
            </Badge>
            <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              {profile.name}
            </h1>
            <p className="mt-4 font-display text-lg text-primary sm:text-xl">
              {profile.title}
            </p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              {profile.shortIntro}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#contact" data-testid="hero-contact-button">
                <Button size="lg" className="gap-2 active:scale-[0.98]">
                  Hire Me <ArrowRight size={16} />
                </Button>
              </a>
              <Link to="/resume" data-testid="hero-view-resume-button">
                <Button size="lg" variant="outline" className="active:scale-[0.98]">
                  View Resume
                </Button>
              </Link>
              <a href={resumePdfUrl} data-testid="hero-download-pdf-button">
                <Button size="lg" variant="ghost" className="gap-2 active:scale-[0.98]">
                  <Download size={16} /> Download CV
                </Button>
              </a>
            </div>
            <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin size={15} className="text-primary" />
              {profile.location}
            </div>
          </Reveal>

          {/* Ops panel */}
          <Reveal delay={0.15} className="md:col-span-5">
            <div className="rounded-xl border border-border bg-[hsl(var(--surface-1))] p-5 shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  ~/engineer.profile
                </span>
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[hsl(38_90%_60%)]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[hsl(160_60%_50%)]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-4">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-lg border border-border bg-background/50 p-3"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {s.label}
                    </p>
                    <p className="mt-1 font-display text-sm font-semibold">
                      {s.value}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-lg bg-background/50 p-3 font-mono text-xs leading-relaxed text-muted-foreground">
                <span className="text-primary">$</span> whoami
                <br />
                <span className="text-foreground">full-stack engineer + devops</span>
                <br />
                <span className="text-primary">$</span> stack --list
                <br />
                <span className="text-foreground">python · js · docker · k8s · cloud</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ABOUT */}
      <Container_ id="about">
        <Reveal>
          <SectionHeader
            eyebrow="01 · About"
            title="A builder who owns the whole stack"
          />
        </Reveal>
        <div className="grid gap-8 md:grid-cols-12">
          <Reveal className="md:col-span-8" delay={0.05}>
            <div className="space-y-4">
              {about.bio.map((p, i) => (
                <p key={i} className="text-base leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
          <Reveal className="md:col-span-4" delay={0.1}>
            <Card className="border-l-2 border-l-primary/60 bg-[hsl(var(--surface-1))]">
              <CardContent className="space-y-4 p-5">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Currently
                  </p>
                  <p className="mt-1 text-sm">Backend Engineer @ Digital Liberia INC</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Best at
                  </p>
                  <p className="mt-1 text-sm">
                    Python backends, APIs, DevOps automation
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Looking for
                  </p>
                  <p className="mt-1 text-sm">Remote & freelance engineering work</p>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </Container_>

      {/* SKILLS */}
      <div className="border-y border-border bg-[hsl(var(--surface-1))]">
        <Container_ id="skills">
          <Reveal>
            <SectionHeader
              eyebrow="02 · Skills"
              title="Tools I use to ship"
              subtitle="From backend logic and databases to containers and cloud — a practical, full-stack toolkit."
            />
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {skillGroups.map((group, i) => {
              const Icon = iconMap[group.icon] || Server;
              return (
                <Reveal key={group.category} delay={i * 0.06}>
                  <Card className="group h-full bg-background transition-colors duration-200 hover:border-primary/30 hover:-translate-y-0.5 will-change-transform">
                    <CardHeader className="pb-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/12 text-primary ring-1 ring-primary/20 transition-colors group-hover:bg-primary/20">
                        <Icon size={20} />
                      </span>
                      <CardTitle className="pt-3 text-base">{group.category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1.5">
                        {group.skills.map((sk) => (
                          <Badge
                            key={sk}
                            variant="outline"
                            className="rounded-full border-border bg-accent/5 font-mono text-[11px] font-normal text-muted-foreground"
                          >
                            {sk}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </Container_>
      </div>

      {/* PROJECTS */}
      <div className="section-glow">
        <Container_ id="projects">
          <Reveal>
            <SectionHeader
              eyebrow="03 · Projects"
              title="Selected work"
              subtitle="Real products I've engineered — from an enterprise software suite to a live company website."
            />
          </Reveal>
          <div data-testid="projects-grid" className="grid gap-5 md:grid-cols-2">
            {projects.map((proj, i) => (
              <Reveal key={proj.id} delay={i * 0.08}>
                <Card
                  data-testid="project-card"
                  className="group flex h-full flex-col overflow-hidden bg-[hsl(var(--surface-1))] transition-colors duration-200 hover:border-primary/30"
                >
                  <div className="relative h-44 w-full overflow-hidden border-b border-border">
                    <img
                      src={proj.cover}
                      alt={`${proj.name} preview`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                    {proj.logo && (
                      <img
                        src={proj.logo}
                        alt=""
                        className="absolute left-3 top-3 h-9 w-9 rounded-md bg-background/80 p-1 ring-1 ring-border backdrop-blur"
                      />
                    )}
                    <Badge
                      className={`absolute right-3 top-3 shrink-0 font-mono text-[10px] ${
                        proj.status === "Live"
                          ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-[hsl(160_60%_22%)] dark:bg-[hsl(160_60%_12%)] dark:text-[hsl(160_70%_70%)]"
                          : "border-amber-200 bg-amber-50 text-amber-700 dark:border-[hsl(38_70%_22%)] dark:bg-[hsl(38_70%_12%)] dark:text-[hsl(38_90%_70%)]"
                      }`}
                    >
                      {proj.status}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="font-display text-xl">
                      {proj.name}
                    </CardTitle>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {proj.tagline}
                    </p>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {proj.summary}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {proj.tech.slice(0, 4).map((t) => (
                        <Badge
                          key={t}
                          variant="outline"
                          className="rounded-full border-border font-mono text-[11px] font-normal text-muted-foreground"
                        >
                          {t}
                        </Badge>
                      ))}
                      {proj.tech.length > 4 && (
                        <Badge
                          variant="outline"
                          className="rounded-full border-border font-mono text-[11px] font-normal text-muted-foreground"
                        >
                          +{proj.tech.length - 4}
                        </Badge>
                      )}
                    </div>
                    <div className="mt-5 flex items-center gap-2 pt-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            data-testid="project-open-details-button"
                          >
                            Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-h-[85vh] max-w-lg overflow-y-auto border-border bg-card">
                          <DialogHeader>
                            <DialogTitle className="font-display text-xl">
                              {proj.name}
                            </DialogTitle>
                            <DialogDescription className="font-mono text-xs text-primary">
                              {proj.tagline}
                            </DialogDescription>
                          </DialogHeader>
                          {proj.gallery && (
                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                              {proj.gallery.map((g, gi) => (
                                <a
                                  key={gi}
                                  href={g.src}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title={g.caption}
                                  className="group/img relative overflow-hidden rounded-lg border border-border"
                                >
                                  <img
                                    src={g.src}
                                    alt={g.caption}
                                    loading="lazy"
                                    className="aspect-video w-full object-cover transition-transform duration-300 group-hover/img:scale-110"
                                  />
                                </a>
                              ))}
                            </div>
                          )}
                          {proj.imageNote && (
                            <p className="font-mono text-[10px] text-muted-foreground">
                              {proj.imageNote}
                            </p>
                          )}
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {proj.details}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {proj.tech.map((t) => (
                              <Badge
                                key={t}
                                variant="outline"
                                className="rounded-full border-border font-mono text-[11px] font-normal text-muted-foreground"
                              >
                                {t}
                              </Badge>
                            ))}
                          </div>
                          {proj.live && (
                            <a
                              href={proj.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-2"
                            >
                              <Button size="sm" className="gap-1.5">
                                <ExternalLink size={14} /> Visit Live Site
                              </Button>
                            </a>
                          )}
                        </DialogContent>
                      </Dialog>
                      {proj.live && (
                        <a
                          href={proj.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-testid="project-live-link"
                        >
                          <Button variant="ghost" size="sm" className="gap-1.5">
                            <ExternalLink size={14} /> Live
                          </Button>
                        </a>
                      )}
                      {proj.repo && (
                        <a
                          href={proj.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-testid="project-repo-link"
                        >
                          <Button variant="ghost" size="sm" className="gap-1.5">
                            <Github size={14} /> Code
                          </Button>
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container_>
      </div>

      {/* CERTIFICATIONS */}
      <div className="border-y border-border bg-[hsl(var(--surface-1))]">
        <Container_ id="certifications">
          <Reveal>
            <SectionHeader
              eyebrow="04 · Certifications"
              title="Always leveling up"
              subtitle="Certified in cloud fundamentals, with Python, Node.js/React, Kubernetes, and ML/Computer Vision credentials actively in progress."
            />
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-3">
            {certifications.map((cert, i) => {
              const done = cert.status === "Completed";
              const hasFile = !!cert.file;
              const card = (
                <Card
                  className={`h-full bg-background transition-colors duration-200 hover:border-primary/30 ${
                    hasFile ? "cursor-pointer hover:-translate-y-0.5 will-change-transform" : ""
                  }`}
                >
                  <CardContent className="flex items-start gap-3 p-5">
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                        done
                          ? "bg-emerald-100 text-emerald-600 dark:bg-[hsl(160_60%_12%)] dark:text-[hsl(160_70%_65%)]"
                          : "bg-amber-100 text-amber-600 dark:bg-[hsl(38_70%_12%)] dark:text-[hsl(38_90%_65%)]"
                      }`}
                    >
                      {done ? <CheckCircle2 size={20} /> : <Clock size={20} />}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-sm font-semibold">
                        {cert.name}
                      </p>
                      {cert.issuer && (
                        <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                          {cert.issuer}
                          {cert.date ? ` · ${cert.date}` : ""}
                        </p>
                      )}
                      <div className="mt-2 flex items-center gap-2">
                        <Badge
                          className={`font-mono text-[10px] ${
                            done
                              ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-[hsl(160_60%_22%)] dark:bg-[hsl(160_60%_12%)] dark:text-[hsl(160_70%_70%)]"
                              : "border-amber-200 bg-amber-50 text-amber-700 dark:border-[hsl(38_70%_22%)] dark:bg-[hsl(38_70%_12%)] dark:text-[hsl(38_90%_70%)]"
                          }`}
                        >
                          {cert.status}
                        </Badge>
                        {hasFile && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-primary">
                            <Eye size={12} /> View certificate
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
              return (
                <Reveal key={cert.name} delay={i * 0.07}>
                  {hasFile ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        <div role="button" data-testid="cert-view-trigger">
                          {card}
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto border-border bg-card">
                        <DialogHeader>
                          <DialogTitle className="font-display text-lg">
                            {cert.fullTitle || cert.name}
                          </DialogTitle>
                          <DialogDescription className="font-mono text-xs text-primary">
                            {cert.issuer}
                            {cert.date ? ` · ${cert.date}` : ""}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="overflow-hidden rounded-lg border border-border bg-background">
                          <iframe
                            title={`${cert.name} certificate`}
                            src={cert.file}
                            className="h-[58vh] w-full"
                            data-testid="cert-pdf-iframe"
                          />
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <a
                            href={cert.file}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-testid="cert-open-pdf"
                          >
                            <Button size="sm" className="gap-1.5">
                              <FileText size={14} /> Open PDF
                            </Button>
                          </a>
                          {cert.verifyUrl && (
                            <a
                              href={cert.verifyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              data-testid="cert-verify-link"
                            >
                              <Button size="sm" variant="outline" className="gap-1.5">
                                <ExternalLink size={14} /> Verify on edX
                              </Button>
                            </a>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    card
                  )}
                </Reveal>
              );
            })}
          </div>
        </Container_>
      </div>

      {/* EXPERIENCE */}
      <Container_ id="experience">
        <Reveal>
          <SectionHeader eyebrow="05 · Experience" title="Where I've worked" />
        </Reveal>
        <div className="space-y-5">
          {experience.map((job, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <Card className="bg-[hsl(var(--surface-1))]">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/12 text-primary">
                        <Briefcase size={18} />
                      </span>
                      <div>
                        <p className="font-display text-base font-semibold">
                          {job.role}
                        </p>
                        <p className="text-sm text-primary">{job.company}</p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="w-fit font-mono text-[11px] text-muted-foreground"
                    >
                      {job.period} · {job.location}
                    </Badge>
                  </div>
                  <ul className="mt-4 space-y-2 pl-1">
                    {job.points.map((pt, j) => (
                      <li key={j} className="flex gap-2 text-sm text-muted-foreground">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container_>

      {/* CONTACT */}
      <div className="section-glow border-t border-border">
        <Container_ id="contact">
          <Reveal>
            <SectionHeader
              eyebrow="06 · Contact"
              title="Let's work together"
              subtitle="Send a message directly — it lands in my inbox and I'll reply as soon as I can."
            />
          </Reveal>
          <Reveal delay={0.05}>
            <ContactForm />
          </Reveal>
        </Container_>
      </div>
    </div>
  );
};

export default Portfolio;
