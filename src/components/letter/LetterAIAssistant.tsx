import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Wand2, Sparkles, Loader2 } from "lucide-react";
import { generateMotivationLetter } from "@/lib/openai";

interface LetterAIAssistantProps {
  resumeData: any;
  jobPosting: string;
  onGenerateContent: (content: string) => void;
}

const LetterAIAssistant = ({
  resumeData,
  jobPosting,
  onGenerateContent,
}: LetterAIAssistantProps) => {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const generateSuggestions = async () => {
    if (!jobPosting) {
      alert("Please enter job posting details first");
      return;
    }

    setLoading(true);
    try {
      // Generate 3 different opening paragraphs
      const prompt = `Generate 3 different opening paragraphs for a motivation letter for this job posting:\n\n${jobPosting}\n\nMake them concise, professional, and slightly different in approach. Label them as Option 1, Option 2, and Option 3.`;

      const result = await generateMotivationLetter({
        jobPosting: prompt,
        resumeData,
      });

      // Split the result into separate suggestions
      const options = result
        .split(/Option [123]:/g)
        .filter(Boolean)
        .map((s) => s.trim());
      setSuggestions(options);
    } catch (error) {
      console.error("Error generating suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    onGenerateContent(suggestion);
  };

  const handleGenerateContent = async () => {
    setLoading(true);
    try {
      // In a real implementation, this would call the OpenAI API
      // For now, we'll simulate an API call with a timeout
      setTimeout(() => {
        let generatedText = `Hiermit bewerbe ich mich um die ausgeschriebene Stelle als ${resumeData.position || "[Position]"} in Ihrem Unternehmen ${resumeData.company || "[Unternehmen]"}.

`;

        // Add job posting specific content if available
        if (jobPosting && jobPosting.length > 10) {
          generatedText += `Ihre Stellenausschreibung hat mein Interesse geweckt, da sie genau meinen beruflichen Zielen und Qualifikationen entspricht. `;
        }

        generatedText += `Während meiner bisherigen Ausbildung und beruflichen Laufbahn konnte ich bereits wertvolle Erfahrungen sammeln, die ich gerne in Ihr Unternehmen einbringen möchte. `;

        // Add more personalized content based on the position
        if (resumeData.position) {
          if (
            resumeData.position.toLowerCase().includes("entwickl") ||
            resumeData.position.toLowerCase().includes("program") ||
            resumeData.position.toLowerCase().includes("software")
          ) {
            generatedText += `Besonders meine Kenntnisse in der Softwareentwicklung, Problemlösung und im teamorientierten Arbeiten entsprechen den Anforderungen, die Sie in Ihrer Stellenausschreibung genannt haben.`;
          } else if (
            resumeData.position.toLowerCase().includes("pflege") ||
            resumeData.position.toLowerCase().includes("gesundheit")
          ) {
            generatedText += `Besonders meine Empathie, Sorgfalt und Belastbarkeit sowie mein Interesse an der Arbeit mit Menschen entsprechen den Anforderungen, die Sie in Ihrer Stellenausschreibung genannt haben.`;
          } else if (
            resumeData.position.toLowerCase().includes("verkauf") ||
            resumeData.position.toLowerCase().includes("einzelhandel")
          ) {
            generatedText += `Besonders meine Kommunikationsstärke, Kundenorientierung und mein Verkaufstalent entsprechen den Anforderungen, die Sie in Ihrer Stellenausschreibung genannt haben.`;
          } else {
            generatedText += `Besonders meine Fachkenntnisse, Teamfähigkeit und Motivation entsprechen den Anforderungen, die Sie in Ihrer Stellenausschreibung genannt haben.`;
          }
        } else {
          generatedText += `Besonders meine Fachkenntnisse, Teamfähigkeit und Motivation entsprechen den Anforderungen, die Sie in Ihrer Stellenausschreibung genannt haben.`;
        }

        generatedText += `\n\nIch bin davon überzeugt, dass meine Fähigkeiten und mein Engagement eine Bereicherung für Ihr Team darstellen würden. `;

        // Add company specific content if available
        if (resumeData.company) {
          generatedText += `Besonders reizt mich an ${resumeData.company} der gute Ruf als Arbeitgeber und die Möglichkeit, in einem innovativen Umfeld zu arbeiten.`;
        } else {
          generatedText += `Besonders reizt mich an der Stelle die Möglichkeit, meine Fähigkeiten weiterzuentwickeln und Teil eines erfolgreichen Teams zu werden.`;
        }

        generatedText += `\n\nIch freue mich auf die Möglichkeit, mich persönlich bei Ihnen vorzustellen und stehe für Rückfragen jederzeit zur Verfügung.`;

        onGenerateContent(generatedText);
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Error generating content:", error);
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Sparkles className="w-5 h-5 mr-2 text-primary" />
          AI Writing Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Get AI-powered suggestions for your motivation letter based on the job
          posting and your resume.
        </p>

        <Button
          onClick={generateSuggestions}
          disabled={loading || !jobPosting}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating suggestions...
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4 mr-2" />
              Generate Opening Paragraphs
            </>
          )}
        </Button>

        <Button
          onClick={handleGenerateContent}
          disabled={loading}
          className="w-full"
          variant="outline"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating full letter...
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4 mr-2" />
              Generate Complete Letter
            </>
          )}
        </Button>

        {suggestions.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium">
              Choose an opening paragraph:
            </h4>
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="p-3 border rounded-md hover:bg-accent"
              >
                <p className="text-sm mb-2">
                  {suggestion.substring(0, 150)}...
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSelectSuggestion(suggestion)}
                >
                  Use this
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LetterAIAssistant;
