import React, { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Loader2, Upload } from "lucide-react";
import { openai } from "@/lib/openai";

const ResumeValidator = () => {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string>("");
  const [selectedResume, setSelectedResume] = useState<string>("");

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedResume(event.target?.result as string);
    };
    reader.readAsText(file);
  };

  const analyzeResume = async () => {
    if (!selectedResume) return;

    setLoading(true);
    try {
      // Extract key information from the resume to reduce token count
      const resumeText = selectedResume.slice(0, 4000); // Limit text length

      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "You are a professional resume reviewer. Provide concise, actionable feedback in these areas:\n1. Content & Structure\n2. Impact & Achievements\n3. Skills & Qualifications\n4. Overall Impression & Suggestions",
          },
          {
            role: "user",
            content: `Please analyze this resume excerpt and provide specific, actionable feedback:\n\n${resumeText}`,
          },
        ],
        model: "gpt-3.5-turbo",
        temperature: 0.7,
        max_tokens: 800,
      });

      setFeedback(completion.choices[0].message.content || "");
    } catch (error: any) {
      console.error("Error analyzing resume:", error);
      setFeedback(
        error?.message || "Error analyzing resume. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Resume Validator</h1>

      <Card className="p-6 mb-6">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept=".txt"
              onChange={handleResumeUpload}
              className="hidden"
              id="resume-upload"
            />
            <Button
              onClick={() => document.getElementById("resume-upload")?.click()}
              variant="outline"
              className="w-full"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Resume
            </Button>
            <Button
              onClick={analyzeResume}
              disabled={!selectedResume || loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Analyze Resume"
              )}
            </Button>
          </div>

          {selectedResume && (
            <div className="p-4 border rounded-lg bg-muted">
              <p className="text-sm text-muted-foreground">
                Resume uploaded successfully! Click "Analyze Resume" to get
                feedback.
              </p>
            </div>
          )}
        </div>
      </Card>

      {feedback && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
          <div className="prose prose-sm max-w-none">
            {feedback.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default ResumeValidator;
