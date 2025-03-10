import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  ExternalLink,
  BookOpen,
  Video,
  Headphones,
  MessageSquare,
} from "lucide-react";

const LanguageLearningTools = () => {
  const languageResources = [
    {
      id: "goethe",
      name: "Goethe-Institut",
      description:
        "Offizielle deutsche Kulturinstitution mit Online-Kursen und Lernmaterialien",
      level: ["A1", "A2", "B1", "B2", "C1", "C2"],
      type: "course",
      url: "https://www.goethe.de/de/spr/kur/onl.html",
      free: false,
      features: ["Zertifizierte Kurse", "Lehrmaterialien", "Übungen"],
    },
    {
      id: "dw",
      name: "Deutsche Welle",
      description: "Kostenlose Deutschkurse für Anfänger bis Fortgeschrittene",
      level: ["A1", "A2", "B1", "B2"],
      type: "course",
      url: "https://learngerman.dw.com/",
      free: true,
      features: [
        "Interaktive Übungen",
        "Videos",
        "Nachrichten in einfachem Deutsch",
      ],
    },
    {
      id: "duolingo",
      name: "Duolingo",
      description: "Spielerische App zum Deutschlernen für Anfänger",
      level: ["A1", "A2"],
      type: "app",
      url: "https://www.duolingo.com/",
      free: true,
      features: ["Gamification", "Tägliche Übungen", "Grundwortschatz"],
    },
    {
      id: "babbel",
      name: "Babbel",
      description:
        "Strukturierte Sprachkurse mit Fokus auf Alltagskommunikation",
      level: ["A1", "A2", "B1"],
      type: "app",
      url: "https://www.babbel.com/",
      free: false,
      features: ["Spracherkennung", "Dialogtraining", "Vokabeltrainer"],
    },
    {
      id: "youtube",
      name: "YouTube-Kanäle",
      description: "Kostenlose Lernvideos von deutschen Muttersprachlern",
      level: ["A1", "A2", "B1", "B2"],
      type: "video",
      url: "https://www.youtube.com/results?search_query=deutsch+lernen",
      free: true,
      features: ["Erklärvideos", "Ausspracheübungen", "Kulturelle Einblicke"],
    },
    {
      id: "tandem",
      name: "Tandem",
      description: "App zum Sprachaustausch mit Muttersprachlern",
      level: ["A1", "A2", "B1", "B2", "C1"],
      type: "exchange",
      url: "https://www.tandem.net/",
      free: true,
      features: ["Sprachpartner finden", "Chat", "Videoanrufe"],
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "course":
        return <BookOpen className="w-5 h-5 text-blue-500" />;
      case "app":
        return <MessageSquare className="w-5 h-5 text-green-500" />;
      case "video":
        return <Video className="w-5 h-5 text-red-500" />;
      case "exchange":
        return <Headphones className="w-5 h-5 text-purple-500" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Deutsch Lernen</h1>
      <p className="text-lg mb-8">
        Für eine erfolgreiche Ausbildung in Deutschland sind gute
        Deutschkenntnisse unerlässlich. Hier findest du Ressourcen, die dir beim
        Deutschlernen helfen können.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {languageResources.map((resource) => (
          <Card key={resource.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                {getTypeIcon(resource.type)}
                <CardTitle className="text-lg">{resource.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">{resource.description}</p>

              <div className="flex flex-wrap gap-2">
                {resource.level.map((level) => (
                  <Badge key={level} variant="outline">
                    {level}
                  </Badge>
                ))}
                <Badge
                  variant="outline"
                  className={
                    resource.free
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                      : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100"
                  }
                >
                  {resource.free ? "Kostenlos" : "Kostenpflichtig"}
                </Badge>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Features:</h4>
                <ul className="text-sm space-y-1">
                  {resource.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                variant="outline"
                className="w-full mt-2"
                onClick={() => window.open(resource.url, "_blank")}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Besuchen
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Sprachniveaus verstehen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-2">A1-A2: Anfänger</h3>
              <p className="text-sm">
                Grundlegende Kenntnisse für einfache Alltagssituationen. Für die
                meisten Ausbildungen benötigst du mindestens A2, besser B1.
              </p>
            </div>
            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-2">B1-B2: Fortgeschritten</h3>
              <p className="text-sm">
                Selbständige Sprachverwendung im Alltag und Beruf. B1 ist das
                Mindestniveau für die meisten Ausbildungen, B2 wird oft
                empfohlen.
              </p>
            </div>
            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-2">C1-C2: Experte</h3>
              <p className="text-sm">
                Kompetente bis nahezu muttersprachliche Kenntnisse. Für
                akademische Berufe und Studium oft erforderlich.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LanguageLearningTools;
