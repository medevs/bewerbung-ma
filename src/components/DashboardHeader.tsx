import React from "react";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { FileText, Settings, LogOut, User } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "@/lib/i18n/index.tsx";

interface DashboardHeaderProps {
  userName?: string;
  userEmail?: string;
  userAvatarUrl?: string;
  onLogout?: () => void;
  onSettings?: () => void;
  onProfile?: () => void;
}

const DashboardHeader = ({
  userName = "John Doe",
  userEmail = "john@example.com",
  userAvatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  onLogout = () => {},
  onSettings = () => {},
  onProfile = () => {},
}: DashboardHeaderProps) => {
  const { t } = useLanguage();
  return (
    <header className="w-full h-auto sm:h-[72px] px-4 sm:px-6 py-3 border-b bg-background flex flex-wrap items-center justify-between sticky top-0 z-50 left-0 right-0">
      <div className="flex items-center gap-2 flex-shrink-0">
        <FileText className="h-6 w-6 text-primary" />
        <span className="text-xl font-semibold">{t("common.appName")}</span>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 flex-wrap sm:flex-nowrap w-full sm:w-auto justify-between sm:justify-end mb-2 sm:mb-0">
        <LanguageSwitcher />
        <ThemeToggle />
        <Button variant="outline">
          {t("dashboard.upgradePro", "Upgrade Pro")}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-0">
              <Avatar>
                <AvatarImage src={userAvatarUrl} alt={userName} />
                <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="p-2 border-b">
              <p className="font-medium">{userName}</p>
              <p className="text-sm text-muted-foreground">{userEmail}</p>
            </div>
            <DropdownMenuItem onClick={onProfile}>
              <User className="mr-2 h-4 w-4" />
              {t("common.profile")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onSettings}>
              <Settings className="mr-2 h-4 w-4" />
              {t("common.settings")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onLogout} className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              {t("common.logout")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;
