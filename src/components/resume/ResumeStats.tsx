import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";

interface ResumeStatsProps {
  resumeData: any;
}

const ResumeStats = ({ resumeData }: ResumeStatsProps) => {
  // Calculate completion percentage
  const calculateCompletion = () => {
    const sections = [
      {
        name: "Personal Info",
        fields: ["firstName", "lastName", "email", "phone", "address", "city"],
        weight: 20,
      },
      {
        name: "Experience",
        items: resumeData.experience,
        minItems: 1,
        weight: 30,
      },
      {
        name: "Education",
        items: resumeData.education,
        minItems: 1,
        weight: 20,
      },
      { name: "Skills", items: resumeData.itSkills, minItems: 2, weight: 15 },
      {
        name: "Languages",
        items: resumeData.languages,
        minItems: 1,
        weight: 15,
      },
    ];

    let totalScore = 0;

    sections.forEach((section) => {
      if (section.fields) {
        const filledFields = section.fields.filter(
          (field) => resumeData[field] && resumeData[field].trim() !== "",
        ).length;
        const fieldScore =
          (filledFields / section.fields.length) * section.weight;
        totalScore += fieldScore;
      } else if (section.items) {
        const items = Array.isArray(section.items) ? section.items : [];
        const itemScore =
          Math.min(items.length / section.minItems, 1) * section.weight;
        totalScore += itemScore;
      }
    });

    return Math.round(totalScore);
  };

  const completion = calculateCompletion();

  // Get suggestions based on completion
  const getSuggestions = () => {
    const suggestions = [];

    if (!resumeData.firstName || !resumeData.lastName) {
      suggestions.push("Add your full name");
    }

    if (!resumeData.email) {
      suggestions.push("Add your email address");
    }

    if (
      !Array.isArray(resumeData.experience) ||
      resumeData.experience.length === 0
    ) {
      suggestions.push("Add at least one work experience");
    } else if (
      resumeData.experience.some(
        (exp) => !exp.details || exp.details.length === 0,
      )
    ) {
      suggestions.push("Add details to your work experiences");
    }

    if (
      !Array.isArray(resumeData.education) ||
      resumeData.education.length === 0
    ) {
      suggestions.push("Add your educational background");
    }

    if (!Array.isArray(resumeData.itSkills) || resumeData.itSkills.length < 3) {
      suggestions.push("Add more technical skills (aim for at least 3)");
    }

    if (
      !Array.isArray(resumeData.languages) ||
      resumeData.languages.length === 0
    ) {
      suggestions.push("Add language proficiencies");
    }

    return suggestions.length > 0 ? suggestions : ["Your resume looks great!"];
  };

  const suggestions = getSuggestions();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resume Completeness</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Completion</span>
            <span className="text-sm font-medium">{completion}%</span>
          </div>
          <Progress value={completion} className="h-2" />
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Suggestions to improve:</h4>
          <ul className="text-sm space-y-1">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="text-muted-foreground">
                • {suggestion}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumeStats;
