import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sun, Moon, Sparkles } from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";

/**
 * Theme toggle with a recurring "suggestion" animation.
 * Every 15s (until the user interacts) the button wiggles, a soft ring
 * pulses around it, and a small tooltip nudges the visitor to try the
 * other mode.
 */
export const ThemeToggle = ({ className = "", hintSide = "bottom" }) => {
  const { theme, toggleTheme, hasInteracted } = useTheme();
  const [hint, setHint] = useState(false);
  const timerRef = useRef(null);

  const isDark = theme === "dark";
  const nextLabel = isDark ? "Try light mode" : "Try dark mode";

  useEffect(() => {
    // Stop nudging once the user has interacted with the toggle.
    if (hasInteracted) {
      setHint(false);
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    // Fire a hint every 15 seconds; each hint lasts ~3.2s.
    timerRef.current = setInterval(() => {
      setHint(true);
      setTimeout(() => setHint(false), 3200);
    }, 15000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [hasInteracted]);

  const tooltipPos =
    hintSide === "bottom"
      ? "top-full mt-2 right-0"
      : "bottom-full mb-2 right-0";

  return (
    <div className={`relative ${className}`}>
      {/* Pulsing ring while hinting */}
      {hint && (
        <span
          aria-hidden="true"
          className="theme-hint-ring pointer-events-none absolute inset-0 rounded-lg border border-primary/60"
        />
      )}

      <button
        type="button"
        onClick={toggleTheme}
        data-testid="theme-toggle-button"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        title={nextLabel}
        className={`relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-[hsl(var(--surface-1))] text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary active:scale-95 ${
          hint ? "theme-hint-wiggle border-primary/50 text-primary" : ""
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span
              key="moon"
              initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.2 }}
            >
              <Moon size={17} />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ rotate: 90, opacity: 0, scale: 0.6 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.2 }}
            >
              <Sun size={17} />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Suggestion tooltip */}
      <AnimatePresence>
        {hint && (
          <motion.div
            initial={{ opacity: 0, y: hintSide === "bottom" ? -6 : 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: hintSide === "bottom" ? -6 : 6, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className={`absolute z-50 ${tooltipPos} flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-primary/30 bg-popover px-2.5 py-1.5 text-xs font-medium text-foreground shadow-[0_10px_30px_rgba(0,0,0,0.35)]`}
          >
            <Sparkles size={13} className="text-primary" />
            {nextLabel}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
