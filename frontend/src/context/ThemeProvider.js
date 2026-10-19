import { createContext, useContext, useEffect, useState, useCallback } from "react";

const ThemeContext = createContext({
  theme: "dark",
  toggleTheme: () => {},
  setTheme: () => {},
  hasInteracted: false,
});

const STORAGE_KEY = "theme";

const getSystemTheme = () => {
  if (typeof window === "undefined" || !window.matchMedia) return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const applyThemeClass = (theme) => {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
};

export const ThemeProvider = ({ children }) => {
  // First visit (no stored preference) → follow the visitor's device setting.
  const [theme, setThemeState] = useState(() => {
    if (typeof window === "undefined") return "dark";
    return localStorage.getItem(STORAGE_KEY) || getSystemTheme();
  });
  // Whether the user has an explicit saved preference.
  const [hasInteracted, setHasInteracted] = useState(() => {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem(STORAGE_KEY);
  });

  // Apply the class whenever theme changes (do NOT auto-persist — only
  // persist on explicit user action so we keep following the system until then).
  useEffect(() => {
    applyThemeClass(theme);
  }, [theme]);

  // Live-follow the OS theme until the user makes an explicit choice.
  useEffect(() => {
    if (hasInteracted || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e) => setThemeState(e.matches ? "dark" : "light");
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, [hasInteracted]);

  const persist = (next) => {
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (e) {
      /* ignore */
    }
  };

  const setTheme = useCallback((next) => {
    setHasInteracted(true);
    setThemeState(next);
    persist(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setHasInteracted(true);
    setThemeState((t) => {
      const next = t === "dark" ? "light" : "dark";
      persist(next);
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, hasInteracted }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
