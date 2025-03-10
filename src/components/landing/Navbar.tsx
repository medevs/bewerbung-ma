import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { ThemeToggle } from "../theme-toggle";
import { useLanguage } from "@/lib/i18n/index.tsx";
import { FileText, Menu, X } from "lucide-react";

const Navbar = () => {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="bg-white/80 dark:bg-gray-950/90 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">
                {t("common.appName")}
              </span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            <Link
              to="/jobs"
              className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary px-3 py-2 text-sm font-medium"
            >
              {t("jobs.search")}
            </Link>
            <Link
              to="/ausbildung-finder"
              className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary px-3 py-2 text-sm font-medium"
            >
              {t("jobs.ausbildungFinder")}
            </Link>
            <Link
              to="/visa-guide"
              className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary px-3 py-2 text-sm font-medium"
            >
              {t("visa.guide")}
            </Link>
            <LanguageSwitcher />
            <ThemeToggle />
            <Button asChild variant="outline" size="sm">
              <Link to="/sign-in">{t("auth.signIn")}</Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/sign-up">{t("auth.signUp")}</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 py-2">
          <div className="px-4 pt-2 pb-3 space-y-3">
            <div className="flex justify-between items-center">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Button asChild variant="outline" className="w-full">
                <Link to="/sign-in">{t("auth.signIn")}</Link>
              </Button>
              <Button asChild className="w-full">
                <Link to="/sign-up">{t("auth.signUp")}</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
