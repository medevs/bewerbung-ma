import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n/index.tsx";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface CulturalAdaptationProps {
  resumeData?: any;
  targetCountry?: string;
}

const CulturalAdaptation = ({
  targetCountry = "germany",
}: CulturalAdaptationProps) => {
  const { t } = useLanguage();
  const [country, setCountry] = useState(targetCountry);

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-lg font-medium mb-4">
          {t("resume.culturalAdaptation")}
        </h2>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="targetCountry">{t("resume.targetCountry")}</Label>
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger id="targetCountry">
                <SelectValue placeholder={t("resume.targetCountry")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="germany">Deutschland</SelectItem>
                <SelectItem value="austria">Österreich</SelectItem>
                <SelectItem value="switzerland">Schweiz</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium mb-2">
              {t("resume.culturalAdaptation")}:
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>
                  Fügen Sie ein professionelles Foto hinzu (üblich in deutschen
                  Lebensläufen)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>
                  Geben Sie Ihr Geburtsdatum und Geburtsort an (Standard in
                  deutschen Lebensläufen)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <span>
                  Verwenden Sie genaue Daten für Ausbildung und Berufserfahrung
                  (Monat/Jahr-Format)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Geben Sie Ihre Sprachkenntnisse mit Niveaustufen an</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <span>
                  Fügen Sie am Ende eine handschriftliche Unterschrift hinzu
                  (traditionell in deutschen Lebensläufen)
                </span>
              </li>
            </ul>

            <div className="pt-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-primary/10">
                  Foto hinzufügen
                </Badge>
                <Badge variant="outline" className="bg-primary/10">
                  Geburtsdaten angeben
                </Badge>
                <Badge variant="outline" className="bg-primary/10">
                  MM/JJJJ-Format verwenden
                </Badge>
                <Badge variant="outline" className="bg-primary/10">
                  Unterschrift hinzufügen
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CulturalAdaptation;
