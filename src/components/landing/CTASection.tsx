import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { useLanguage } from "@/lib/i18n/index.tsx";

export default function CTASection() {
  const { user } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&auto=format&fit=crop&q=80')] bg-fixed bg-center opacity-5"></div>
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t(
                "landing.ctaTitle",
                "Bereit für deine Ausbildung in Deutschland?",
              )}
            </h2>
            <p className="mt-3 text-lg text-primary-foreground/80">
              {t("landing.ctaSubtitle", "Starte jetzt mit deiner Bewerbung.")}
            </p>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 md:mt-0">
            <Link to={user ? "/dashboard" : "/sign-up"}>
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 w-full sm:w-auto"
              >
                {t("landing.createFreeAccount", "Kostenlos starten")}
              </Button>
            </Link>
            <Link to="#features">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 text-white hover:text-primary w-full sm:w-auto border-white hover:bg-white/90 dark:hover:bg-white/90"
              >
                {t("landing.learnMore", "Mehr erfahren")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
