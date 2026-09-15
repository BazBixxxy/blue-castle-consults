import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/theme-provider";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      onClick={() => (theme === "light" ? setTheme("dark") : setTheme("light"))}
      variant="ghost"
      size="icon"
      className="rounded-full shrink-0"
    >
      <MoonIcon className="size-5 rotate-0 scale-100 transition-all dark:hidden dark:-rotate-90 dark:scale-0" />
      <SunIcon className="hidden size-5 rotate-90 scale-0 transition-all dark:inline dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
