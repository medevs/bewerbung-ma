import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import {
  Clock,
  Calendar,
  Utensils,
  Home,
  Briefcase,
  School,
  Heart,
  Users,
  AlertTriangle,
} from "lucide-react";

const GermanCultureGuide = () => {
  const [activeTab, setActiveTab] = useState("daily-life");

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Deutsche Kultur & Integration</h1>

      <Tabs
        defaultValue="daily-life"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="mb-6 w-full flex flex-wrap">
          <TabsTrigger value="daily-life" className="flex-1 sm:flex-none">
            <Clock className="w-4 h-4 mr-2" />
            Alltag
          </TabsTrigger>
          <TabsTrigger value="work-culture" className="flex-1 sm:flex-none">
            <Briefcase className="w-4 h-4 mr-2" />
            Arbeitskultur
          </TabsTrigger>
          <TabsTrigger value="language" className="flex-1 sm:flex-none">
            <Users className="w-4 h-4 mr-2" />
            Sprache
          </TabsTrigger>
          <TabsTrigger value="customs" className="flex-1 sm:flex-none">
            <Calendar className="w-4 h-4 mr-2" />
            Bräuche
          </TabsTrigger>
          <TabsTrigger value="integration" className="flex-1 sm:flex-none">
            <Heart className="w-4 h-4 mr-2" />
            Integration
          </TabsTrigger>
        </TabsList>

        <TabsContent value="daily-life" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Alltag in Deutschland</CardTitle>
              <CardDescription>
                Wichtige Aspekte des täglichen Lebens in Deutschland
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-medium">Pünktlichkeit</h3>
                  </div>
                  <p className="text-sm">
                    Pünktlichkeit ist in Deutschland sehr wichtig. Zu spät zu
                    kommen gilt als unhöflich und respektlos. Plane immer etwas
                    Zeit für unvorhergesehene Verzögerungen ein.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Bei Terminen 5-10 Minuten früher erscheinen</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Home className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-medium">Mülltrennung</h3>
                  </div>
                  <p className="text-sm">
                    Mülltrennung ist in Deutschland Pflicht. Es gibt
                    verschiedene Tonnen für unterschiedliche Abfallarten:
                    Restmüll, Papier, Verpackungen (Gelber Sack/Gelbe Tonne),
                    Bio und Glas.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                    >
                      Gelb: Verpackungen
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                    >
                      Blau: Papier
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                    >
                      Grün: Biomüll
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
                    >
                      Schwarz: Restmüll
                    </Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Utensils className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-medium">Essenszeiten</h3>
                  </div>
                  <p className="text-sm">
                    Deutsche essen in der Regel früher als in Marokko. Das
                    Abendessen (Abendbrot) wird oft zwischen 18 und 19 Uhr
                    eingenommen und besteht häufig aus Brot mit Aufschnitt und
                    Käse.
                  </p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Frühstück:</span>
                      <span>6:00 - 9:00 Uhr</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Mittagessen:</span>
                      <span>12:00 - 14:00 Uhr</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Abendessen:</span>
                      <span>18:00 - 20:00 Uhr</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-medium">Öffnungszeiten</h3>
                  </div>
                  <p className="text-sm">
                    Die meisten Geschäfte schließen früher als in Marokko.
                    Supermärkte schließen oft um 20:00 oder 22:00 Uhr. Sonntags
                    sind die meisten Geschäfte geschlossen (Ausnahmen:
                    Bäckereien am Vormittag, Tankstellen).
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <AlertTriangle className="w-4 h-4" />
                    <span>
                      Sonntags und an Feiertagen sind fast alle Geschäfte
                      geschlossen
                    </span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Öffentlicher Nahverkehr</h3>
                <p className="text-sm">
                  Deutschland hat ein gut ausgebautes öffentliches Verkehrsnetz.
                  In Städten gibt es Busse, Straßenbahnen, U-Bahnen und
                  S-Bahnen. Für längere Strecken stehen Regionalzüge und ICE
                  (Schnellzüge) zur Verfügung.
                </p>
                <div className="space-y-2">
                  <div className="p-3 border rounded-md">
                    <h4 className="font-medium mb-1">Tickets kaufen</h4>
                    <p className="text-sm">
                      Tickets können an Automaten, in Apps oder beim Fahrer
                      gekauft werden. Es gibt Einzelfahrten, Tageskarten und
                      Monatskarten. Für Auszubildende gibt es oft vergünstigte
                      Tickets.
                    </p>
                  </div>
                  <div className="p-3 border rounded-md">
                    <h4 className="font-medium mb-1">
                      Schwarzfahren vermeiden
                    </h4>
                    <p className="text-sm">
                      Fahre nie ohne gültiges Ticket. Kontrollen sind häufig und
                      die Strafen ("erhöhtes Beförderungsentgelt") betragen
                      mindestens 60 Euro.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="work-culture" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Deutsche Arbeitskultur</CardTitle>
              <CardDescription>
                Wichtige Aspekte der Arbeitskultur in Deutschland
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-medium">Arbeitszeiten</h3>
                  </div>
                  <p className="text-sm">
                    Die typische Arbeitszeit in Deutschland ist von 8:00 bis
                    17:00 Uhr mit einer Stunde Mittagspause. Pünktlichkeit am
                    Arbeitsplatz ist extrem wichtig. Verspätungen sollten immer
                    im Voraus kommuniziert werden.
                  </p>
                  <div className="p-3 border rounded-md bg-muted">
                    <h4 className="font-medium mb-1">Ausbildung</h4>
                    <p className="text-sm">
                      Als Auszubildender wirst du zwischen Berufsschule und
                      Betrieb wechseln. Die genauen Zeiten werden in deinem
                      Ausbildungsvertrag festgelegt.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-medium">Kommunikation</h3>
                  </div>
                  <p className="text-sm">
                    Deutsche kommunizieren in der Regel direkt und sachlich.
                    Kritik wird offen angesprochen und sollte nicht persönlich
                    genommen werden. Im Berufsleben wird meist die formelle
                    Anrede ("Sie") verwendet.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <AlertTriangle className="w-4 h-4" />
                    <span>
                      Verwende "Sie" und den Nachnamen, bis dir das "Du"
                      angeboten wird
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-medium">Hierarchie</h3>
                  </div>
                  <p className="text-sm">
                    Deutsche Unternehmen haben oft flachere Hierarchien als in
                    Marokko. Dennoch werden Entscheidungswege und
                    Zuständigkeiten klar definiert und respektiert.
                    Eigeninitiative wird geschätzt, sollte aber mit Vorgesetzten
                    abgestimmt werden.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <School className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-medium">Duale Ausbildung</h3>
                  </div>
                  <p className="text-sm">
                    Das duale Ausbildungssystem kombiniert praktische Arbeit im
                    Betrieb mit theoretischem Unterricht in der Berufsschule.
                    Diese Kombination ist international hoch angesehen und
                    bietet eine fundierte Berufsqualifikation.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">3-3,5 Jahre Dauer</Badge>
                    <Badge variant="outline">
                      Vergütung während der Ausbildung
                    </Badge>
                    <Badge variant="outline">Abschlussprüfung</Badge>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  Arbeitsrecht und Sozialversicherung
                </h3>
                <p className="text-sm">
                  Als Auszubildender in Deutschland hast du bestimmte Rechte und
                  Pflichten. Du bist automatisch sozialversichert, was Kranken-,
                  Renten-, Arbeitslosen- und Pflegeversicherung umfasst.
                </p>
                <div className="space-y-2">
                  <div className="p-3 border rounded-md">
                    <h4 className="font-medium mb-1">Urlaubsanspruch</h4>
                    <p className="text-sm">
                      Als Auszubildender hast du Anspruch auf mindestens 24
                      Werktage bezahlten Urlaub pro Jahr. Viele Betriebe
                      gewähren mehr Urlaubstage.
                    </p>
                  </div>
                  <div className="p-3 border rounded-md">
                    <h4 className="font-medium mb-1">Krankheit</h4>
                    <p className="text-sm">
                      Bei Krankheit musst du deinen Arbeitgeber sofort
                      informieren. Ab dem dritten Krankheitstag benötigst du in
                      der Regel eine ärztliche Bescheinigung
                      ("Krankschreibung").
                    </p>
                  </div>
                  <div className="p-3 border rounded-md">
                    <h4 className="font-medium mb-1">Ausbildungsvergütung</h4>
                    <p className="text-sm">
                      Die Höhe der Vergütung hängt von der Branche und dem
                      Ausbildungsjahr ab. Sie steigt in der Regel mit jedem
                      Ausbildungsjahr.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="language" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Deutsche Sprache im Alltag</CardTitle>
              <CardDescription>
                Tipps und Ressourcen zum Deutschlernen
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">
                    Nützliche Alltagsphrasen
                  </h3>
                  <div className="space-y-2">
                    <div className="p-3 border rounded-md">
                      <div className="flex justify-between">
                        <span className="font-medium">Guten Tag</span>
                        <span className="text-muted-foreground">مرحبا</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Formelle Begrüßung, zu jeder Tageszeit verwendbar
                      </p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <div className="flex justify-between">
                        <span className="font-medium">Auf Wiedersehen</span>
                        <span className="text-muted-foreground">
                          إلى اللقاء
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Formelle Verabschiedung
                      </p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <div className="flex justify-between">
                        <span className="font-medium">Bitte / Danke</span>
                        <span className="text-muted-foreground">
                          من فضلك / شكرا
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Höflichkeitsformeln, die sehr häufig verwendet werden
                      </p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <div className="flex justify-between">
                        <span className="font-medium">Entschuldigung</span>
                        <span className="text-muted-foreground">عذرا</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Für Entschuldigungen oder um Aufmerksamkeit zu erregen
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Berufssprache</h3>
                  <p className="text-sm">
                    Für deine Ausbildung ist es wichtig, die Fachbegriffe deines
                    Berufs zu lernen. Viele Berufsschulen bieten zusätzliche
                    Sprachkurse für Auszubildende mit Migrationshintergrund an.
                  </p>
                  <div className="p-3 border rounded-md">
                    <h4 className="font-medium mb-1">
                      Tipps zum Sprachenlernen
                    </h4>
                    <ul className="text-sm space-y-1">
                      <li>
                        • Nutze Apps wie Duolingo oder Babbel für tägliches Üben
                      </li>
                      <li>• Sieh deutsche Filme/Serien mit Untertiteln</li>
                      <li>• Höre deutsche Musik oder Podcasts</li>
                      <li>• Finde einen Tandempartner zum Üben</li>
                      <li>• Führe ein Vokabelheft für neue Wörter</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  Sprachkurse und Ressourcen
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-md">
                    <h4 className="font-medium mb-2">Integrationskurse</h4>
                    <p className="text-sm mb-4">
                      Vom Bundesamt für Migration und Flüchtlinge (BAMF)
                      geförderte Kurse, die Sprachunterricht und
                      Orientierungswissen kombinieren.
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Mehr Informationen
                    </Button>
                  </div>

                  <div className="p-4 border rounded-md">
                    <h4 className="font-medium mb-2">
                      Berufsbezogene Sprachkurse
                    </h4>
                    <p className="text-sm mb-4">
                      Spezialisierte Kurse, die auf bestimmte Berufsfelder
                      ausgerichtet sind und entsprechendes Fachvokabular
                      vermitteln.
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Kursangebote finden
                    </Button>
                  </div>

                  <div className="p-4 border rounded-md">
                    <h4 className="font-medium mb-2">Online-Lernplattformen</h4>
                    <p className="text-sm mb-4">
                      Kostenlose und kostenpflichtige Online-Kurse zum
                      Selbstlernen, wie Deutsche Welle, VHS-Lernportal oder
                      Goethe-Institut.
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Zu den Plattformen
                    </Button>
                  </div>

                  <div className="p-4 border rounded-md">
                    <h4 className="font-medium mb-2">
                      Sprachcafés und Tandems
                    </h4>
                    <p className="text-sm mb-4">
                      Informelle Treffen zum Sprachaustausch, die in vielen
                      Städten angeboten werden und eine gute Möglichkeit bieten,
                      Deutsch zu üben.
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      In deiner Nähe finden
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Deutsche Bräuche und Feiertage</CardTitle>
              <CardDescription>
                Wichtige kulturelle Traditionen und Feiertage in Deutschland
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Wichtige Feiertage</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      <h4 className="font-medium">
                        Weihnachten (24.-26. Dezember)
                      </h4>
                    </div>
                    <p className="text-sm">
                      Das wichtigste Familienfest in Deutschland. Am Heiligabend
                      (24.12.) werden Geschenke ausgetauscht, der 25. und 26.12.
                      sind gesetzliche Feiertage.
                    </p>
                  </div>

                  <div className="p-4 border rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      <h4 className="font-medium">Ostern (März/April)</h4>
                    </div>
                    <p className="text-sm">
                      Religiöses Fest mit Traditionen wie Ostereiersuche.
                      Karfreitag und Ostermontag sind gesetzliche Feiertage.
                    </p>
                  </div>

                  <div className="p-4 border rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      <h4 className="font-medium">
                        Tag der Deutschen Einheit (3. Oktober)
                      </h4>
                    </div>
                    <p className="text-sm">
                      Nationaler Feiertag zur Erinnerung an die deutsche
                      Wiedervereinigung 1990.
                    </p>
                  </div>

                  <div className="p-4 border rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      <h4 className="font-medium">
                        Silvester/Neujahr (31. Dezember/1. Januar)
                      </h4>
                    </div>
                    <p className="text-sm">
                      Silvester wird mit Feuerwerk gefeiert, Neujahr ist ein
                      gesetzlicher Feiertag.
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Regionale Traditionen</h3>
                <p className="text-sm">
                  Deutschland hat viele regionale Traditionen und Feste, die je
                  nach Bundesland unterschiedlich sein können.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-md">
                    <h4 className="font-medium mb-2">Oktoberfest (Bayern)</h4>
                    <p className="text-sm">
                      Das weltberühmte Bierfest in München mit traditioneller
                      Kleidung (Dirndl und Lederhosen).
                    </p>
                  </div>

                  <div className="p-4 border rounded-md">
                    <h4 className="font-medium mb-2">
                      Karneval/Fasching (Rheinland, Süddeutschland)
                    </h4>
                    <p className="text-sm">
                      Bunte Feierlichkeiten vor der Fastenzeit mit Kostümen,
                      Umzügen und Partys.
                    </p>
                  </div>

                  <div className="p-4 border rounded-md">
                    <h4 className="font-medium mb-2">
                      Weihnachtsmärkte (bundesweit)
                    </h4>
                    <p className="text-sm">
                      Im Dezember finden in fast allen Städten traditionelle
                      Weihnachtsmärkte mit Glühwein, Lebkuchen und
                      Handwerkskunst statt.
                    </p>
                  </div>

                  <div className="p-4 border rounded-md">
                    <h4 className="font-medium mb-2">Maifeiertag (1. Mai)</h4>
                    <p className="text-sm">
                      Gesetzlicher Feiertag mit regionalen Traditionen wie dem
                      Aufstellen von Maibäumen.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-md bg-muted">
                <h3 className="font-medium mb-2">
                  Kulturelle Unterschiede beachten
                </h3>
                <div className="space-y-2 text-sm">
                  <p>
                    • In Deutschland ist es üblich, Geburtstage zu feiern und
                    dem Geburtstagskind zu gratulieren.
                  </p>
                  <p>
                    • Bei Einladungen zum Essen ist Pünktlichkeit wichtig. Ein
                    kleines Gastgeschenk (Blumen, Wein) wird geschätzt.
                  </p>
                  <p>
                    • Sonntage sind traditionell Ruhetage. Laute Aktivitäten wie
                    Rasenmähen sind dann nicht erlaubt.
                  </p>
                  <p>
                    • In vielen Wohngebäuden gibt es eine "Hausordnung" mit
                    Regeln zum Zusammenleben, die respektiert werden sollte.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integration" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Integration in Deutschland</CardTitle>
              <CardDescription>
                Tipps und Ressourcen für eine erfolgreiche Integration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">
                    Erste Schritte nach der Ankunft
                  </h3>
                  <div className="space-y-2">
                    <div className="p-3 border rounded-md">
                      <h4 className="font-medium mb-1">
                        Anmeldung beim Einwohnermeldeamt
                      </h4>
                      <p className="text-sm">
                        Innerhalb von 14 Tagen nach Einzug in eine Wohnung musst
                        du dich beim lokalen Einwohnermeldeamt anmelden.
                      </p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <h4 className="font-medium mb-1">Aufenthaltserlaubnis</h4>
                      <p className="text-sm">
                        Nach der Einreise mit dem Visum musst du bei der
                        Ausländerbehörde eine Aufenthaltserlaubnis beantragen.
                      </p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <h4 className="font-medium mb-1">Bankkonto eröffnen</h4>
                      <p className="text-sm">
                        Für die Ausbildungsvergütung und alltägliche Zahlungen
                        benötigst du ein deutsches Bankkonto.
                      </p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <h4 className="font-medium mb-1">Krankenversicherung</h4>
                      <p className="text-sm">
                        Als Auszubildender wirst du automatisch
                        krankenversichert. Die Beiträge werden von deinem Gehalt
                        abgezogen.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Soziale Integration</h3>
                  <p className="text-sm">
                    Die soziale Integration ist genauso wichtig wie die formalen
                    Aspekte. Hier sind einige Tipps, wie du Kontakte knüpfen und
                    dich in Deutschland heimisch fühlen kannst.
                  </p>
                  <div className="space-y-2">
                    <div className="p-3 border rounded-md">
                      <h4 className="font-medium mb-1">Vereine und Gruppen</h4>
                      <p className="text-sm">
                        Deutschland hat eine starke Vereinskultur. Sportvereine,
                        Musikgruppen oder ehrenamtliche Organisationen sind gute
                        Orte, um Menschen kennenzulernen.
                      </p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <h4 className="font-medium mb-1">
                        Interkulturelle Veranstaltungen
                      </h4>
                      <p className="text-sm">
                        Viele Städte organisieren interkulturelle Feste und
                        Veranstaltungen, die eine gute Gelegenheit bieten, die
                        lokale Gemeinschaft kennenzulernen.
                      </p>
                    </div>
                    <div className="p-3 border rounded-md">
                      <h4 className="font-medium mb-1">Sprachcafés</h4>
                      <p className="text-sm">
                        Sprachcafés bieten nicht nur die Möglichkeit, Deutsch zu
                        üben, sondern auch, andere Menschen in ähnlichen
                        Situationen zu treffen.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Unterstützungsangebote</h3>
                <p className="text-sm">
                  Es gibt zahlreiche Organisationen und Programme, die
                  internationale Auszubildende in Deutschland unterstützen.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-md">
                    <h4 className="font-medium mb-2">
                      Migrationsberatung für Erwachsene (MBE)
                    </h4>
                    <p className="text-sm mb-4">
                      Kostenlose Beratung zu allen Fragen rund um Integration,
                      Aufenthalt und Alltag in Deutschland.
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Beratungsstelle finden
                    </Button>
                  </div>

                  <div className="p-4 border rounded-md">
                    <h4 className="font-medium mb-2">
                      Jugendmigrationsdienste (JMD)
                    </h4>
                    <p className="text-sm mb-4">
                      Spezielle Beratung und Unterstützung für junge Menschen
                      mit Migrationshintergrund bis 27 Jahre.
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      JMD in der Nähe finden
                    </Button>
                  </div>

                  <div className="p-4 border rounded-md">
                    <h4 className="font-medium mb-2">Willkommenslotsen</h4>
                    <p className="text-sm mb-4">
                      Unterstützung für Betriebe und internationale
                      Auszubildende während der Ausbildung.
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Mehr erfahren
                    </Button>
                  </div>

                  <div className="p-4 border rounded-md">
                    <h4 className="font-medium mb-2">
                      Ausbildungsbegleitende Hilfen (abH)
                    </h4>
                    <p className="text-sm mb-4">
                      Kostenlose Unterstützung bei schulischen Problemen während
                      der Ausbildung.
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Angebote finden
                    </Button>
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-md bg-blue-50 dark:bg-blue-950">
                <h3 className="font-medium mb-2">Langfristige Perspektiven</h3>
                <p className="text-sm mb-4">
                  Nach erfolgreichem Abschluss deiner Ausbildung hast du gute
                  Chancen, in Deutschland zu bleiben und zu arbeiten. Mit einer
                  qualifizierten Beschäftigung kannst du nach einigen Jahren
                  eine Niederlassungserlaubnis (unbefristeter Aufenthalt)
                  beantragen.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GermanCultureGuide;
