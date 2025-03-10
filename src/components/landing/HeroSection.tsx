import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { useLanguage } from "@/lib/i18n/index.tsx";

export default function HeroSection() {
  const { user } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="relative bg-gradient-to-b from-blue-50/80 to-white dark:from-gray-900 dark:to-gray-950 py-16 sm:py-24">
      <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&auto=format&fit=crop&q=80')] bg-fixed bg-center opacity-5 dark:opacity-10"></div>
      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40 z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-8">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              {t("landing.heroTitle", "Dein Weg zur")}
              <span className="block text-primary">
                {t("landing.ausbildung", "Ausbildung")}{" "}
                {t("landing.inGermany", "in Deutschland")}
              </span>
            </h1>
            <p className="text-lg leading-8 text-muted-foreground">
              {t(
                "landing.heroSubtitle",
                "Erstelle professionelle Bewerbungsunterlagen für deine Ausbildung in Deutschland. Speziell entwickelt für Bewerber aus Marokko mit KI-gestützten Vorlagen und Tipps.",
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={user ? "/dashboard" : "/sign-up"}>
                <Button size="lg" className="text-lg px-8 w-full sm:w-auto">
                  {t("landing.getStarted", "Jetzt starten")}
                </Button>
              </Link>
              <Link to="#features">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 w-full sm:w-auto"
                >
                  {t("landing.learnMore", "Mehr erfahren")}
                </Button>
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 mt-8 lg:mt-0">
            <img
              src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80"
              alt="Resume Builder"
              className="rounded-lg shadow-2xl w-full transition-all hover:scale-[1.02] duration-300 border border-gray-200 dark:border-gray-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
