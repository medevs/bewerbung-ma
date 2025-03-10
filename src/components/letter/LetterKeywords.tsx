import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";

interface LetterKeywordsProps {
  jobPosting: string;
  onAddKeyword: (keyword: string) => void;
}

const LetterKeywords = ({ jobPosting, onAddKeyword }: LetterKeywordsProps) => {
  const [keywords, setKeywords] = useState<string[]>([]);

  useEffect(() => {
    if (jobPosting) {
      extractKeywords(jobPosting);
    } else {
      setKeywords([]);
    }
  }, [jobPosting]);

  const extractKeywords = (text: string) => {
    // This is a simple keyword extraction - in a real app, use NLP
    const commonWords = new Set([
      "and",
      "the",
      "to",
      "of",
      "in",
      "for",
      "with",
      "on",
      "at",
      "from",
      "by",
      "about",
      "as",
      "an",
      "our",
      "we",
      "us",
      "you",
      "your",
      "will",
      "can",
      "are",
      "is",
      "be",
      "have",
      "has",
      "had",
      "this",
      "that",
      "these",
      "those",
      "they",
      "them",
      "their",
    ]);

    // Extract words, filter common words, and get unique words
    const words = text
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(/\s+/)
      .filter((word) => word.length > 3 && !commonWords.has(word));

    // Count word frequency
    const wordCount = {};
    words.forEach((word) => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });

    // Sort by frequency and get top keywords
    const sortedWords = Object.entries(wordCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map((entry) => entry[0]);

    setKeywords(sortedWords);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Key Terms</CardTitle>
      </CardHeader>
      <CardContent>
        {keywords.length > 0 ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              These keywords appear frequently in the job posting. Consider
              including them in your letter:
            </p>
            <div className="flex flex-wrap gap-2">
              {keywords.map((keyword, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => onAddKeyword(keyword)}
                >
                  <PlusCircle className="h-3 w-3 mr-1" />
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Enter a job posting to extract key terms
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default LetterKeywords;
