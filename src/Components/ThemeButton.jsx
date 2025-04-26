import React, { useState, useEffect } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Switch } from "@headlessui/react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

const ThemeButton = () => {
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const [enabled, setEnabled] = useState(theme == "dark");

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleThemeChange = (checked) => {
    setTheme(checked ? "dark" : "light");
    setEnabled(checked);
  };

  return (
    <Switch
      checked={enabled}
      onChange={handleThemeChange}
      className={`relative inline-flex h-12 w-17 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
        enabled ? "bg-[var(--c-emerald)]" : "bg-gray-400"
      }`}
    >
      <span className="sr-only">Toggle theme</span>
      <span
        className={`pointer-events-none relative inline-block h-11 w-12 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          enabled ? "translate-x-5" : "translate-x-0"
        }`}
      >
        <span
          className={`absolute inset-0 flex h-full w-full items-center justify-center transition-opacity ${
            enabled
              ? "opacity-0 duration-100 ease-out"
              : "opacity-100 duration-200 ease-in"
          }`}
          aria-hidden="true"
        >
          <SunIcon className="h-5 w-5 text-[var(--c-green)]" />
        </span>
        <span
          className={`absolute inset-0 flex h-full w-full items-center justify-center transition-opacity ${
            enabled
              ? "opacity-100 duration-200 ease-in"
              : "opacity-0 duration-100 ease-out"
          }`}
          aria-hidden="true"
        >
          <MoonIcon className="h-3 w-3 text-gray-400" />
        </span>
      </span>
    </Switch>
  );
};

export default ThemeButton;
