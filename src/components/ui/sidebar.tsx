import { Link } from "react-router-dom";
import {
  FileText,
  Mail,
  Settings,
  User,
  Briefcase,
  Menu,
  MessageSquare,
  Users,
  BookOpen,
  HelpCircle,
} from "lucide-react";
import { useState } from "react";
import { Button } from "./button";
import { useLanguage } from "@/lib/i18n/index.tsx";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 right-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="h-6 w-6" />
      </Button>
      <div
        className={`w-64 h-screen bg-background border-r fixed top-0 left-0 z-40 transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative overflow-y-auto pt-24 md:pt-0`}
      >
        <div className="p-4">
          <nav className="space-y-2">
            <Link
              to="/dashboard"
              className="flex items-center gap-2 p-2 hover:bg-muted rounded-md text-foreground"
            >
              <FileText className="w-4 h-4" />
              {t("dashboard.recentDocuments")}
            </Link>
            <Link
              to="/jobs"
              className="flex items-center gap-2 p-2 hover:bg-muted rounded-md text-foreground"
            >
              <Briefcase className="w-4 h-4" />
              {t("jobs.search")}
            </Link>
            <Link
              to="/resume/new"
              className="flex items-center gap-2 p-2 hover:bg-muted rounded-md text-foreground"
            >
              <FileText className="w-4 h-4" />
              {t("resume.create", "New Resume")}
            </Link>
            <Link
              to="/letter/new"
              className="flex items-center gap-2 p-2 hover:bg-muted rounded-md text-foreground"
            >
              <Mail className="w-4 h-4" />
              {t("letter.create", "New Letter")}
            </Link>
            <Link
              to="/profile"
              className="flex items-center gap-2 p-2 hover:bg-muted rounded-md text-foreground"
            >
              <User className="w-4 h-4" />
              {t("common.profile")}
            </Link>
            <Link
              to="/validate-resume"
              className="flex items-center gap-2 p-2 hover:bg-muted rounded-md text-foreground"
            >
              <FileText className="w-4 h-4" />
              {t("resume.validate", "Validate Resume")}
            </Link>
            <Link
              to="/application-tracker"
              className="flex items-center gap-2 p-2 hover:bg-muted rounded-md text-foreground"
            >
              <Briefcase className="w-4 h-4" />
              {t("jobs.applicationTracker.title", "Application Tracker")}
            </Link>
            <Link
              to="/interview-preparation"
              className="flex items-center gap-2 p-2 hover:bg-muted rounded-md text-foreground"
            >
              <MessageSquare className="w-4 h-4" />
              {t("interview.preparation")}
            </Link>
            <Link
              to="/ausbildung-finder"
              className="flex items-center gap-2 p-2 hover:bg-muted rounded-md text-foreground"
            >
              <Briefcase className="w-4 h-4" />
              {t("jobs.ausbildungFinder")}
            </Link>
            <Link
              to="/visa-guide"
              className="flex items-center gap-2 p-2 hover:bg-muted rounded-md text-foreground"
            >
              <FileText className="w-4 h-4" />
              {t("visa.guide")}
            </Link>
            <Link
              to="/german-culture"
              className="flex items-center gap-2 p-2 hover:bg-muted rounded-md text-foreground"
            >
              <Users className="w-4 h-4" />
              {t("culture.guide")}
            </Link>
            <Link
              to="/language-learning"
              className="flex items-center gap-2 p-2 hover:bg-muted rounded-md text-foreground"
            >
              <BookOpen className="w-4 h-4" />
              {t("language.learning")}
            </Link>
            <Link
              to="/support"
              className="flex items-center gap-2 p-2 hover:bg-muted rounded-md text-foreground"
            >
              <HelpCircle className="w-4 h-4" />
              {t("support.title", "Support")}
            </Link>
            <Link
              to="/settings"
              className="flex items-center gap-2 p-2 hover:bg-muted rounded-md text-foreground"
            >
              <Settings className="w-4 h-4" />
              {t("common.settings")}
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
