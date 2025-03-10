import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { openai } from "@/lib/openai";
import {
  MessageSquare,
  Lightbulb,
  Video,
  FileText,
  Mic,
  Loader2,
  CheckCircle,
  BookOpen,
  Briefcase,
  GraduationCap,
} from "lucide-react";

const commonQuestions = [
  {
    id: "q1",
    question: "Erzählen Sie etwas über sich selbst.",
    answer:
      "Diese Frage ist oft die erste in einem Vorstellungsgespräch. Bereiten Sie eine kurze, prägnante Zusammenfassung Ihres beruflichen Werdegangs, Ihrer Qualifikationen und Ihrer Persönlichkeit vor. Konzentrieren Sie sich auf relevante Aspekte für die Position.",
    example:
      "Ich bin ein erfahrener Softwareentwickler mit über 5 Jahren Erfahrung in der Webentwicklung. Nach meinem Informatikstudium habe ich bei verschiedenen Unternehmen gearbeitet, wo ich meine Fähigkeiten in JavaScript und React vertiefen konnte. Ich bin ein teamorientierter Mensch, der gerne komplexe Probleme löst und neue Technologien lernt.",
  },
  {
    id: "q2",
    question: "Warum möchten Sie für unser Unternehmen arbeiten?",
    answer:
      "Zeigen Sie, dass Sie das Unternehmen recherchiert haben. Sprechen Sie über die Unternehmenskultur, Produkte oder Dienstleistungen, die Sie beeindruckt haben, und wie Ihre Fähigkeiten zum Erfolg des Unternehmens beitragen können.",
    example:
      "Ich bin beeindruckt von der innovativen Arbeit, die Ihr Unternehmen im Bereich der erneuerbaren Energien leistet. Besonders Ihr Projekt zur Entwicklung effizienterer Solarpanels hat mein Interesse geweckt. Mit meinem Hintergrund in Materialwissenschaften glaube ich, dass ich wertvolle Beiträge zu Ihrem Team leisten kann.",
  },
  {
    id: "q3",
    question: "Was sind Ihre Stärken und Schwächen?",
    answer:
      "Bei Stärken nennen Sie relevante Fähigkeiten für die Position und untermauern Sie diese mit Beispielen. Bei Schwächen wählen Sie etwas, das nicht kritisch für die Stelle ist, und zeigen Sie, wie Sie daran arbeiten.",
    example:
      "Eine meiner Stärken ist meine Fähigkeit, unter Druck zu arbeiten. In meiner letzten Position musste ich oft enge Deadlines einhalten und konnte dabei stets qualitativ hochwertige Ergebnisse liefern. Eine Schwäche ist, dass ich manchmal zu detailorientiert bin, was Zeit kosten kann. Ich habe gelernt, besser zu priorisieren und mir klare Zeitlimits zu setzen.",
  },
  {
    id: "q4",
    question: "Wo sehen Sie sich in fünf Jahren?",
    answer:
      "Zeigen Sie Ihre Ambitionen und langfristigen Ziele, die mit der Position und dem Unternehmen zusammenpassen. Vermeiden Sie unrealistische Erwartungen.",
    example:
      "In fünf Jahren sehe ich mich in einer leitenden Position, in der ich ein Team führe und größere Projekte verantworte. Ich möchte meine Fachkenntnisse weiter vertiefen und gleichzeitig meine Führungsqualitäten entwickeln. Ich hoffe, bis dahin auch einige innovative Lösungen für das Unternehmen entwickelt zu haben.",
  },
  {
    id: "q5",
    question: "Beschreiben Sie eine Herausforderung, die Sie gemeistert haben.",
    answer:
      "Wählen Sie ein relevantes Beispiel, das Ihre Problemlösungsfähigkeiten zeigt. Beschreiben Sie die Situation, Ihre Handlungen und das positive Ergebnis.",
    example:
      "In meinem letzten Projekt standen wir vor dem Problem, dass unsere Datenbank bei hoher Nutzerlast zusammenbrach. Ich analysierte das Problem, identifizierte Engpässe und implementierte eine Caching-Lösung. Dadurch konnten wir die Ladezeiten um 70% reduzieren und die Stabilität des Systems deutlich verbessern.",
  },
  {
    id: "q6",
    question: "Warum sollten wir Sie einstellen?",
    answer:
      "Heben Sie Ihre einzigartigen Qualifikationen, Erfahrungen und persönlichen Eigenschaften hervor, die Sie von anderen Bewerbern abheben und zum idealen Kandidaten machen.",
    example:
      "Sie sollten mich einstellen, weil ich nicht nur die technischen Fähigkeiten mitbringe, die für diese Position erforderlich sind, sondern auch Erfahrung in der Zusammenarbeit mit internationalen Teams habe. Meine Kommunikationsfähigkeiten und mein Verständnis für verschiedene Kulturen würden besonders wertvoll sein für Ihr expandierendes Geschäft in Asien.",
  },
];

