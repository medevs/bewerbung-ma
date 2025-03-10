import {
  FileText,
  Wand2,
  Download,
  Clock,
  Globe,
  MessageSquare,
  Users,
  BookOpen,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/index.tsx";

export default function FeaturesSection() {
  const { t } = useLanguage();

  const features = [
    {
      name: t("landing.feature1Title", "Deutsche Bewerbungsstandards"),
      description: t(
        "landing.feature1Desc",
        "Professionelle Vorlagen nach deutschen Standards für Lebenslauf und Anschreiben.",
      ),
      icon: FileText,
    },
    {
      name: t("landing.feature2Title", "KI-gestützte Formulierung"),
      description: t(
        "landing.feature2Desc",
        "Erstelle perfekte Anschreiben auf Deutsch mit unserer KI - speziell für Ausbildungsplätze optimiert.",
      ),
      icon: Wand2,
    },
    {
      name: t("landing.feature3Title", "Ausbildungssuche"),
      description: t(
        "landing.feature3Desc",
        "Finde passende Ausbildungsplätze und erstelle direkt die perfekte Bewerbung dafür.",
      ),
      icon: Download,
    },
    {
      name: t("landing.feature4Title", "Kulturelle Anpassung"),
      description: t(
        "landing.feature4Desc",
        "Tipps und Vorlagen speziell angepasst für Bewerber aus Marokko für den deutschen Arbeitsmarkt.",
      ),
      icon: Globe,
    },
    {
      name: t("landing.feature5Title", "Vorstellungsgespräch"),
      description: t(
        "landing.feature5Desc",
        "Bereite dich auf deutsche Vorstellungsgespräche vor mit KI-gestützten Übungen und Tipps.",
      ),
      icon: MessageSquare,
    },
    {
      name: t("landing.feature6Title", "Sprachressourcen"),
      description: t(
        "landing.feature6Desc",
        "Verbessere deine Deutschkenntnisse mit speziellen Kursen für Auszubildende.",
      ),
      icon: BookOpen,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 py-24 sm:py-32" id="features">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t(
              "landing.featuresTitle",
              "Alles was du für deine Bewerbung brauchst",
            )}
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {t(
              "landing.featuresSubtitle",
              "Unsere Plattform bietet dir alle Werkzeuge für eine erfolgreiche Bewerbung in Deutschland.",
            )}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="flex flex-col items-center text-center bg-background dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-primary">
                  <feature.icon
                    className="h-8 w-8 text-primary-foreground"
                    aria-hidden="true"
                  />
                </div>
                <dt className="text-xl font-semibold leading-7 text-foreground">
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
