import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Lightbulb, MessageSquare, ChevronDown, ChevronUp } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

interface InterviewPrepProps {
  jobType?: string;
}

const InterviewPrep = ({ jobType = "ausbildung" }: InterviewPrepProps) => {
  const [expanded, setExpanded] = useState<string | null>(null);

  const commonQuestions = [
    {
      id: "q1",
      question: "Warum haben Sie sich für diese Ausbildung entschieden?",
      answer:
        "Bei dieser Frage sollten Sie Ihre Motivation und Ihr Interesse am Beruf zeigen. Sprechen Sie über Ihre Stärken, die zu diesem Beruf passen, und erklären Sie, warum Sie sich für diesen Ausbildungsweg entschieden haben.",
      example:
        "Ich habe mich für die Ausbildung zum Fachinformatiker entschieden, weil ich schon immer eine Leidenschaft für Technologie hatte. In meiner Freizeit habe ich bereits kleine Webseiten erstellt und mich mit Programmierung beschäftigt. Die Kombination aus technischem Verständnis und kreativer Problemlösung fasziniert mich besonders.",
    },
    {
      id: "q2",
      question: "Was wissen Sie über unser Unternehmen?",
      answer:
        "Zeigen Sie, dass Sie sich über das Unternehmen informiert haben. Recherchieren Sie vorab die Produkte/Dienstleistungen, die Unternehmensgeschichte und aktuelle Projekte.",
      example:
        "Ich weiß, dass Ihr Unternehmen seit über 20 Jahren im Bereich IT-Dienstleistungen tätig ist und sich besonders auf Lösungen für den Mittelstand spezialisiert hat. Besonders beeindruckt hat mich Ihr Engagement für Nachhaltigkeit und Ihr aktuelles Projekt zur Digitalisierung im Gesundheitswesen.",
    },
    {
      id: "q3",
      question: "Wo sehen Sie sich in 5 Jahren?",
      answer:
        "Zeigen Sie Ihre langfristigen Ziele und wie diese mit der Ausbildung und dem Unternehmen zusammenhängen. Betonen Sie Ihren Wunsch, sich weiterzuentwickeln.",
      example:
        "Nach meiner Ausbildung möchte ich mich in Ihrem Unternehmen weiterentwickeln und meine Kenntnisse vertiefen. Ich könnte mir vorstellen, mich auf Netzwerktechnik zu spezialisieren und vielleicht sogar eine Weiterbildung zum Techniker zu absolvieren. Langfristig strebe ich eine Position an, in der ich mein Wissen an neue Auszubildende weitergeben kann.",
    },
    {
      id: "q4",
      question: "Was sind Ihre Stärken und Schwächen?",
      answer:
        "Bei Stärken nennen Sie relevante Eigenschaften für die Ausbildung. Bei Schwächen wählen Sie etwas, das nicht kritisch für die Stelle ist, und zeigen Sie, wie Sie daran arbeiten.",
      example:
        "Zu meinen Stärken gehören meine Teamfähigkeit und meine Fähigkeit, strukturiert zu arbeiten. In der Schule habe ich oft Gruppenprojekte koordiniert. Eine Schwäche ist, dass ich manchmal zu perfektionistisch bin. Ich lerne aber, Prioritäten zu setzen und zu erkennen, wann etwas 'gut genug' ist.",
    },
    {
      id: "q5",
      question: "Wie gehen Sie mit Stress oder Konflikten um?",
      answer:
        "Beschreiben Sie konstruktive Strategien zur Stressbewältigung und Konfliktlösung. Geben Sie konkrete Beispiele aus Ihrem Leben.",
      example:
        "Bei Stress hilft mir eine gute Organisation. Ich erstelle To-Do-Listen und priorisiere Aufgaben. Bei Konflikten versuche ich, ruhig zu bleiben und die Perspektive des anderen zu verstehen. In meinem Praktikum gab es einmal unterschiedliche Meinungen im Team, und ich habe vorgeschlagen, dass wir uns zusammensetzen und gemeinsam eine Lösung finden.",
    },
  ];

  const culturalTips = [
    "Pünktlichkeit ist in Deutschland sehr wichtig. Planen Sie, 10-15 Minuten vor dem Termin anzukommen.",
    "Kleiden Sie sich angemessen - für die meisten Ausbildungsberufe ist Business-Casual passend.",
    "Ein fester Händedruck bei der Begrüßung hinterlässt einen guten ersten Eindruck.",
    "Sprechen Sie Ihre Gesprächspartner mit 'Sie' und ihrem Nachnamen an, bis sie Ihnen das 'Du' anbieten.",
    "Deutsche Arbeitgeber schätzen Ehrlichkeit - übertreiben Sie nicht bei Ihren Qualifikationen.",
    "Bereiten Sie eigene Fragen vor, die Ihr Interesse am Unternehmen zeigen.",
    "Bedanken Sie sich nach dem Gespräch per E-Mail für die Gelegenheit zum Interview.",
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageSquare className="w-5 h-5 mr-2" />
          Vorstellungsgespräch-Vorbereitung
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <h3 className="text-sm font-medium">
            Häufige Fragen für Ausbildungsbewerber
          </h3>
          <Accordion type="single" collapsible className="w-full">
            {commonQuestions.map((q) => (
              <AccordionItem value={q.id} key={q.id}>
                <AccordionTrigger className="text-sm font-medium">
                  {q.question}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <p className="text-sm">{q.answer}</p>
                    <div className="bg-muted p-3 rounded-md mt-2">
                      <p className="text-sm italic">Beispielantwort:</p>
                      <p className="text-sm mt-1">{q.example}</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="pt-4">
          <div className="flex items-center mb-2">
            <Lightbulb className="w-4 h-4 mr-2 text-amber-500" />
            <h3 className="text-sm font-medium">
              Kulturelle Tipps für Bewerbungsgespräche in Deutschland
            </h3>
          </div>
          <ul className="space-y-2">
            {culturalTips.map((tip, index) => (
              <li key={index} className="text-sm flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-2 border-t">
          <p className="text-xs text-muted-foreground mt-2">
            Diese Tipps sind speziell für Bewerber auf Ausbildungsplätze in
            Deutschland zusammengestellt. Passen Sie Ihre Antworten an Ihre
            persönliche Situation an.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default InterviewPrep;
