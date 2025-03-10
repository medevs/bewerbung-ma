import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n/index.tsx";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Check, Globe } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface MultilingualSupportProps {
  currentLanguage?: string;
  onLanguageChange?: (language: string) => void;
}

const MultilingualSupport = ({
  currentLanguage = "de",
  onLanguageChange = () => {},
}: MultilingualSupportProps) => {
  const { t } = useLanguage();
  const [language, setLanguage] = useState(currentLanguage);

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    onLanguageChange(value);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-lg font-medium mb-4">
          {t("resume.multilingualSupport")}
        </h2>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>{t("resume.languages")}</Label>
            <RadioGroup
              value={language}
              onValueChange={handleLanguageChange}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="de" id="de" />
                <Label htmlFor="de" className="flex items-center">
                  <span className="mr-2">🇩🇪</span>
                  Deutsch
                  {language === "de" && (
                    <Check className="ml-2 h-4 w-4 text-primary" />
                  )}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="en" id="en" />
                <Label htmlFor="en" className="flex items-center">
                  <span className="mr-2">🇬🇧</span>
                  English
                  {language === "en" && (
                    <Check className="ml-2 h-4 w-4 text-primary" />
                  )}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fr" id="fr" />
                <Label htmlFor="fr" className="flex items-center">
                  <span className="mr-2">🇫🇷</span>
                  Français
                  {language === "fr" && (
                    <Check className="ml-2 h-4 w-4 text-primary" />
                  )}
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleLanguageChange("de")}
              >
                <Globe className="mr-2 h-4 w-4" />
                Auf Deutsch übersetzen
              </Button>
            </div>

            <div className="text-sm text-muted-foreground">
              <p>
                Ihr Lebenslauf wird in die ausgewählte Sprache übersetzt. Dies
                ist nützlich, wenn Sie sich in verschiedenen Ländern bewerben.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MultilingualSupport;
