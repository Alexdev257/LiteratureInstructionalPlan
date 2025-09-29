import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`flex item-center cursor-pointer transition-transform duration-500
                    ${isDark ? 'rotate-180' : 'rotate-0'}`}
    >
      {isDark ?
        <Sun className="w-full text-yellow-500 rotate-0 transition-all" /> :
        <Moon className="w-full text-blue-500 rotate-0 transition-all" />}
    </div>
  )
}