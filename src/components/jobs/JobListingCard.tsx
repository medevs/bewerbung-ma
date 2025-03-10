import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  MapPin,
  Briefcase,
  Building,
  ExternalLink,
  Wand2,
  Calendar,
} from "lucide-react";

interface JobListingCardProps {
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    description: string;
    requirements?: string[];
    benefits?: string[];
    startDate?: string;
    duration?: string;
    url: string;
    visaSponsorship?: boolean;
    accommodation?: boolean;
    tags?: string[];
    applied?: boolean;
    created_at?: string;
  };
  onGenerateLetter: (job: any) => void;
}

const JobListingCard = ({ job, onGenerateLetter }: JobListingCardProps) => {
  return (
    <Card key={job.id} className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold">{job.title}</h3>
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Building className="w-4 h-4 mr-1" />
                  {job.company}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {job.location}
                </div>
                {job.duration && (
                  <div className="flex items-center">
                    <Briefcase className="w-4 h-4 mr-1" />
                    {job.duration}
                  </div>
                )}
                {job.startDate && (
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Start: {job.startDate}
                  </div>
                )}
              </div>
            </div>

            <p className="text-sm">{job.description}</p>

            {job.requirements && job.requirements.length > 0 && (
              <div>
                <h4 className="font-medium mb-1">Anforderungen:</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            )}

            {job.benefits && job.benefits.length > 0 && (
              <div>
                <h4 className="font-medium mb-1">Vorteile:</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {job.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-wrap gap-2 mt-2">
              {job.visaSponsorship && (
                <Badge
                  variant="outline"
                  className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                >
                  Visum-Unterstützung
                </Badge>
              )}
              {job.accommodation && (
                <Badge
                  variant="outline"
                  className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                >
                  Unterkunft angeboten
                </Badge>
              )}
              {job.tags &&
                job.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">
                    {tag}
                  </Badge>
                ))}
            </div>
          </div>

          <div className="flex flex-row md:flex-col gap-2 mt-4 md:mt-0 md:min-w-[180px]">
            <Button
              onClick={() => onGenerateLetter(job)}
              className="flex-1 md:w-full"
            >
              <Wand2 className="w-4 h-4 mr-2" />
              Anschreiben erstellen
            </Button>
            <Button
              variant="outline"
              className="flex-1 md:w-full"
              onClick={() => window.open(job.url, "_blank")}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Mehr Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobListingCard;
