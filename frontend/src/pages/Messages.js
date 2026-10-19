import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  ArrowLeft,
  Inbox,
  RefreshCw,
  Mail,
  AlertCircle,
  Eye,
  Lock,
  LogOut,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
  DrawerFooter,
} from "@/components/ui/drawer";
import { fetchMessages, inboxLogin, TOKEN_KEY } from "@/lib/api";

const fmtDate = (iso) => {
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
};

/* ------------------------- Password gate ------------------------- */
const LoginGate = ({ onSuccess }) => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!password) {
      setError("Please enter your password.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const { token } = await inboxLogin(password);
      sessionStorage.setItem(TOKEN_KEY, token);
      toast.success("Welcome back");
      onSuccess(token);
    } catch (err) {
      const msg =
        err?.response?.status === 401
          ? "Incorrect password. Please try again."
          : "Could not sign in. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <form
        onSubmit={submit}
        data-testid="inbox-login-form"
        className="w-full max-w-sm rounded-xl border border-border bg-[hsl(var(--surface-1))] p-6 shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
      >
        <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/20">
          <Lock size={22} />
        </span>
        <h1 className="text-center font-display text-xl font-semibold">
          Private Inbox
        </h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">
          Enter your password to view client inquiries.
        </p>
        <div className="mt-5 space-y-1.5">
          <Label htmlFor="inbox-password">Password</Label>
          <Input
            id="inbox-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            disabled={loading}
            autoFocus
            data-testid="inbox-password-input"
            className="bg-background"
          />
        </div>
        {error && (
          <p
            role="alert"
            data-testid="inbox-login-error"
            className="mt-3 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive-foreground"
          >
            {error}
          </p>
        )}
        <Button
          type="submit"
          disabled={loading}
          data-testid="inbox-login-submit"
          className="mt-5 w-full gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Signing in…
            </>
          ) : (
            <>
              <Lock size={15} /> Unlock Inbox
            </>
          )}
        </Button>
        <Link
          to="/"
          className="mt-4 block text-center text-xs text-muted-foreground hover:text-primary"
        >
          ← Back to portfolio
        </Link>
      </form>
    </div>
  );
};

/* ------------------------- Inbox ------------------------- */
const Messages = () => {
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY));
  const [state, setState] = useState("idle"); // idle | loading | ready | error
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);

  const logout = useCallback(() => {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setMessages([]);
    setState("idle");
  }, []);

  const load = useCallback(
    async (tk) => {
      const activeToken = tk || token;
      if (!activeToken) return;
      setState("loading");
      try {
        const data = await fetchMessages(activeToken);
        setMessages(Array.isArray(data) ? data : []);
        setState("ready");
      } catch (e) {
        if (e?.response?.status === 401) {
          toast.error("Your session expired. Please sign in again.");
          logout();
          return;
        }
        setState("error");
      }
    },
    [token, logout]
  );

  useEffect(() => {
    if (token) load(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (!token) {
    return (
      <div className="min-h-screen bg-background" data-testid="messages-page">
        <LoginGate onSuccess={(tk) => setToken(tk)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" data-testid="messages-page">
      <div className="border-b border-border bg-[hsl(var(--surface-1))]">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="icon" aria-label="Back">
                <ArrowLeft size={18} />
              </Button>
            </Link>
            <div>
              <h1 className="font-display text-xl font-semibold">Inbox</h1>
              <p className="font-mono text-xs text-muted-foreground">
                {messages.length} message{messages.length === 1 ? "" : "s"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => load()}
              data-testid="messages-retry-button"
            >
              <RefreshCw size={15} /> Refresh
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
              onClick={logout}
              data-testid="inbox-logout-button"
            >
              <LogOut size={15} /> Lock
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
        {state === "loading" && (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-14 w-full rounded-lg" />
            ))}
          </div>
        )}

        {state === "error" && (
          <div className="flex flex-col items-center justify-center rounded-xl border border-destructive/40 bg-destructive/10 p-12 text-center">
            <AlertCircle className="mb-3 h-10 w-10 text-destructive" />
            <p className="font-display text-lg font-semibold">Couldn't load messages</p>
            <p className="mt-1 text-sm text-muted-foreground">
              There was a problem reaching the server.
            </p>
            <Button className="mt-5 gap-2" onClick={() => load()}>
              <RefreshCw size={15} /> Try again
            </Button>
          </div>
        )}

        {state === "ready" && messages.length === 0 && (
          <div
            data-testid="messages-empty-state"
            className="flex flex-col items-center justify-center rounded-xl border border-border bg-[hsl(var(--surface-1))] p-14 text-center"
          >
            <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/12 text-primary">
              <Inbox size={26} />
            </span>
            <p className="font-display text-lg font-semibold">No messages yet</p>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              When someone submits the contact form, their message will appear here.
            </p>
            <Link to="/#contact" className="mt-5">
              <Button variant="outline">Go to contact form</Button>
            </Link>
          </div>
        )}

        {state === "ready" && messages.length > 0 && (
          <div className="overflow-hidden rounded-xl border border-border bg-[hsl(var(--surface-1))]">
            <Table data-testid="messages-table">
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>From</TableHead>
                  <TableHead className="hidden sm:table-cell">Subject</TableHead>
                  <TableHead className="hidden md:table-cell">Received</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.map((m) => (
                  <TableRow key={m.id} data-testid="messages-table-row">
                    <TableCell>
                      <p className="font-medium">{m.name}</p>
                      <p className="text-xs text-muted-foreground">{m.email}</p>
                    </TableCell>
                    <TableCell className="hidden max-w-xs truncate sm:table-cell">
                      {m.subject}
                    </TableCell>
                    <TableCell className="hidden font-mono text-xs text-muted-foreground md:table-cell">
                      {fmtDate(m.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1.5"
                        onClick={() => setSelected(m)}
                        data-testid="messages-open-button"
                      >
                        <Eye size={15} /> View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <Drawer open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DrawerContent className="border-border bg-card">
          <div className="mx-auto w-full max-w-2xl">
            <DrawerHeader>
              <DrawerTitle className="font-display text-xl">
                {selected?.subject}
              </DrawerTitle>
              <DrawerDescription className="flex flex-wrap items-center gap-2 pt-1">
                <span className="font-medium text-foreground">{selected?.name}</span>
                <a
                  href={`mailto:${selected?.email}`}
                  className="flex items-center gap-1 text-primary hover:underline"
                >
                  <Mail size={13} /> {selected?.email}
                </a>
                <span className="font-mono text-xs text-muted-foreground">
                  · {selected && fmtDate(selected.createdAt)}
                </span>
              </DrawerDescription>
            </DrawerHeader>
            <div className="px-4 pb-2">
              <div className="rounded-lg border border-border bg-[hsl(var(--surface-1))] p-4 text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">
                {selected?.message}
              </div>
            </div>
            <DrawerFooter className="flex-row justify-end gap-2">
              {selected && (
                <a href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`}>
                  <Button className="gap-2">
                    <Mail size={15} /> Reply
                  </Button>
                </a>
              )}
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Messages;
