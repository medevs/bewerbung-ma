import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import {
  Plus,
  Calendar,
  Briefcase,
  Building,
  CheckCircle2,
  Clock,
  XCircle,
  FileText,
  Loader2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";

interface Application {
  id: string;
  company: string;
  position: string;
  date: string;
  status: "applied" | "interview" | "offer" | "rejected" | "pending";
  notes?: string;
  user_id?: string;
}

const JobApplicationTracker = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newApplication, setNewApplication] = useState<Partial<Application>>({
    company: "",
    position: "",
    date: new Date().toISOString().split("T")[0],
    status: "applied",
    notes: "",
  });

  useEffect(() => {
    loadApplications();
  }, [user]);

  const loadApplications = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .eq("user_id", user.id)
        .order("date", { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        setApplications(data);
      } else {
        // Load sample data if no applications exist
        const sampleApplications = [
          {
            id: "1",
            company: "TechCorp GmbH",
            position: "Ausbildung zum Fachinformatiker",
            date: new Date().toISOString().split("T")[0],
            status: "interview" as const,
            notes: "Telefoninterview am 25.10.2023",
            user_id: user.id,
          },
          {
            id: "2",
            company: "Digital Solutions AG",
            position: "IT-Systemkaufmann Ausbildung",
            date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
              .toISOString()
              .split("T")[0],
            status: "applied" as const,
            notes: "Bewerbung per E-Mail gesendet",
            user_id: user.id,
          },
          {
            id: "3",
            company: "Innovate GmbH",
            position: "Ausbildung zur Fachkraft für Lagerlogistik",
            date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000)
              .toISOString()
              .split("T")[0],
            status: "rejected" as const,
            notes: "Absage erhalten am 10.10.2023",
            user_id: user.id,
          },
        ];

        // Add sample applications to database
        const { error: insertError } = await supabase
          .from("applications")
          .insert(sampleApplications);

        if (insertError) throw insertError;
        setApplications(sampleApplications);
      }
    } catch (error) {
      console.error("Error loading applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddApplication = async () => {
    if (!user) return;
    if (!newApplication.company || !newApplication.position) {
      alert("Bitte fülle alle Pflichtfelder aus.");
      return;
    }

    setLoading(true);
    try {
      const applicationData = {
        ...newApplication,
        user_id: user.id,
        id: Date.now().toString(),
      };

      const { error } = await supabase
        .from("applications")
        .insert([applicationData]);

      if (error) throw error;

      setApplications([applicationData as Application, ...applications]);
      setDialogOpen(false);
      setNewApplication({
        company: "",
        position: "",
        date: new Date().toISOString().split("T")[0],
        status: "applied",
        notes: "",
      });
    } catch (error) {
      console.error("Error adding application:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (
    id: string,
    newStatus: Application["status"],
  ) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("applications")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;

      setApplications(
        applications.map((app) =>
          app.id === id ? { ...app, status: newStatus } : app,
        ),
      );
    } catch (error) {
      console.error("Error updating application status:", error);
    } finally {
      setLoading(false);
    }
  };

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

  const getApplicationStats = () => {
    const total = applications.length;
    const applied = applications.filter(
      (app) => app.status === "applied",
    ).length;
    const interviews = applications.filter(
      (app) => app.status === "interview",
    ).length;
    const offers = applications.filter((app) => app.status === "offer").length;
    const rejected = applications.filter(
      (app) => app.status === "rejected",
    ).length;
    const pending = applications.filter(
      (app) => app.status === "pending",
    ).length;

    const interviewRate =
      total > 0 ? Math.round((interviews / total) * 100) : 0;
    const offerRate =
      interviews > 0 ? Math.round((offers / interviews) * 100) : 0;

    return {
      total,
      applied,
      interviews,
      offers,
      rejected,
      pending,
      interviewRate,
      offerRate,
    };
  };

  const stats = getApplicationStats();

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Bewerbungsverfolgung</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Bewerbungsübersicht</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Gesamt</span>
                <span className="font-bold">{stats.total}</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-blue-500" />
                    Beworben
                  </span>
                  <span>{stats.applied}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-amber-500" />
                    Vorstellungsgespräch
                  </span>
                  <span>{stats.interviews}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" />
                    Angebot erhalten
                  </span>
                  <span>{stats.offers}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center">
                    <XCircle className="h-4 w-4 mr-1 text-red-500" />
                    Abgelehnt
                  </span>
                  <span>{stats.rejected}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Erfolgsraten</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Vorstellungsgespräche</span>
                  <span className="text-sm font-medium">
                    {stats.interviewRate}%
                  </span>
                </div>
                <Progress value={stats.interviewRate} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {stats.interviews} von {stats.total} Bewerbungen führten zu
                  einem Gespräch
                </p>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Angebote</span>
                  <span className="text-sm font-medium">
                    {stats.offerRate}%
                  </span>
                </div>
                <Progress value={stats.offerRate} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {stats.offers} von {stats.interviews} Gesprächen führten zu
                  einem Angebot
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Meine Bewerbungen</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Neue Bewerbung
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Neue Bewerbung hinzufügen</DialogTitle>
              <DialogDescription>
                Füge eine neue Bewerbung zu deiner Verfolgungsliste hinzu.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="company">Unternehmen</Label>
                <Input
                  id="company"
                  value={newApplication.company}
                  onChange={(e) =>
                    setNewApplication({
                      ...newApplication,
                      company: e.target.value,
                    })
                  }
                  placeholder="z.B. TechSolutions GmbH"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  value={newApplication.position}
                  onChange={(e) =>
                    setNewApplication({
                      ...newApplication,
                      position: e.target.value,
                    })
                  }
                  placeholder="z.B. Ausbildung zum Fachinformatiker"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Datum</Label>
                <Input
                  id="date"
                  type="date"
                  value={newApplication.date}
                  onChange={(e) =>
                    setNewApplication({
                      ...newApplication,
                      date: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={newApplication.status}
                  onValueChange={(value: Application["status"]) =>
                    setNewApplication({
                      ...newApplication,
                      status: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Status auswählen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">In Vorbereitung</SelectItem>
                    <SelectItem value="applied">Beworben</SelectItem>
                    <SelectItem value="interview">
                      Vorstellungsgespräch
                    </SelectItem>
                    <SelectItem value="offer">Angebot erhalten</SelectItem>
                    <SelectItem value="rejected">Abgelehnt</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notizen</Label>
                <Textarea
                  id="notes"
                  value={newApplication.notes}
                  onChange={(e) =>
                    setNewApplication({
                      ...newApplication,
                      notes: e.target.value,
                    })
                  }
                  placeholder="Zusätzliche Informationen zur Bewerbung"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddApplication} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Speichern...
                  </>
                ) : (
                  "Hinzufügen"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {loading && applications.length === 0 ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="ml-2">Bewerbungen werden geladen...</span>
        </div>
      ) : applications.length > 0 ? (
        <div className="space-y-4">
          {applications.map((application) => (
            <Card key={application.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={getStatusColor(application.status)}
                      >
                        <span className="flex items-center">
                          {getStatusIcon(application.status)}
                          <span className="ml-1">
                            {application.status === "applied"
                              ? "Beworben"
                              : application.status === "interview"
                                ? "Vorstellungsgespräch"
                                : application.status === "offer"
                                  ? "Angebot erhalten"
                                  : application.status === "rejected"
                                    ? "Abgelehnt"
                                    : "In Vorbereitung"}
                          </span>
                        </span>
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {new Date(application.date).toLocaleDateString("de-DE")}
                      </span>
                    </div>
                    <h3 className="font-semibold">{application.position}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Building className="h-4 w-4 mr-1" />
                      {application.company}
                    </div>
                    {application.notes && (
                      <p className="text-sm mt-2">{application.notes}</p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 sm:flex-col sm:items-end">
                    <Select
                      value={application.status}
                      onValueChange={(value: Application["status"]) =>
                        handleUpdateStatus(application.id, value)
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Status ändern" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">In Vorbereitung</SelectItem>
                        <SelectItem value="applied">Beworben</SelectItem>
                        <SelectItem value="interview">
                          Vorstellungsgespräch
                        </SelectItem>
                        <SelectItem value="offer">Angebot erhalten</SelectItem>
                        <SelectItem value="rejected">Abgelehnt</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border rounded-md">
          <p className="text-muted-foreground mb-4">
            Du hast noch keine Bewerbungen hinzugefügt.
          </p>
          <Button
            onClick={() => setDialogOpen(true)}
            variant="outline"
            className="mx-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Erste Bewerbung hinzufügen
          </Button>
        </div>
      )}
    </div>
  );
};

export default JobApplicationTracker;
