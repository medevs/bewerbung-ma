import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import {
  Plus,
  Calendar,
  Briefcase,
  Building,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";

interface Application {
  id: string;
  company: string;
  position: string;
  date: string;
  status: "applied" | "interview" | "offer" | "rejected" | "pending";
  notes?: string;
}

interface ApplicationTrackerProps {
  applications?: Application[];
  onAddApplication?: () => void;
}

const ApplicationTracker = ({
  applications = [
    {
      id: "1",
      company: "TechCorp GmbH",
      position: "Ausbildung zum Fachinformatiker",
      date: "2023-10-15",
      status: "interview",
      notes: "Telefoninterview am 25.10.2023",
    },
    {
      id: "2",
      company: "Digital Solutions AG",
      position: "IT-Systemkaufmann Ausbildung",
      date: "2023-10-10",
      status: "applied",
      notes: "Bewerbung per E-Mail gesendet",
    },
    {
      id: "3",
      company: "Innovate GmbH",
      position: "Ausbildung zur Fachkraft für Lagerlogistik",
      date: "2023-09-28",
      status: "rejected",
      notes: "Absage erhalten am 10.10.2023",
    },
  ] as Application[],
  onAddApplication = () => {},
}: ApplicationTrackerProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "applied":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
      case "interview":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100";
      case "offer":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
      case "pending":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "applied":
        return <Clock className="h-3 w-3" />;
      case "interview":
        return <Calendar className="h-3 w-3" />;
      case "offer":
        return <CheckCircle2 className="h-3 w-3" />;
      case "rejected":
        return <XCircle className="h-3 w-3" />;
      case "pending":
        return <Clock className="h-3 w-3" />;
      default:
        return <Clock className="h-3 w-3" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "applied":
        return "Beworben";
      case "interview":
        return "Interview";
      case "offer":
        return "Angebot";
      case "rejected":
        return "Abgelehnt";
      case "pending":
        return "Ausstehend";
      default:
        return status;
    }
  };

  // Calculate statistics
  const totalApplications = applications.length;
  const interviewRate =
    Math.round(
      (applications.filter(
        (app) => app.status === "interview" || app.status === "offer",
      ).length /
        totalApplications) *
        100,
    ) || 0;
  const successRate =
    Math.round(
      (applications.filter((app) => app.status === "offer").length /
        totalApplications) *
        100,
    ) || 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Bewerbungsverfolgung</CardTitle>
        <Button size="sm" variant="outline" onClick={onAddApplication}>
          <Plus className="h-4 w-4 mr-1" /> Neue Bewerbung
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Statistics */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-muted p-3 rounded-md text-center">
            <p className="text-2xl font-bold">{totalApplications}</p>
            <p className="text-xs text-muted-foreground">Bewerbungen</p>
          </div>
          <div className="bg-muted p-3 rounded-md text-center">
            <p className="text-2xl font-bold">{interviewRate}%</p>
            <p className="text-xs text-muted-foreground">Interview-Rate</p>
          </div>
          <div className="bg-muted p-3 rounded-md text-center">
            <p className="text-2xl font-bold">{successRate}%</p>
            <p className="text-xs text-muted-foreground">Erfolgsrate</p>
          </div>
        </div>

        {/* Recent Applications */}
        <div>
          <h3 className="text-sm font-medium mb-2">Letzte Bewerbungen</h3>
          <div className="space-y-3">
            {applications.map((app) => (
              <div
                key={app.id}
                className="border rounded-md p-3 hover:bg-accent transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-sm">{app.position}</h4>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Building className="h-3 w-3 mr-1" />
                      {app.company}
                    </div>
                  </div>
                  <div
                    className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${getStatusColor(app.status)}`}
                  >
                    {getStatusIcon(app.status)}
                    {getStatusText(app.status)}
                  </div>
                </div>
                {app.notes && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {app.notes}
                  </p>
                )}
                <div className="text-xs text-muted-foreground mt-2">
                  Datum: {new Date(app.date).toLocaleDateString("de-DE")}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <p className="text-xs text-muted-foreground">
            Verfolgen Sie Ihre Bewerbungen für Ausbildungsplätze und behalten
            Sie den Überblick über Ihren Bewerbungsprozess.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationTracker;
