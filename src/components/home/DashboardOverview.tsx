import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import {
  FileText,
  Briefcase,
  MessageSquare,
  Users,
  ExternalLink,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/index.tsx";

const DashboardOverview = () => {
  const { t } = useLanguage();
  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        {t("dashboard.welcome", "Willkommen bei deinem Ausbildungsassistenten")}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">
              {t(
                "dashboard.pathToTraining",
                "Dein Weg zur Ausbildung in Deutschland",
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              {t(
                "dashboard.supportMessage",
                "Wir unterstützen dich bei jedem Schritt auf deinem Weg zu einer erfolgreichen Ausbildung in Deutschland - von der Bewerbung bis zum Visum.",
              )}
            </p>
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="outline" size="sm">
                <Link to="/ausbildung-finder">
                  <Briefcase className="w-4 h-4 mr-2" />
                  {t(
                    "jobs.ausbildung.findPositions",
                    "Ausbildungsplätze finden",
                  )}
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link to="/jobs">
                  <Briefcase className="w-4 h-4 mr-2" />
                  {t("jobs.findJobs", "Jobs finden")}
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link to="/visa-guide">
                  <FileText className="w-4 h-4 mr-2" />
                  {t("visa.guide")}
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">
              {t(
                "dashboard.createApplicationDocs",
                "Bewerbungsunterlagen erstellen",
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              {t(
                "dashboard.createDocsMessage",
                "Erstelle professionelle Bewerbungsunterlagen, die auf den deutschen Arbeitsmarkt zugeschnitten sind.",
              )}
            </p>
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="outline" size="sm">
                <Link to="/resume/new">
                  <FileText className="w-4 h-4 mr-2" />
                  {t("resume.create", "Lebenslauf erstellen")}
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link to="/letter/new">
                  <FileText className="w-4 h-4 mr-2" />
                  {t("letter.create", "Anschreiben erstellen")}
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-semibold mb-4">
        {t("dashboard.nextSteps", "Nächste Schritte")}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 flex flex-col items-center text-center">
            <Briefcase className="w-8 h-8 text-primary mb-2" />
            <h3 className="font-medium mb-1">
              {t("jobs.ausbildung.findPosition", "Ausbildungsplatz finden")}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t(
                "jobs.ausbildung.findWithVisa",
                "Finde passende Ausbildungsplätze mit Visum-Unterstützung",
              )}
            </p>
            <Button asChild variant="link" className="mt-auto">
              <Link to="/ausbildung-finder">
                {t("common.searchNow", "Jetzt suchen")}
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex flex-col items-center text-center">
            <FileText className="w-8 h-8 text-primary mb-2" />
            <h3 className="font-medium mb-1">
              {t("dashboard.prepareApplication", "Bewerbung vorbereiten")}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t(
                "dashboard.createGermanDocs",
                "Erstelle einen deutschen Lebenslauf und Anschreiben",
              )}
            </p>
            <Button asChild variant="link" className="mt-auto">
              <Link to="/resume/new">
                {t("resume.create", "Lebenslauf erstellen")}
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex flex-col items-center text-center">
            <MessageSquare className="w-8 h-8 text-primary mb-2" />
            <h3 className="font-medium mb-1">
              {t("interview.prepareInterview", "Interview vorbereiten")}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t(
                "interview.prepareForGerman",
                "Bereite dich auf deutsche Vorstellungsgespräche vor",
              )}
            </p>
            <Button asChild variant="link" className="mt-auto">
              <Link to="/interview-preparation">
                {t("interview.startPractice", "Übungen starten")}
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex flex-col items-center text-center">
            <Users className="w-8 h-8 text-primary mb-2" />
            <h3 className="font-medium mb-1">
              {t("culture.understandCulture", "Kultur verstehen")}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t(
                "culture.learnGermanCulture",
                "Lerne die deutsche Kultur und Arbeitsweise kennen",
              )}
            </p>
            <Button asChild variant="link" className="mt-auto">
              <Link to="/german-culture">
                {t("culture.cultureGuide", "Kulturguide")}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-semibold mb-4">
        {t("dashboard.helpfulResources", "Hilfreiche Ressourcen")}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium flex items-center mb-2">
              <FileText className="w-4 h-4 mr-2 text-primary" />
              {t("language.onlineCourses", "Deutschkurse online")}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              {t(
                "language.freeCourses",
                "Kostenlose Deutschkurse für Anfänger bis Fortgeschrittene",
              )}
            </p>
            <Button
              variant="link"
              size="sm"
              className="p-0 h-auto"
              onClick={() =>
                window.open(
                  "https://www.goethe.de/de/spr/kup/kur/onl.html",
                  "_blank",
                )
              }
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              {t("language.toGoetheInstitut", "Zum Goethe-Institut")}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium flex items-center mb-2">
              <FileText className="w-4 h-4 mr-2 text-primary" />
              {t("dashboard.recognitionProcess", "Anerkennungsverfahren")}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              {t(
                "dashboard.recognitionInfo",
                "Informationen zur Anerkennung ausländischer Abschlüsse",
              )}
            </p>
            <Button
              variant="link"
              size="sm"
              className="p-0 h-auto"
              onClick={() =>
                window.open(
                  "https://www.anerkennung-in-deutschland.de",
                  "_blank",
                )
              }
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              {t("common.toWebsite", "Zur Webseite")}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium flex items-center mb-2">
              <FileText className="w-4 h-4 mr-2 text-primary" />
              {t("dashboard.trainingConsultation", "Ausbildungsberatung")}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              {t(
                "dashboard.personalConsultation",
                "Persönliche Beratung zu Ausbildungsmöglichkeiten in Deutschland",
              )}
            </p>
            <Button
              variant="link"
              size="sm"
              className="p-0 h-auto"
              onClick={() =>
                window.open("https://www.make-it-in-germany.com", "_blank")
              }
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              {t("dashboard.makeItInGermany", "Make it in Germany")}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
