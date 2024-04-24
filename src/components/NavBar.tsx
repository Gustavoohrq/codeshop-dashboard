import {  MoonIcon, SunIcon } from "lucide-react";
interface NavbarProps {
    isDark: boolean;
    toggleTheme: () => void;
}

export default function Navbar({ toggleTheme, isDark }: NavbarProps) {
    return (

        <div className="flex items-center space-x-4">
            <button
                className="text-gray-800 dark:text-white hover:text-gray-900 dark:hover:text-gray-200"
                onClick={toggleTheme}
                aria-label="Toggle Dark/Light Mode"
            >
                {isDark ? (
                    <SunIcon className="h-6 w-6" />
                ) : (
                    <MoonIcon className="h-6 w-6" />
                )}
            </button>
        </div>

    );
}
