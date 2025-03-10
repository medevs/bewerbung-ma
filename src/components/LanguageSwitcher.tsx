import React from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Globe } from "lucide-react";
import { useLanguage } from "@/lib/i18n/index.tsx";

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          aria-label={t("common.language")}
        >
          <Globe className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setLanguage("en")}
          className={language === "en" ? "bg-muted" : ""}
        >
          🇬🇧 {t("common.english")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage("de")}
          className={language === "de" ? "bg-muted" : ""}
        >
          🇩🇪 {t("common.german")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage("ar-ma")}
          className={language === "ar-ma" ? "bg-muted" : ""}
        >
          🇲🇦 {t("common.darija")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
