import { useState } from "react";
import { toast } from "sonner";
import { Send, CheckCircle2, Loader2, Mail, Linkedin, Github, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { sendContactMessage } from "@/lib/api";
import { profile } from "@/data/portfolio";

const initial = { name: "", email: "", subject: "", message: "", company: "" };

export const ContactForm = () => {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const validate = () => {
    if (form.name.trim().length < 2) return "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return "Please enter a valid email address.";
    if (form.subject.trim().length < 2) return "Please add a subject.";
    if (form.message.trim().length < 5) return "Your message is too short.";
    return null;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (v) {
      setStatus("error");
      setErrorMsg(v);
      toast.error(v);
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    const t = toast.loading("Sending your message…");
    try {
      await sendContactMessage(form);
      toast.success("Message sent! I'll get back to you soon.", { id: t });
      setStatus("success");
      setForm(initial);
    } catch (err) {
      const msg =
        err?.response?.data?.detail ||
        "Something went wrong. Please try again or email me directly.";
      toast.error(typeof msg === "string" ? msg : "Failed to send message.", { id: t });
      setErrorMsg(typeof msg === "string" ? msg : "Failed to send message.");
      setStatus("error");
    }
  };

  const copyEmail = () => {
    navigator.clipboard?.writeText(profile.email);
    toast.success("Email copied to clipboard");
  };

  const disabled = status === "loading";

  return (
    <div className="grid gap-6 md:grid-cols-12">
      {/* Left: contact channels */}
      <div className="md:col-span-5">
        <h3 className="font-display text-lg font-semibold">Let's build something</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Have a role, project, or freelance gig in mind? Send a message and I'll
          respond promptly. I'm {profile.availability.toLowerCase()}.
        </p>
        <div className="mt-6 space-y-3">
          <button
            onClick={copyEmail}
            data-testid="contact-copy-email"
            className="group flex w-full items-center gap-3 rounded-xl border border-border bg-[hsl(var(--surface-1))] p-3 text-left transition-colors hover:border-primary/40"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Mail size={18} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-xs text-muted-foreground">Email</span>
              <span className="block truncate text-sm">{profile.email}</span>
            </span>
            <Copy size={15} className="text-muted-foreground group-hover:text-primary" />
          </button>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-xl border border-border bg-[hsl(var(--surface-1))] p-3 transition-colors hover:border-primary/40"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Linkedin size={18} />
            </span>
            <span>
              <span className="block text-xs text-muted-foreground">LinkedIn</span>
              <span className="block text-sm">Connect with me</span>
            </span>
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-xl border border-border bg-[hsl(var(--surface-1))] p-3 transition-colors hover:border-primary/40"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Github size={18} />
            </span>
            <span>
              <span className="block text-xs text-muted-foreground">GitHub</span>
              <span className="block text-sm">See my code</span>
            </span>
          </a>
        </div>
      </div>

      {/* Right: form */}
      <div className="md:col-span-7">
        {status === "success" ? (
          <div
            data-testid="contact-form-status"
            className="flex h-full flex-col items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 p-10 text-center dark:border-[hsl(160_60%_22%)] dark:bg-[hsl(160_60%_12%)]"
          >
            <CheckCircle2 className="mb-3 h-12 w-12 text-emerald-600 dark:text-[hsl(160_70%_60%)]" />
            <h4 className="font-display text-lg font-semibold text-emerald-700 dark:text-[hsl(160_70%_75%)]">
              Message sent successfully!
            </h4>
            <p className="mt-2 max-w-sm text-sm text-emerald-600 dark:text-[hsl(160_40%_75%)]">
              Thanks for reaching out. I'll review your message and get back to you
              as soon as possible.
            </p>
            <Button
              variant="outline"
              className="mt-5"
              onClick={() => setStatus("idle")}
              data-testid="contact-send-another"
            >
              Send another message
            </Button>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            data-testid="contact-form"
            className="rounded-xl border border-border bg-[hsl(var(--surface-1))] p-5 sm:p-6"
            noValidate
          >
            {/* Honeypot */}
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={onChange}
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  placeholder="Jane Doe"
                  disabled={disabled}
                  data-testid="contact-form-name-input"
                  className="bg-background"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="jane@company.com"
                  disabled={disabled}
                  data-testid="contact-form-email-input"
                  className="bg-background"
                />
              </div>
            </div>
            <div className="mt-4 space-y-1.5">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                name="subject"
                value={form.subject}
                onChange={onChange}
                placeholder="Freelance project — API backend"
                disabled={disabled}
                data-testid="contact-form-subject-input"
                className="bg-background"
              />
            </div>
            <div className="mt-4 space-y-1.5">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                value={form.message}
                onChange={onChange}
                placeholder="Tell me about your project, timeline, and goals…"
                rows={5}
                disabled={disabled}
                data-testid="contact-form-message-textarea"
                className="resize-none bg-background"
              />
            </div>

            {status === "error" && errorMsg && (
              <p
                role="alert"
                aria-live="polite"
                data-testid="contact-form-error"
                className="mt-3 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive-foreground"
              >
                {errorMsg}
              </p>
            )}

            <Button
              type="submit"
              disabled={disabled}
              data-testid="contact-form-submit-button"
              className="mt-5 w-full gap-2 active:scale-[0.99] sm:w-auto"
              size="lg"
            >
              {disabled ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                </>
              ) : (
                <>
                  <Send size={16} /> Send Message
                </>
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};
