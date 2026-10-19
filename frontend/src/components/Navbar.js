import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Download, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { resumePdfUrl } from "@/lib/api";
import { profile } from "@/data/portfolio";

const sections = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const onHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!onHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [onHome]);

  const goToSection = (id) => {
    if (onHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/#" + id);
      setTimeout(
        () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }),
        250
      );
    }
  };

  return (
    <header
      data-testid="site-sticky-nav"
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-border bg-background/80 backdrop-blur shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
          : "border-transparent bg-background/40 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          data-testid="nav-home-link"
          className="flex items-center gap-2.5 group"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/25 transition-colors group-hover:bg-primary/25">
            <img src="./img/IMG.jpg" className="h-8.5 w-9 items-center justify-center rounded-lg" size={16} />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-sm font-semibold tracking-tight">
              Enoch D. Doeblah
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Software Engineer
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => goToSection(s.id)}
              data-testid={`nav-${s.id}-anchor`}
              className={`relative rounded-md px-3 py-2 text-sm transition-colors hover:text-foreground ${
                active === s.id ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {s.label}
              {active === s.id && (
                <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary" />
              )}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link to="/resume" data-testid="nav-resume-link">
            <Button variant="outline" size="sm" className="active:scale-[0.98]">
              Resume
            </Button>
          </Link>
          <a href={resumePdfUrl} data-testid="nav-download-pdf-button">
            <Button size="sm" className="gap-1.5 active:scale-[0.98]">
              <Download size={15} /> Download CV
            </Button>
          </a>
        </div>

        {/* Mobile nav */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                data-testid="nav-mobile-trigger"
                aria-label="Open menu"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 border-border bg-background">
              <div className="mt-8 flex flex-col gap-1">
                {sections.map((s) => (
                  <SheetClose asChild key={s.id}>
                    <button
                      onClick={() => goToSection(s.id)}
                      className="rounded-md px-3 py-3 text-left text-base text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    >
                      {s.label}
                    </button>
                  </SheetClose>
                ))}
                <div className="my-3 h-px bg-border" />
                <SheetClose asChild>
                  <Link to="/resume">
                    <Button variant="outline" className="w-full">
                      View Resume
                    </Button>
                  </Link>
                </SheetClose>
                <a href={resumePdfUrl} className="mt-2">
                  <Button className="w-full gap-1.5">
                    <Download size={16} /> Download CV
                  </Button>
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
