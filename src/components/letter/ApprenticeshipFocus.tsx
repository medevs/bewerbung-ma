import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { GraduationCap, BookOpen, Briefcase } from "lucide-react";
import { Badge } from "../ui/badge";

interface ApprenticeshipFocusProps {
  industry?: string;
}

const ApprenticeshipFocus = ({ industry = "it" }: ApprenticeshipFocusProps) => {
  const getIndustrySpecificTips = () => {
    switch (industry) {
      case "it":
        return {
          title: "IT-Ausbildung",
          icon: <BookOpen className="w-5 h-5 mr-2" />,
          keyPoints: [
            "Betonen Sie Ihr technisches Interesse und eventuelle Vorerfahrungen (auch Hobbyprojekte)",
            "Erwähnen Sie Ihre Lernbereitschaft für neue Technologien",
            "Heben Sie Problemlösungsfähigkeiten und analytisches Denken hervor",
            "Zeigen Sie Teamfähigkeit und Kommunikationsstärke",
          ],
          keywords: [
            "Problemlösung",
            "Teamarbeit",
            "Lernbereitschaft",
            "Technisches Verständnis",
            "Analytisches Denken",
            "Sorgfalt",
            "Kommunikationsfähigkeit",
          ],
          expectations: [
            "Duale Ausbildung: Wechsel zwischen Berufsschule und Betrieb",
            "Ausbildungsdauer: In der Regel 3 Jahre",
            "Prüfungen: Zwischenprüfung und Abschlussprüfung",
            "Gehalt: Durchschnittlich 800-1.100€ im ersten Jahr, steigend mit jedem Ausbildungsjahr",
          ],
        };
      case "handwerk":
        return {
          title: "Handwerkliche Ausbildung",
          icon: <Briefcase className="w-5 h-5 mr-2" />,
          keyPoints: [
            "Betonen Sie Ihre handwerklichen Fähigkeiten und praktische Veranlagung",
            "Erwähnen Sie Ihre Genauigkeit und Sorgfalt bei der Arbeit",
            "Heben Sie körperliche Belastbarkeit und Ausdauer hervor",
            "Zeigen Sie Interesse an Materialien und Werkzeugen",
          ],
          keywords: [
            "Handwerkliches Geschick",
            "Sorgfalt",
            "Belastbarkeit",
            "Teamarbeit",
            "Kundenorientierung",
            "Zuverlässigkeit",
            "Qualitätsbewusstsein",
          ],
          expectations: [
            "Duale Ausbildung: Wechsel zwischen Berufsschule und Betrieb",
            "Ausbildungsdauer: In der Regel 3-3,5 Jahre",
            "Prüfungen: Gesellenprüfung am Ende der Ausbildung",
            "Gehalt: Durchschnittlich 700-900€ im ersten Jahr, steigend mit jedem Ausbildungsjahr",
          ],
        };
      default:
        return {
          title: "Ausbildung",
          icon: <GraduationCap className="w-5 h-5 mr-2" />,
          keyPoints: [
            "Betonen Sie Ihre Motivation und Ihr Interesse am Beruf",
            "Erwähnen Sie Ihre Lernbereitschaft und Anpassungsfähigkeit",
            "Heben Sie relevante Schulkenntnisse oder Praktika hervor",
            "Zeigen Sie Teamfähigkeit und Zuverlässigkeit",
          ],
          keywords: [
            "Motivation",
            "Lernbereitschaft",
            "Teamfähigkeit",
            "Zuverlässigkeit",
            "Engagement",
            "Flexibilität",
            "Kommunikationsfähigkeit",
          ],
          expectations: [
            "Duale Ausbildung: Wechsel zwischen Berufsschule und Betrieb",
            "Ausbildungsdauer: In der Regel 2-3,5 Jahre je nach Beruf",
            "Prüfungen: Meist Zwischen- und Abschlussprüfung",
            "Gehalt: Variiert je nach Branche und Ausbildungsjahr",
          ],
        };
    }
  };

  const industryInfo = getIndustrySpecificTips();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          {industryInfo.icon}
          Fokus: {industryInfo.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2">
            Schlüsselpunkte für Ihr Anschreiben:
          </h3>
          <ul className="space-y-2">
            {industryInfo.keyPoints.map((point, index) => (
              <li key={index} className="text-sm flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">
            Wichtige Schlüsselwörter:
          </h3>
          <div className="flex flex-wrap gap-2">
            {industryInfo.keywords.map((keyword, index) => (
              <Badge key={index} variant="outline">
                {keyword}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Was Sie erwarten können:</h3>
          <ul className="space-y-2">
            {industryInfo.expectations.map((exp, index) => (
              <li key={index} className="text-sm flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>{exp}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-2 border-t">
          <p className="text-xs text-muted-foreground mt-2">
            Diese Informationen sind speziell für Bewerber auf Ausbildungsplätze
            in Deutschland zusammengestellt. Passen Sie Ihr Anschreiben
            entsprechend an.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApprenticeshipFocus;