const industrySpecificQuestions = {
  tech: [
    "Beschreiben Sie ein Projekt, an dem Sie kürzlich gearbeitet haben.",
    "Wie halten Sie sich über neue Technologien auf dem Laufenden?",
    "Wie gehen Sie mit technischen Herausforderungen um?",
    "Welche Programmiersprachen beherrschen Sie?",
    "Wie würden Sie die Sicherheit einer Webanwendung verbessern?",
  ],
  finance: [
    "Wie analysieren Sie Finanzdaten?",
    "Welche Erfahrung haben Sie mit Finanzberichterstattung?",
    "Wie bleiben Sie über Änderungen in Finanzvorschriften informiert?",
    "Beschreiben Sie Ihre Erfahrung mit Budgetplanung.",
    "Wie würden Sie Risiken in einem Investmentportfolio bewerten?",
  ],
  healthcare: [
    "Wie gehen Sie mit vertraulichen Patientendaten um?",
    "Welche Erfahrung haben Sie mit medizinischen Dokumentationssystemen?",
    "Wie bleiben Sie über neue medizinische Forschung informiert?",
    "Beschreiben Sie eine Situation, in der Sie unter Druck arbeiten mussten.",
    "Wie würden Sie mit einem schwierigen Patienten umgehen?",
  ],
  education: [
    "Welche Lehrmethoden bevorzugen Sie?",
    "Wie würden Sie mit einem schwierigen Schüler umgehen?",
    "Wie integrieren Sie Technologie in Ihren Unterricht?",
    "Wie bewerten Sie den Fortschritt der Schüler?",
    "Beschreiben Sie Ihre Erfahrung mit Lehrplanentwicklung.",
  ],
  marketing: [
    "Welche Erfahrung haben Sie mit Social-Media-Marketing?",
    "Wie messen Sie den Erfolg einer Marketingkampagne?",
    "Beschreiben Sie eine erfolgreiche Kampagne, die Sie geleitet haben.",
    "Wie bleiben Sie über Marketingtrends informiert?",
    "Wie würden Sie eine Marke in einem gesättigten Markt positionieren?",
  ],
  ausbildung: [
    "Warum haben Sie sich für diese Ausbildung entschieden?",
    "Was wissen Sie über unseren Ausbildungsbetrieb?",
    "Welche Stärken bringen Sie für diese Ausbildung mit?",
    "Wie stellen Sie sich Ihren Arbeitsalltag während der Ausbildung vor?",
    "Welche Erwartungen haben Sie an die Ausbildung und an uns als Ausbildungsbetrieb?",
  ],
  handwerk: [
    "Welche praktischen Erfahrungen haben Sie bereits im handwerklichen Bereich gesammelt?",
    "Wie gehen Sie mit körperlich anstrengenden Aufgaben um?",
    "Warum interessieren Sie sich für diesen handwerklichen Beruf?",
    "Wie wichtig ist Ihnen Präzision und Genauigkeit bei der Arbeit?",
    "Wie würden Sie mit einem unzufriedenen Kunden umgehen?",
  ],
  pflege: [
    "Warum möchten Sie in der Pflege arbeiten?",
    "Wie gehen Sie mit emotional belastenden Situationen um?",
    "Wie wichtig ist Teamarbeit in der Pflege aus Ihrer Sicht?",
    "Welche Eigenschaften sollte eine gute Pflegekraft mitbringen?",
    "Wie würden Sie mit einem schwierigen Patienten umgehen?",
  ],
  gastro: [
    "Welche Erfahrungen haben Sie bereits in der Gastronomie gesammelt?",
    "Wie gehen Sie mit Stress und Zeitdruck um?",
    "Wie wichtig ist Kundenservice für Sie?",
    "Wie würden Sie mit einer Beschwerde eines Gastes umgehen?",
    "Warum möchten Sie in der Gastronomie arbeiten?",
  ],
};

