"use client";
import { useCallback, useSyncExternalStore } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";

const THEME_KEY = "sevenknc-theme";
const META_COLORS = { light: "#1040a0", dark: "#060b16" };

function currentTheme() {
  if (typeof document === "undefined") return "light";
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

function syncMetaThemeColor(theme) {
  document
    .querySelectorAll('meta[name="theme-color"]')
    .forEach((el) => el.setAttribute("content", META_COLORS[theme]));
}

function subscribeTheme(onChange: () => void) {
  syncMetaThemeColor(currentTheme());

  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const onSystemChange = (e: MediaQueryListEvent) => {
    if (localStorage.getItem(THEME_KEY)) return;
    const next = e.matches ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    syncMetaThemeColor(next);
  };
  mq.addEventListener("change", onSystemChange);

  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  return () => {
    mq.removeEventListener("change", onSystemChange);
    observer.disconnect();
  };
}

export default function ThemeToggle({ className = "" }) {
  const theme = useSyncExternalStore(subscribeTheme, currentTheme, () => "light");

  const toggle = useCallback(() => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    const root = document.documentElement;
    root.classList.add("theme-animating");
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {}
    syncMetaThemeColor(next);
    window.setTimeout(() => root.classList.remove("theme-animating"), 500);
  }, []);

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className={`theme-toggle${className ? ` ${className}` : ""}`}
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className="theme-toggle__icon theme-toggle__icon--sun" aria-hidden="true">
        <FaSun size={17} />
      </span>
      <span className="theme-toggle__icon theme-toggle__icon--moon" aria-hidden="true">
        <FaMoon size={15} />
      </span>
    </button>
  );
}
