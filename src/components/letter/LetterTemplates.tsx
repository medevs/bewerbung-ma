import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
}

const templates: Template[] = [
  {
    id: "formal",
    name: "Formal",
    description: "Traditional business letter format with formal language",
    thumbnail:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=300&h=400&fit=crop",
  },
  {
    id: "modern",
    name: "Modern",
    description: "Contemporary design with a professional tone",
    thumbnail:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=400&fit=crop",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Unique format to showcase personality and passion",
    thumbnail:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=300&h=400&fit=crop",
  },
];

interface LetterTemplatesProps {
  onSelectTemplate: (templateId: string) => void;
}

export function LetterTemplates({ onSelectTemplate }: LetterTemplatesProps) {
  return (
    <div className="grid grid-cols-1 gap-6">
      {templates.map((template) => (
        <Card
          key={template.id}
          className="overflow-hidden hover:shadow-lg transition-all hover:scale-105 border"
        >
          <img
            src={template.thumbnail}
            alt={template.name}
            className="w-full h-40 object-cover transition-transform hover:opacity-90"
          />
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-2">{template.name}</h3>
            <p className="text-muted-foreground text-sm mb-4">
              {template.description}
            </p>
            <Button
              onClick={() => onSelectTemplate(template.id)}
              className="w-full"
              variant="outline"
            >
              Use Template
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default LetterTemplates;