const InterviewPreparation = () => {
  const [selectedIndustry, setSelectedIndustry] = useState("ausbildung");
  const [customQuestion, setCustomQuestion] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [savedAnswers, setSavedAnswers] = useState<{ [key: string]: string }>(
    {},
  );
  const [recordingFeedback, setRecordingFeedback] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [customizedQuestions, setCustomizedQuestions] = useState<string[]>([]);
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);

  const handleAskAI = async () => {
    if (!customQuestion) return;

    setIsLoading(true);
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "Du bist ein Experte für Vorstellungsgespräche und hilfst Bewerbern, sich auf Interviews vorzubereiten. Gib hilfreiche, konkrete und präzise Antworten.",
          },
          {
            role: "user",
            content: `Wie sollte ich diese Interviewfrage beantworten? "${customQuestion}"`,
          },
        ],
        model: "gpt-3.5-turbo",
        temperature: 0.7,
        max_tokens: 500,
      });

      setAiResponse(completion.choices[0].message.content || "");
    } catch (error) {
      console.error("Error asking AI:", error);
      setAiResponse(
        "Es gab einen Fehler bei der Anfrage. Bitte versuchen Sie es später erneut.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const saveAnswer = (questionId: string, answer: string) => {
    setSavedAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleRecordAnswer = () => {
    // In a real implementation, this would access the microphone
    alert(
      "In einer vollständigen Implementierung würde diese Funktion Ihre Antwort aufnehmen und analysieren.",
    );
    setRecordingFeedback(
      "Ihre Antwort war klar und strukturiert. Achten Sie darauf, langsamer zu sprechen und mehr Beispiele zu verwenden.",
    );
  };

  const generateCustomQuestions = async () => {
    if (!jobDescription) return;

    setIsGeneratingQuestions(true);
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "Du bist ein Experte für Vorstellungsgespräche und hilfst Bewerbern, sich auf Interviews vorzubereiten. Generiere 5 spezifische Interviewfragen basierend auf der Stellenbeschreibung.",
          },
          {
            role: "user",
            content: `Generiere 5 spezifische Interviewfragen basierend auf dieser Stellenbeschreibung: "${jobDescription}"`,
          },
        ],
        model: "gpt-3.5-turbo",
        temperature: 0.7,
        max_tokens: 500,
      });

      const content = completion.choices[0].message.content || "";
      const questions = content
        .split(/\d+\.\s+/)
        .filter((q) => q.trim().length > 0)
        .map((q) => q.trim());

      setCustomizedQuestions(questions);
    } catch (error) {
      console.error("Error generating questions:", error);
      setCustomizedQuestions([
        "Es gab einen Fehler bei der Generierung der Fragen. Bitte versuchen Sie es später erneut.",
      ]);
    } finally {
      setIsGeneratingQuestions(false);
    }
  };

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Vorstellungsgespräch-Vorbereitung für Ausbildungsbewerber
      </h1>

      <Tabs defaultValue="industry" className="w-full">
        <TabsList className="mb-6 w-full flex flex-wrap">
          <TabsTrigger value="common" className="flex-1 sm:flex-none">
            <MessageSquare className="w-4 h-4 mr-2" />
            Häufige Fragen
          </TabsTrigger>
          <TabsTrigger value="industry" className="flex-1 sm:flex-none">
            <Briefcase className="w-4 h-4 mr-2" />
            Branchenspezifisch
          </TabsTrigger>
          <TabsTrigger value="custom" className="flex-1 sm:flex-none">
            <Lightbulb className="w-4 h-4 mr-2" />
            KI-Assistent
          </TabsTrigger>
          <TabsTrigger value="practice" className="flex-1 sm:flex-none">
            <Mic className="w-4 h-4 mr-2" />
            Übungsmodus
          </TabsTrigger>
        </TabsList>

        <TabsContent value="common" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Häufige Interviewfragen</CardTitle>
              <CardDescription>
                Bereiten Sie sich auf diese häufig gestellten Fragen vor, die in
                fast jedem Vorstellungsgespräch vorkommen.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {commonQuestions.map((q) => (
                  <AccordionItem value={q.id} key={q.id}>
                    <AccordionTrigger className="text-left">
                      {q.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">
                            Tipps zur Beantwortung:
                          </h4>
                          <p className="text-muted-foreground">{q.answer}</p>
                        </div>

                        <div className="bg-muted p-4 rounded-md">
                          <h4 className="font-medium mb-2">Beispielantwort:</h4>
                          <p className="italic">{q.example}</p>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium">Ihre Antwort:</h4>
                          <Textarea
                            placeholder="Schreiben Sie Ihre Antwort hier..."
                            className="min-h-[100px] w-full"
                            value={savedAnswers[q.id] || ""}
                            onChange={(e) => saveAnswer(q.id, e.target.value)}
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => saveAnswer(q.id, "")}
                            className="mt-2"
                          >
                            Zurücksetzen
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="industry" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Branchenspezifische Fragen</CardTitle>
              <CardDescription>
                Bereiten Sie sich auf Fragen vor, die speziell in Ihrer Branche
                gestellt werden.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Wählen Sie Ihre Branche:
                </label>
                <Select
                  value={selectedIndustry}
                  onValueChange={setSelectedIndustry}
                >
                  <SelectTrigger className="w-full sm:w-[300px]">
                    <SelectValue placeholder="Branche auswählen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ausbildung">
                      <div className="flex items-center">
                        <GraduationCap className="w-4 h-4 mr-2" />
                        Ausbildung
                      </div>
                    </SelectItem>
                    <SelectItem value="handwerk">
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 mr-2" />
                        Handwerk
                      </div>
                    </SelectItem>
                    <SelectItem value="pflege">
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 mr-2" />
                        Pflege & Gesundheit
                      </div>
                    </SelectItem>
                    <SelectItem value="gastro">
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 mr-2" />
                        Gastronomie
                      </div>
                    </SelectItem>
                    <SelectItem value="tech">
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 mr-2" />
                        Technologie & IT
                      </div>
                    </SelectItem>
                    <SelectItem value="finance">
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 mr-2" />
                        Finanzen & Banking
                      </div>
                    </SelectItem>
                    <SelectItem value="healthcare">
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 mr-2" />
                        Gesundheitswesen
                      </div>
                    </SelectItem>
                    <SelectItem value="education">
                      <div className="flex items-center">
                        <GraduationCap className="w-4 h-4 mr-2" />
                        Bildung & Erziehung
                      </div>
                    </SelectItem>
                    <SelectItem value="marketing">
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 mr-2" />
                        Marketing & Vertrieb
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-lg">
                  Typische Fragen für{" "}
                  {selectedIndustry === "ausbildung"
                    ? "Ausbildung"
                    : selectedIndustry === "handwerk"
                      ? "Handwerk"
                      : selectedIndustry === "pflege"
                        ? "Pflege & Gesundheit"
                        : selectedIndustry === "gastro"
                          ? "Gastronomie"
                          : selectedIndustry === "tech"
                            ? "Technologie & IT"
                            : selectedIndustry === "finance"
                              ? "Finanzen & Banking"
                              : selectedIndustry === "healthcare"
                                ? "Gesundheitswesen"
                                : selectedIndustry === "education"
                                  ? "Bildung & Erziehung"
                                  : "Marketing & Vertrieb"}
                </h3>

                <ul className="space-y-4">
                  {industrySpecificQuestions[
                    selectedIndustry as keyof typeof industrySpecificQuestions
                  ].map((question, index) => (
                    <li
                      key={index}
                      className="p-4 border rounded-md hover:bg-muted transition-colors"
                    >
                      <p className="font-medium mb-2">{question}</p>
                      <Textarea
                        placeholder="Schreiben Sie Ihre Antwort hier..."
                        className="min-h-[80px] mt-2 w-full"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Stellenbeschreibung analysieren</CardTitle>
              <CardDescription>
                Fügen Sie eine Stellenbeschreibung ein, um maßgeschneiderte
                Interviewfragen zu generieren.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  placeholder="Fügen Sie hier die Stellenbeschreibung ein..."
                  className="min-h-[150px] w-full"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
                <div className="flex justify-center sm:justify-start">
                  <Button
                    onClick={generateCustomQuestions}
                    disabled={isGeneratingQuestions || !jobDescription}
                  >
                    {isGeneratingQuestions ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generiere Fragen...
                      </>
                    ) : (
                      <>Fragen generieren</>
                    )}
                  </Button>
                </div>
              </div>

              {customizedQuestions.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-medium text-lg mb-4">
                    Generierte Fragen:
                  </h3>
                  <ul className="space-y-3">
                    {customizedQuestions.map((question, index) => (
                      <li key={index} className="p-3 border rounded-md">
                        {question}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>KI-Interviewassistent</CardTitle>
              <CardDescription>
                Stellen Sie Fragen zu Interviewtechniken und erhalten Sie
                personalisierte Antworten.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-2 w-full">
                  <Input
                    placeholder="Stellen Sie eine Frage zum Vorstellungsgespräch..."
                    value={customQuestion}
                    onChange={(e) => setCustomQuestion(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleAskAI}
                    disabled={isLoading || !customQuestion}
                    className="whitespace-nowrap"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Frage wird bearbeitet...
                      </>
                    ) : (
                      <>Frage stellen</>
                    )}
                  </Button>
                </div>

                {aiResponse && (
                  <div className="p-4 border rounded-md bg-muted mt-4">
                    <h3 className="font-medium mb-2">Antwort:</h3>
                    <div className="whitespace-pre-line">{aiResponse}</div>
                  </div>
                )}

                <div className="mt-6">
                  <h3 className="font-medium mb-2">Beispielfragen:</h3>
                  <ul className="space-y-2">
                    <li>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-left"
                        onClick={() =>
                          setCustomQuestion(
                            "Wie kann ich meine Nervosität vor einem Vorstellungsgespräch überwinden?",
                          )
                        }
                      >
                        Wie kann ich meine Nervosität vor einem
                        Vorstellungsgespräch überwinden?
                      </Button>
                    </li>
                    <li>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-left"
                        onClick={() =>
                          setCustomQuestion(
                            "Was sollte ich am Ende eines Interviews fragen?",
                          )
                        }
                      >
                        Was sollte ich am Ende eines Interviews fragen?
                      </Button>
                    </li>
                    <li>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-left"
                        onClick={() =>
                          setCustomQuestion(
                            "Wie erkläre ich eine Lücke in meinem Lebenslauf?",
                          )
                        }
                      >
                        Wie erkläre ich eine Lücke in meinem Lebenslauf?
                      </Button>
                    </li>
                    <li>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-left"
                        onClick={() =>
                          setCustomQuestion(
                            "Wie kann ich als Bewerber aus Marokko meine interkulturellen Stärken hervorheben?",
                          )
                        }
                      >
                        Wie kann ich als Bewerber aus Marokko meine
                        interkulturellen Stärken hervorheben?
                      </Button>
                    </li>
                    <li>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-left"
                        onClick={() =>
                          setCustomQuestion(
                            "Welche Fragen zum Visum und zur Arbeitserlaubnis kann ich im Vorstellungsgespräch stellen?",
                          )
                        }
                      >
                        Welche Fragen zum Visum und zur Arbeitserlaubnis kann
                        ich im Vorstellungsgespräch stellen?
                      </Button>
                    </li>
                    <li>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-left"
                        onClick={() =>
                          setCustomQuestion(
                            "Wie erkläre ich meine Motivation, eine Ausbildung in Deutschland zu machen?",
                          )
                        }
                      >
                        Wie erkläre ich meine Motivation, eine Ausbildung in
                        Deutschland zu machen?
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Interview-Ressourcen</CardTitle>
              <CardDescription>
                Nützliche Ressourcen zur Vorbereitung auf Ihr
                Vorstellungsgespräch.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 border rounded-md flex items-start space-x-3">
                  <BookOpen className="w-8 h-8 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">
                      Interview-Leitfaden für Ausbildungsbewerber
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Umfassender Leitfaden mit Tipps und Strategien für
                      erfolgreiche Interviews bei deutschen
                      Ausbildungsbetrieben.
                    </p>
                    <Button variant="link" className="p-0 h-auto">
                      Herunterladen
                    </Button>
                  </div>
                </div>

                <div className="p-4 border rounded-md flex items-start space-x-3">
                  <Video className="w-8 h-8 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">
                      Video-Tutorials auf Arabisch
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Lernvideos zu Körpersprache, Antwortstrategien und
                      deutschen Kulturstandards.
                    </p>
                    <Button variant="link" className="p-0 h-auto">
                      Ansehen
                    </Button>
                  </div>
                </div>

                <div className="p-4 border rounded-md flex items-start space-x-3">
                  <FileText className="w-8 h-8 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">
                      Deutsch-Arabische Vokabelliste
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Wichtige Begriffe und Redewendungen für das
                      Vorstellungsgespräch auf Deutsch.
                    </p>
                    <Button variant="link" className="p-0 h-auto">
                      Herunterladen
                    </Button>
                  </div>
                </div>

                <div className="p-4 border rounded-md flex items-start space-x-3">
                  <Briefcase className="w-8 h-8 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">
                      Kulturelle Unterschiede verstehen
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Leitfaden zu kulturellen Unterschieden zwischen Marokko
                      und Deutschland im Berufsleben.
                    </p>
                    <Button variant="link" className="p-0 h-auto">
                      Mehr erfahren
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Deutsch für das Vorstellungsgespräch</CardTitle>
              <CardDescription>
                Verbessern Sie Ihre Deutschkenntnisse für das
                Vorstellungsgespräch.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">Häufige Redewendungen</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>"Ich freue mich auf die Zusammenarbeit."</span>
                      <span className="text-muted-foreground">
                        أتطلع إلى العمل معكم
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>
                        "Ich bin sehr motiviert, diese Ausbildung zu beginnen."
                      </span>
                      <span className="text-muted-foreground">
                        أنا متحمس جدًا لبدء هذا التدريب
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>"Ich lerne schnell und bin teamfähig."</span>
                      <span className="text-muted-foreground">
                        أتعلم بسرعة وأجيد العمل ضمن فريق
                      </span>
                    </li>
                  </ul>
                  <Button variant="link" className="mt-2 p-0 h-auto">
                    Alle Redewendungen anzeigen
                  </Button>
                </div>

                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">Ausspracheübungen</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Üben Sie die Aussprache wichtiger Begriffe für das
                    Vorstellungsgespräch.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="justify-start">
                      <Mic className="w-4 h-4 mr-2" /> Ausbildung
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Mic className="w-4 h-4 mr-2" /> Berufserfahrung
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Mic className="w-4 h-4 mr-2" /> Qualifikation
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Mic className="w-4 h-4 mr-2" /> Teamfähigkeit
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="practice" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Übungsmodus</CardTitle>
              <CardDescription>
                Üben Sie Ihre Antworten und erhalten Sie Feedback zu Ihrer
                Präsentation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">Aktuelle Frage:</h3>
                  <div className="p-4 border rounded-md bg-muted mb-4">
                    <p className="font-medium">
                      Warum möchten Sie eine Ausbildung in Deutschland machen
                      und was sind Ihre Erwartungen?
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 mb-4 w-full">
                    <Button onClick={handleRecordAnswer} className="flex-1">
                      <Mic className="w-4 h-4 mr-2" />
                      Antwort aufnehmen
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Nächste Frage
                    </Button>
                  </div>

                  {recordingFeedback && (
                    <div className="p-4 border rounded-md bg-muted">
                      <h4 className="font-medium mb-2">Feedback:</h4>
                      <p>{recordingFeedback}</p>
                    </div>
                  )}
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-medium mb-4">
                    Tipps für die Präsentation:
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <span>
                        Sprechen Sie klar und deutlich mit angemessener
                        Lautstärke.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <span>
                        Halten Sie Augenkontakt (mit der Kamera bei virtuellen
                        Interviews).
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <span>
                        Achten Sie auf eine positive Körpersprache und Haltung.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <span>
                        Vermeiden Sie Füllwörter wie "ähm" oder "halt".
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <span>
                        Strukturieren Sie Ihre Antworten mit Einleitung,
                        Hauptteil und Schluss.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kulturelle Tipps für Bewerber aus Marokko</CardTitle>
              <CardDescription>
                Wichtige kulturelle Unterschiede, die Sie im deutschen
                Vorstellungsgespräch beachten sollten.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">Pünktlichkeit</h3>
                  <p className="text-sm">
                    In Deutschland ist Pünktlichkeit extrem wichtig. Planen Sie,
                    10-15 Minuten vor dem Termin anzukommen. Zu spät zu kommen
                    wird als respektlos angesehen.
                  </p>
                </div>

                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">Direktheit</h3>
                  <p className="text-sm">
                    Deutsche Kommunikation ist direkter als in Marokko.
                    Antworten Sie präzise auf Fragen und vermeiden Sie zu
                    ausschweifende Erklärungen.
                  </p>
                </div>

                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">Formelle Anrede</h3>
                  <p className="text-sm">
                    Verwenden Sie die formelle Anrede ("Sie") und sprechen Sie
                    Personen mit ihrem Nachnamen an, bis Ihnen das "Du"
                    angeboten wird.
                  </p>
                </div>

                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">Händedruck</h3>
                  <p className="text-sm">
                    Ein fester Händedruck bei der Begrüßung ist üblich und
                    wichtig für einen guten ersten Eindruck.
                  </p>
                </div>

                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-2">Kleidung</h3>
                  <p className="text-sm">
                    Kleiden Sie sich formell und konservativ. Für die meisten
                    Ausbildungsberufe ist Business-Casual angemessen.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Videoanalyse</CardTitle>
              <CardDescription>
                Nehmen Sie ein Übungsinterview auf und analysieren Sie Ihre
                Präsentation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 border rounded-md bg-muted w-full">
                <Video className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">
                  Videoaufnahme ist in dieser Demo nicht verfügbar.
                </p>
                <Button variant="outline">Aufnahme starten</Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-muted-foreground">
                Die Aufnahmen werden nur lokal gespeichert und nicht geteilt.
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InterviewPreparation;
