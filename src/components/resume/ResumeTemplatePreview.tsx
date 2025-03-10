import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Check } from "lucide-react";

interface ResumeTemplatePreviewProps {
  templates: Array<{
    id: string;
    name: string;
    description?: string;
    thumbnail?: string;
  }>;
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
}

const ResumeTemplatePreview = ({
  templates,
  selectedTemplate,
  onSelectTemplate,
}: ResumeTemplatePreviewProps) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      {templates.map((template) => (
        <Card
          key={template.id}
          className={`overflow-hidden cursor-pointer transition-all ${selectedTemplate === template.id ? "ring-2 ring-primary scale-105" : "hover:shadow-md hover:scale-105"}`}
          onClick={() => onSelectTemplate(template.id)}
        >
          <div className="relative">
            <img
              src={
                template.thumbnail ||
                `https://via.placeholder.com/300x400?text=${template.name}`
              }
              alt={template.name}
              className="w-full h-40 object-cover transition-transform hover:opacity-90"
            />
            {selectedTemplate === template.id && (
              <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1 animate-pulse">
                <Check className="h-4 w-4" />
              </div>
            )}
          </div>
          <CardContent className="p-3">
            <h3 className="font-medium text-sm">{template.name}</h3>
            {template.description && (
              <p className="text-xs text-muted-foreground mt-1">
                {template.description}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ResumeTemplatePreview;
