import { useState, useEffect } from "react";

function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    return document.documentElement.classList.contains("dark");
  });

  const toggleTheme = () => {
    const root = document.documentElement;
    if (dark) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDark(!dark);
  };

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
      <button
      onClick={toggleTheme}
      className="absolute top-4 right-4 p-2 rounded text-sm bg-gray-200 dark:bg-gray-700 dark:text-white"
    >
      {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}

export default ThemeToggle;