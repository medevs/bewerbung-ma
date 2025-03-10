import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import {
  FileText,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Download,
  ExternalLink,
} from "lucide-react";

const VisaGuide = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    passport: false,
    photos: false,
    application: false,
    contract: false,
    insurance: false,
    finances: false,
    certificates: false,
    language: false,
  });

  const handleCheckItem = (id: string, checked: boolean) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  const calculateProgress = () => {
    const totalItems = Object.keys(checkedItems).length;
    const checkedCount = Object.values(checkedItems).filter(Boolean).length;
    return Math.round((checkedCount / totalItems) * 100);
  };

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Visum & Aufenthaltserlaubnis Guide
      </h1>

      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="mb-6 w-full flex flex-wrap">
          <TabsTrigger value="overview" className="flex-1 sm:flex-none">
            Überblick
          </TabsTrigger>
          <TabsTrigger value="requirements" className="flex-1 sm:flex-none">
            Voraussetzungen
          </TabsTrigger>
          <TabsTrigger value="process" className="flex-1 sm:flex-none">
            Prozess
          </TabsTrigger>
          <TabsTrigger value="checklist" className="flex-1 sm:flex-none">
            Checkliste
          </TabsTrigger>
          <TabsTrigger value="faq" className="flex-1 sm:flex-none">
            FAQ
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ausbildungsvisum für marokkanische Bewerber</CardTitle>
              <CardDescription>
                Alles, was du über das Visum für eine Ausbildung in Deutschland
                wissen musst
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <p>
                  Als marokkanischer Staatsbürger benötigst du ein nationales
                  Visum (D-Visum) für eine Ausbildung in Deutschland. Dieses
                  Visum erlaubt dir, nach Deutschland einzureisen und dort eine
                  Ausbildung zu beginnen.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Vorteile einer Ausbildung in Deutschland
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Hohe Qualität der dualen Ausbildung</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Vergütung während der Ausbildung</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Gute Jobaussichten nach Abschluss</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Möglichkeit zur dauerhaften Niederlassung</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>
                            Internationale Anerkennung des Abschlusses
                          </span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Zeitlicher Ablauf
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 relative border-l border-muted pl-6 ml-2">
                        <li className="relative">
                          <div className="absolute w-3 h-3 bg-primary rounded-full -left-[25px] top-1"></div>
                          <p className="font-medium">
                            6-12 Monate vor Ausbildungsbeginn
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Ausbildungsplatz finden und Bewerbung
                          </p>
                        </li>
                        <li className="relative">
                          <div className="absolute w-3 h-3 bg-primary rounded-full -left-[25px] top-1"></div>
                          <p className="font-medium">
                            3-6 Monate vor Ausbildungsbeginn
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Visumsantrag stellen
                          </p>
                        </li>
                        <li className="relative">
                          <div className="absolute w-3 h-3 bg-primary rounded-full -left-[25px] top-1"></div>
                          <p className="font-medium">
                            1-3 Monate vor Ausbildungsbeginn
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Einreise nach Deutschland
                          </p>
                        </li>
                        <li className="relative">
                          <div className="absolute w-3 h-3 bg-primary rounded-full -left-[25px] top-1"></div>
                          <p className="font-medium">Nach Ankunft</p>
                          <p className="text-sm text-muted-foreground">
                            Anmeldung beim Einwohnermeldeamt und
                            Ausländerbehörde
                          </p>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex justify-center mt-6">
                  <Button onClick={() => setActiveTab("requirements")}>
                    Zu den Voraussetzungen
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requirements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Voraussetzungen für das Ausbildungsvisum</CardTitle>
              <CardDescription>
                Diese Anforderungen musst du erfüllen, um ein Visum für deine
                Ausbildung zu erhalten
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">
                      Grundvoraussetzungen
                    </h3>

                    <div className="p-4 border rounded-md">
                      <h4 className="font-medium mb-2 flex items-center">
                        <FileText className="w-4 h-4 mr-2 text-primary" />
                        Ausbildungsvertrag
                      </h4>
                      <p className="text-sm">
                        Ein unterschriebener Ausbildungsvertrag mit einem
                        deutschen Unternehmen ist die wichtigste Voraussetzung.
                      </p>
                    </div>

                    <div className="p-4 border rounded-md">
                      <h4 className="font-medium mb-2 flex items-center">
                        <FileText className="w-4 h-4 mr-2 text-primary" />
                        Sprachkenntnisse
                      </h4>
                      <p className="text-sm">
                        Für die meisten Ausbildungen werden Deutschkenntnisse
                        auf dem Niveau B1 oder B2 verlangt. Ein anerkanntes
                        Sprachzertifikat ist erforderlich.
                      </p>
                    </div>

                    <div className="p-4 border rounded-md">
                      <h4 className="font-medium mb-2 flex items-center">
                        <FileText className="w-4 h-4 mr-2 text-primary" />
                        Finanzielle Mittel
                      </h4>
                      <p className="text-sm">
                        Du musst nachweisen, dass du über ausreichende
                        finanzielle Mittel verfügst, um deinen Lebensunterhalt
                        zu decken. Die Ausbildungsvergütung wird dabei
                        berücksichtigt.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Benötigte Dokumente</h3>

                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>
                          Gültiger Reisepass (noch mindestens 6 Monate gültig)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Ausgefülltes Visumantragsformular</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Biometrische Passfotos</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Ausbildungsvertrag (Original und Kopie)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>
                          Nachweis über Deutschkenntnisse (z.B.
                          Goethe-Zertifikat)
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Nachweis über Krankenversicherung</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Lebenslauf und Motivationsschreiben</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Schulzeugnisse und Abschlusszertifikate</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 border rounded-md bg-amber-50 dark:bg-amber-950">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Wichtiger Hinweis</h4>
                      <p className="text-sm">
                        Alle Dokumente müssen auf Deutsch oder Englisch
                        vorliegen oder von einem anerkannten Übersetzer
                        übersetzt werden. Beglaubigte Kopien sind oft
                        erforderlich.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mt-6">
                  <Button onClick={() => setActiveTab("process")}>
                    Zum Antragsprozess
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="process" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Der Visumsantragsprozess</CardTitle>
              <CardDescription>
                Schritt-für-Schritt-Anleitung zum Beantragen deines
                Ausbildungsvisums
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="relative border-l border-muted pl-8 ml-4 space-y-8">
                  <div className="relative">
                    <div className="absolute w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center -left-[28px] top-0">
                      1
                    </div>
                    <h3 className="text-lg font-medium">Termin vereinbaren</h3>
                    <p className="text-sm mt-2">
                      Vereinbare einen Termin bei der deutschen Botschaft in
                      Rabat oder dem Generalkonsulat in Casablanca. Dies sollte
                      mindestens 3 Monate vor dem geplanten Ausbildungsbeginn
                      erfolgen.
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Zur Terminvereinbarung
                    </Button>
                  </div>

                  <div className="relative">
                    <div className="absolute w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center -left-[28px] top-0">
                      2
                    </div>
                    <h3 className="text-lg font-medium">
                      Unterlagen vorbereiten
                    </h3>
                    <p className="text-sm mt-2">
                      Sammle alle erforderlichen Dokumente und bereite sie
                      entsprechend vor. Achte darauf, dass alle Übersetzungen
                      und Beglaubigungen korrekt sind.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => setActiveTab("checklist")}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Zur Dokumenten-Checkliste
                    </Button>
                  </div>

                  <div className="relative">
                    <div className="absolute w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center -left-[28px] top-0">
                      3
                    </div>
                    <h3 className="text-lg font-medium">
                      Persönliche Vorsprache
                    </h3>
                    <p className="text-sm mt-2">
                      Erscheine pünktlich zu deinem Termin bei der Botschaft
                      oder dem Konsulat. Bringe alle Originaldokumente und
                      Kopien mit. Du musst persönlich anwesend sein, um
                      biometrische Daten erfassen zu lassen.
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center -left-[28px] top-0">
                      4
                    </div>
                    <h3 className="text-lg font-medium">Bearbeitungszeit</h3>
                    <p className="text-sm mt-2">
                      Die Bearbeitung des Visumantrags dauert in der Regel 4-8
                      Wochen. In dieser Zeit kann die Botschaft zusätzliche
                      Unterlagen anfordern oder dich zu einem weiteren Gespräch
                      einladen.
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center -left-[28px] top-0">
                      5
                    </div>
                    <h3 className="text-lg font-medium">Visum abholen</h3>
                    <p className="text-sm mt-2">
                      Nach erfolgreicher Prüfung wird dein Visum ausgestellt. Du
                      wirst benachrichtigt, wann du deinen Pass mit dem Visum
                      abholen kannst.
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center -left-[28px] top-0">
                      6
                    </div>
                    <h3 className="text-lg font-medium">
                      Einreise nach Deutschland
                    </h3>
                    <p className="text-sm mt-2">
                      Mit dem nationalen Visum kannst du nach Deutschland
                      einreisen. Nach der Ankunft musst du dich innerhalb von 14
                      Tagen beim Einwohnermeldeamt anmelden und bei der
                      Ausländerbehörde eine Aufenthaltserlaubnis beantragen.
                    </p>
                  </div>
                </div>

                <div className="p-4 border rounded-md bg-blue-50 dark:bg-blue-950">
                  <div className="flex items-start gap-2">
                    <HelpCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">
                        Unterstützung durch den Ausbildungsbetrieb
                      </h4>
                      <p className="text-sm">
                        Viele Ausbildungsbetriebe unterstützen ihre
                        internationalen Auszubildenden beim Visumsantrag. Frage
                        deinen Arbeitgeber nach möglicher Hilfe bei der
                        Vorbereitung der Dokumente oder bei der Kommunikation
                        mit den Behörden.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mt-6">
                  <Button onClick={() => setActiveTab("checklist")}>
                    Zur Dokumente-Checkliste
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="checklist" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Dokumente-Checkliste</CardTitle>
              <CardDescription>
                Verfolge deinen Fortschritt bei der Vorbereitung der benötigten
                Dokumente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="w-full bg-muted rounded-full h-2.5 mb-6">
                  <Progress value={calculateProgress()} className="h-2.5" />
                </div>
                <p className="text-center font-medium">
                  {calculateProgress()}% abgeschlossen
                </p>

                <div className="space-y-4">
                  <div className="p-4 border rounded-md">
                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="passport"
                        checked={checkedItems.passport}
                        onCheckedChange={(checked) =>
                          handleCheckItem("passport", checked as boolean)
                        }
                      />
                      <div className="grid gap-1.5">
                        <Label htmlFor="passport" className="font-medium">
                          Reisepass
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Gültiger Reisepass, der noch mindestens 6 Monate über
                          das Ende der geplanten Ausbildung hinaus gültig ist.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-md">
                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="photos"
                        checked={checkedItems.photos}
                        onCheckedChange={(checked) =>
                          handleCheckItem("photos", checked as boolean)
                        }
                      />
                      <div className="grid gap-1.5">
                        <Label htmlFor="photos" className="font-medium">
                          Biometrische Passfotos
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          3 aktuelle biometrische Passfotos (nicht älter als 6
                          Monate).
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-md">
                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="application"
                        checked={checkedItems.application}
                        onCheckedChange={(checked) =>
                          handleCheckItem("application", checked as boolean)
                        }
                      />
                      <div className="grid gap-1.5">
                        <Label htmlFor="application" className="font-medium">
                          Visumantragsformular
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Vollständig ausgefülltes und unterschriebenes
                          Antragsformular für ein nationales Visum.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-md">
                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="contract"
                        checked={checkedItems.contract}
                        onCheckedChange={(checked) =>
                          handleCheckItem("contract", checked as boolean)
                        }
                      />
                      <div className="grid gap-1.5">
                        <Label htmlFor="contract" className="font-medium">
                          Ausbildungsvertrag
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Original und Kopie des unterschriebenen
                          Ausbildungsvertrags mit einem deutschen Unternehmen.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-md">
                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="insurance"
                        checked={checkedItems.insurance}
                        onCheckedChange={(checked) =>
                          handleCheckItem("insurance", checked as boolean)
                        }
                      />
                      <div className="grid gap-1.5">
                        <Label htmlFor="insurance" className="font-medium">
                          Krankenversicherung
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Nachweis über eine Krankenversicherung, die in
                          Deutschland gültig ist (mindestens für die ersten
                          Wochen).
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-md">
                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="finances"
                        checked={checkedItems.finances}
                        onCheckedChange={(checked) =>
                          handleCheckItem("finances", checked as boolean)
                        }
                      />
                      <div className="grid gap-1.5">
                        <Label htmlFor="finances" className="font-medium">
                          Finanzierungsnachweis
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Nachweis über ausreichende finanzielle Mittel
                          (Ausbildungsvergütung, Sperrkonto oder
                          Verpflichtungserklärung).
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-md">
                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="certificates"
                        checked={checkedItems.certificates}
                        onCheckedChange={(checked) =>
                          handleCheckItem("certificates", checked as boolean)
                        }
                      />
                      <div className="grid gap-1.5">
                        <Label htmlFor="certificates" className="font-medium">
                          Schulzeugnisse und Abschlüsse
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Beglaubigte Kopien und Übersetzungen deiner
                          Schulzeugnisse und Abschlusszertifikate.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-md">
                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="language"
                        checked={checkedItems.language}
                        onCheckedChange={(checked) =>
                          handleCheckItem("language", checked as boolean)
                        }
                      />
                      <div className="grid gap-1.5">
                        <Label htmlFor="language" className="font-medium">
                          Sprachnachweis
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Nachweis über Deutschkenntnisse (in der Regel
                          mindestens B1-Niveau).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mt-6 gap-4">
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Checkliste herunterladen
                  </Button>
                  <Button onClick={() => setActiveTab("faq")}>
                    Zu den häufigen Fragen
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faq" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Häufig gestellte Fragen</CardTitle>
              <CardDescription>
                Antworten auf die wichtigsten Fragen zum Ausbildungsvisum
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    Wie lange dauert die Bearbeitung meines Visumantrags?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>
                      Die Bearbeitungszeit für ein Ausbildungsvisum beträgt in
                      der Regel 4-8 Wochen. In Zeiten hohen Antragsaufkommens
                      kann es auch länger dauern. Es ist ratsam, den Antrag
                      mindestens 3 Monate vor dem geplanten Ausbildungsbeginn zu
                      stellen.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    Welches Sprachniveau benötige ich für eine Ausbildung in
                    Deutschland?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>
                      Für die meisten Ausbildungen wird mindestens das
                      Sprachniveau B1 nach dem Gemeinsamen Europäischen
                      Referenzrahmen (GER) verlangt. Für Ausbildungen mit viel
                      Kundenkontakt oder in bestimmten Bereichen wie Gesundheit
                      und Pflege kann B2 erforderlich sein. Der Nachweis erfolgt
                      durch ein anerkanntes Sprachzertifikat wie das
                      Goethe-Zertifikat oder TestDaF.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    Kann ich während der Ausbildung arbeiten?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>
                      Mit einem Ausbildungsvisum darfst du neben deiner
                      Ausbildung bis zu 10 Stunden pro Woche arbeiten. In den
                      Ferien kannst du Vollzeit arbeiten. Diese Regelung gilt,
                      solange deine Ausbildung nicht beeinträchtigt wird.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    Was passiert nach Abschluss meiner Ausbildung?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>
                      Nach erfolgreichem Abschluss deiner Ausbildung kannst du
                      eine Aufenthaltserlaubnis zur Arbeitssuche für bis zu 12
                      Monate beantragen. Wenn du eine Stelle in deinem
                      Ausbildungsberuf findest, kannst du eine
                      Aufenthaltserlaubnis zum Zweck der Beschäftigung erhalten.
                      Nach mehreren Jahren besteht die Möglichkeit, eine
                      Niederlassungserlaubnis (unbefristeter Aufenthalt) zu
                      beantragen.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>
                    Wie viel Geld muss ich nachweisen?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>
                      Der erforderliche Finanzierungsnachweis hängt von deiner
                      Ausbildungsvergütung ab. Grundsätzlich musst du
                      nachweisen, dass du über mindestens 934 Euro pro Monat
                      verfügst. Wenn deine Ausbildungsvergütung darunter liegt,
                      musst du die Differenz durch andere Mittel (z.B.
                      Sperrkonto, Verpflichtungserklärung) nachweisen.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger>
                    Kann meine Familie mit mir nach Deutschland kommen?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>
                      Während der Ausbildung ist der Familiennachzug in der
                      Regel nicht möglich. Nach erfolgreichem Abschluss der
                      Ausbildung und mit einer entsprechenden Arbeitsstelle
                      können Ehepartner und minderjährige Kinder nachziehen,
                      wenn bestimmte Voraussetzungen erfüllt sind (ausreichender
                      Wohnraum, gesicherter Lebensunterhalt, Grundkenntnisse der
                      deutschen Sprache beim Ehepartner).
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7">
                  <AccordionTrigger>Was kostet das Visum?</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      Die Gebühr für ein nationales Visum (D-Visum) beträgt
                      derzeit 75 Euro. Diese Gebühr ist bei der Antragstellung
                      zu entrichten und wird auch bei Ablehnung des Antrags
                      nicht erstattet.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-8">
                  <AccordionTrigger>
                    Was mache ich, wenn mein Visum abgelehnt wird?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>
                      Bei einer Ablehnung erhältst du einen schriftlichen
                      Bescheid mit Begründung. Gegen diese Entscheidung kannst
                      du innerhalb eines Monats Widerspruch einlegen. Es ist
                      ratsam, in diesem Fall rechtliche Beratung in Anspruch zu
                      nehmen. Alternativ kannst du die Gründe für die Ablehnung
                      beheben und einen neuen Antrag stellen.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-8 p-4 border rounded-md bg-blue-50 dark:bg-blue-950">
                <div className="flex items-start gap-2">
                  <HelpCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Weitere Fragen?</h4>
                    <p className="text-sm mb-4">
                      Wenn du weitere Fragen hast, kannst du dich an folgende
                      Stellen wenden:
                    </p>
                    <ul className="text-sm space-y-2">
                      <li>
                        Deutsche Botschaft in Rabat:{" "}
                        <a href="#" className="text-primary hover:underline">
                          Website besuchen
                        </a>
                      </li>
                      <li>
                        Deutsches Generalkonsulat in Casablanca:{" "}
                        <a href="#" className="text-primary hover:underline">
                          Website besuchen
                        </a>
                      </li>
                      <li>
                        Bundesagentur für Arbeit - Zentrale Auslands- und
                        Fachvermittlung (ZAV):{" "}
                        <a href="#" className="text-primary hover:underline">
                          Website besuchen
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VisaGuide;
