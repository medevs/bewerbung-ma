import React from "react";
import { useLanguage } from "@/lib/i18n/index.tsx";
import { Card, CardContent } from "../ui/card";
import { Users, Award, BookOpen, Briefcase } from "lucide-react";

export default function StatisticsSection() {
  const { t } = useLanguage();

  const stats = [
    {
      value: "5,000+",
      label: t("landing.statUsers", "Erfolgreiche Nutzer"),
      icon: Users,
      description: t(
        "landing.statUsersDesc",
        "Bewerber, die ihren Weg nach Deutschland gefunden haben",
      ),
    },
    {
      value: "1,200+",
      label: t("landing.statPositions", "Ausbildungsplätze"),
      icon: Briefcase,
      description: t(
        "landing.statPositionsDesc",
        "Verfügbare Stellen mit Visum-Unterstützung",
      ),
    },
    {
      value: "98%",
      label: t("landing.statSuccess", "Erfolgsquote"),
      icon: Award,
      description: t(
        "landing.statSuccessDesc",
        "Bei Bewerbungen mit unseren Vorlagen",
      ),
    },
    {
      value: "24/7",
      label: t("landing.statSupport", "Unterstützung"),
      icon: BookOpen,
      description: t(
        "landing.statSupportDesc",
        "Ressourcen und Hilfe in deiner Sprache",
      ),
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("landing.statsTitle", "Dein Weg zum Erfolg in Zahlen")}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t(
              "landing.statsSubtitle",
              "Wir helfen dir bei jedem Schritt deiner Reise nach Deutschland",
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="bg-background dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
            >
              <CardContent className="p-6 text-center">
                <div className="mx-auto rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 dark:bg-primary/20 mb-4">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="font-medium text-foreground mb-2">
                  {stat.label}
                </div>
                <p className="text-sm text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
