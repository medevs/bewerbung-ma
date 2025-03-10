import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Lightbulb } from "lucide-react";

interface LetterCulturalTipsProps {
  targetCountry?: string;
  letterType?: string;
}

const LetterCulturalTips = ({
  targetCountry = "germany",
  letterType = "motivation",
}: LetterCulturalTipsProps) => {
  const getTips = () => {
    if (targetCountry === "germany" && letterType === "motivation") {
      return [
        "German motivation letters are typically more formal than in other countries",
        "Include your full address and the company's address at the top",
        "Use proper salutations like 'Sehr geehrte Damen und Herren' if you don't know the recipient's name",
        "Be concise and factual - German employers appreciate directness",
        "Mention specific qualifications that match the job requirements",
        "Reference your enclosed/attached resume (Lebenslauf)",
        "End with 'Mit freundlichen Grüßen' followed by your name",
        "For apprenticeships, emphasize your willingness to learn and your interest in the specific field",
      ];
    }
    return [];
  };

  const tips = getTips();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Lightbulb className="w-5 h-5 mr-2 text-amber-500" />
          Cultural Tips for German Applications
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {tips.map((tip, index) => (
            <li key={index} className="text-sm flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
        <p className="text-xs text-muted-foreground mt-4">
          These tips are specifically tailored for job applications in Germany,
          with a focus on applications for apprenticeships and training
          positions.
        </p>
      </CardContent>
    </Card>
  );
};

export default LetterCulturalTips;
