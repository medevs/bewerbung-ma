import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Upload, ArrowRight, Check, X } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Progress } from "../ui/progress";

interface ResumeComparisonProps {
  resumeData: any;
}

const ResumeComparison = ({ resumeData }: ResumeComparisonProps) => {
  const [jobDescription, setJobDescription] = useState("");
  const [matchResults, setMatchResults] = useState<any>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const analyzeMatch = () => {
    if (!jobDescription) return;

    setAnalyzing(true);

    // Simulate analysis (in a real app, this would call an API)
    setTimeout(() => {
      // Extract skills from resume
      const resumeSkills =
        resumeData.itSkills?.map((skill) => skill.name.toLowerCase()) || [];

      // Extract experience keywords
      const experienceKeywords = [];
      resumeData.experience?.forEach((exp) => {
        if (exp.title) experienceKeywords.push(exp.title.toLowerCase());
        if (exp.company) experienceKeywords.push(exp.company.toLowerCase());
        exp.details?.forEach((detail) => {
          const words = detail.toLowerCase().split(/\s+/);
          words
            .filter((word) => word.length > 3)
            .forEach((word) => experienceKeywords.push(word));
        });
      });

      // Simple keyword matching (in a real app, use NLP)
      const jobKeywords = jobDescription
        .toLowerCase()
        .split(/\s+/)
        .filter((word) => word.length > 3);

      // Find matches
      const skillMatches = resumeSkills.filter((skill) =>
        jobKeywords.some(
          (keyword) => keyword.includes(skill) || skill.includes(keyword),
        ),
      );

      const experienceMatches = experienceKeywords.filter((keyword) =>
        jobKeywords.some(
          (jobKeyword) =>
            jobKeyword.includes(keyword) || keyword.includes(jobKeyword),
        ),
      );

      // Calculate match percentage
      const uniqueJobKeywords = [...new Set(jobKeywords)];
      const uniqueMatchedKeywords = [
        ...new Set([...skillMatches, ...experienceMatches]),
      ];
      const matchPercentage = Math.min(
        100,
        Math.round(
          (uniqueMatchedKeywords.length / uniqueJobKeywords.length) * 100,
        ),
      );

      setMatchResults({
        matchPercentage,
        skillMatches: [...new Set(skillMatches)],
        experienceMatches: [...new Set(experienceMatches)],
        missingKeywords: uniqueJobKeywords
          .filter(
            (keyword) =>
              !uniqueMatchedKeywords.some(
                (match) => match.includes(keyword) || keyword.includes(match),
              ),
          )
          .slice(0, 5), // Limit to top 5 missing keywords
      });

      setAnalyzing(false);
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Match Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="job-description">Paste Job Description</Label>
          <Textarea
            id="job-description"
            placeholder="Paste the job description here to analyze how well your resume matches..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        <Button
          onClick={analyzeMatch}
          disabled={!jobDescription || analyzing}
          className="w-full"
        >
          {analyzing ? "Analyzing..." : "Analyze Match"}
        </Button>

        {matchResults && (
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Match Score</span>
                <span className="text-sm font-medium">
                  {matchResults.matchPercentage}%
                </span>
              </div>
              <Progress value={matchResults.matchPercentage} className="h-2" />
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Matching Skills</h4>
              <div className="flex flex-wrap gap-2">
                {matchResults.skillMatches.length > 0 ? (
                  matchResults.skillMatches.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-full text-xs"
                    >
                      <Check className="h-3 w-3" />
                      {skill}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No matching skills found
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Missing Keywords</h4>
              <div className="flex flex-wrap gap-2">
                {matchResults.missingKeywords.length > 0 ? (
                  matchResults.missingKeywords.map((keyword, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 rounded-full text-xs"
                    >
                      <X className="h-3 w-3" />
                      {keyword}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No significant missing keywords
                  </p>
                )}
              </div>
            </div>

            <div className="pt-2">
              <p className="text-sm text-muted-foreground">
                Consider adding the missing keywords to your resume to improve
                your match score.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResumeComparison;
