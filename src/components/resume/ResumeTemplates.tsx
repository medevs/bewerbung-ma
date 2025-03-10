import React from "react";
import { useLanguage } from "@/lib/i18n/index.tsx";
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
    id: "modern",
    name: "Modern",
    description: "Clean and contemporary design with a focus on readability",
    thumbnail:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=300&h=400&fit=crop",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Traditional layout perfect for corporate positions",
    thumbnail:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=400&fit=crop",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Stand out with a unique and artistic design",
    thumbnail:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=300&h=400&fit=crop",
  },
];

interface ResumeTemplatesProps {
  onSelectTemplate: (templateId: string) => void;
}

export function ResumeTemplates({ onSelectTemplate }: ResumeTemplatesProps) {
  const { t } = useLanguage();

  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Vorlagen</h2>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        dir="ltr"
      >
        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
          <img
            src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=300&h=200&fit=crop"
            alt="Professional template"
            className="w-full h-40 object-cover"
          />
          <CardContent className="p-4">
            <h3 className="font-medium">Professionell</h3>
            <p className="text-sm text-muted-foreground">
              Klassisches Design für alle Branchen
            </p>
            <Button
              onClick={() => onSelectTemplate("professional")}
              className="w-full mt-4"
            >
              Verwenden
            </Button>
          </CardContent>
        </Card>

        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
          <img
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=200&fit=crop"
            alt="Modern template"
            className="w-full h-40 object-cover"
          />
          <CardContent className="p-4">
            <h3 className="font-medium">Modern</h3>
            <p className="text-sm text-muted-foreground">
              Zeitgemäßes Design mit farbigen Akzenten
            </p>
            <Button
              onClick={() => onSelectTemplate("modern")}
              className="w-full mt-4"
            >
              Verwenden
            </Button>
          </CardContent>
        </Card>

        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
          <img
            src="https://images.unsplash.com/photo-1626785774573-4b799315345d?w=300&h=200&fit=crop"
            alt="Creative template"
            className="w-full h-40 object-cover"
          />
          <CardContent className="p-4">
            <h3 className="font-medium">Kreativ</h3>
            <p className="text-sm text-muted-foreground">
              Auffälliges Design für kreative Berufe
            </p>
            <Button
              onClick={() => onSelectTemplate("creative")}
              className="w-full mt-4"
            >
              Verwenden
            </Button>
          </CardContent>
        </Card>

        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
          <img
            src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=300&h=200&fit=crop"
            alt="German style template"
            className="w-full h-40 object-cover"
          />
          <CardContent className="p-4">
            <h3 className="font-medium">Deutscher Stil</h3>
            <p className="text-sm text-muted-foreground">
              Traditionelles deutsches Bewerbungsformat
            </p>
            <Button
              onClick={() => onSelectTemplate("german")}
              className="w-full mt-4"
            >
              Verwenden
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
