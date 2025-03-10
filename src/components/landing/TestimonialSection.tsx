import React from "react";
import { useLanguage } from "@/lib/i18n/index.tsx";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Quote } from "lucide-react";

export default function TestimonialSection() {
  const { t } = useLanguage();

  const testimonials = [
    {
      quote: t(
        "landing.testimonial1",
        "Dank dieser Plattform habe ich meinen Ausbildungsplatz als Fachinformatiker gefunden und alle Unterlagen perfekt vorbereitet. Der Visum-Prozess war viel einfacher als erwartet!",
      ),
      author: "Mohammed A.",
      role: t("landing.testimonialRole1", "Auszubildender, Fachinformatiker"),
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohammed",
    },
    {
      quote: t(
        "landing.testimonial2",
        "Die KI-gestützten Anschreiben haben mir sehr geholfen, mich richtig auszudrücken. Ich konnte meine Deutschkenntnisse verbessern und habe jetzt eine Ausbildung zur Krankenpflegerin.",
      ),
      author: "Fatima B.",
      role: t("landing.testimonialRole2", "Auszubildende, Gesundheitswesen"),
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima",
    },
    {
      quote: t(
        "landing.testimonial3",
        "Der Kulturguide hat mir geholfen, mich schnell in Deutschland einzuleben. Die Tipps für das Vorstellungsgespräch waren Gold wert!",
      ),
      author: "Youssef M.",
      role: t("landing.testimonialRole3", "Auszubildender, Mechatroniker"),
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Youssef",
    },
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("landing.testimonialsTitle", "Was unsere Nutzer sagen")}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t(
              "landing.testimonialsSubtitle",
              "Erfolgsgeschichten von Auszubildenden, die ihren Weg nach Deutschland gefunden haben",
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-background dark:bg-gray-800 border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-4px]"
            >
              <CardContent className="p-6 space-y-4">
                <Quote className="h-8 w-8 text-primary/60" />
                <p className="text-foreground italic">"{testimonial.quote}"</p>
                <div className="flex items-center pt-4">
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage
                      src={testimonial.avatar}
                      alt={testimonial.author}
                    />
                    <AvatarFallback>{testimonial.author[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
