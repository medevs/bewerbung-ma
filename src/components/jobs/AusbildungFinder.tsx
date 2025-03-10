import React, { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/index.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import {
  Search,
  MapPin,
  Briefcase,
  Building,
  ExternalLink,
  Wand2,
  Loader2,
} from "lucide-react";

const ausbildungFields = [
  { id: "handwerk", name: "Handwerk" },
  { id: "technik", name: "Technik & Produktion" },
  { id: "it", name: "IT & Digitales" },
  { id: "gesundheit", name: "Gesundheit & Pflege" },
  { id: "gastro", name: "Gastronomie & Hotellerie" },
  { id: "kaufmaennisch", name: "Kaufmännisch & Verwaltung" },
  { id: "logistik", name: "Logistik & Transport" },
];

const germanCities = [
  { id: "berlin", name: "Berlin" },
  { id: "hamburg", name: "Hamburg" },
  { id: "muenchen", name: "München" },
  { id: "koeln", name: "Köln" },
  { id: "frankfurt", name: "Frankfurt" },
  { id: "stuttgart", name: "Stuttgart" },
  { id: "duesseldorf", name: "Düsseldorf" },
  { id: "dortmund", name: "Dortmund" },
];

const sampleAusbildungPositions = [
  {
    id: "1",
    title: "Ausbildung zum Fachinformatiker für Anwendungsentwicklung",
    company: "TechSolutions GmbH",
    location: "Berlin",
    field: "it",
    description:
      "Als Auszubildender zum Fachinformatiker für Anwendungsentwicklung lernst du bei uns die Entwicklung und Programmierung von Softwarelösungen. Du wirst Teil eines dynamischen Teams und arbeitest an realen Kundenprojekten mit.",
    requirements: [
      "Guter Schulabschluss",
      "Grundkenntnisse in Programmierung",
      "Deutschkenntnisse B1-B2",
      "Teamfähigkeit",
    ],
    benefits: [
      "Übernahmegarantie bei guten Leistungen",
      "Zusätzliche Sprachkurse",
      "Betriebliche Altersvorsorge",
    ],
    startDate: "01.08.2024",
    duration: "3 Jahre",
    url: "https://example.com/ausbildung1",
    visaSponsorship: true,
    accommodation: false,
  },
  {
    id: "2",
    title: "Ausbildung zum Elektroniker für Betriebstechnik",
    company: "Elektro Müller AG",
    location: "München",
    field: "technik",
    description:
      "In deiner Ausbildung zum Elektroniker für Betriebstechnik lernst du alles über elektrische Anlagen und Systeme. Du wirst für die Installation, Wartung und Reparatur von elektrischen Betriebsanlagen ausgebildet.",
    requirements: [
      "Mittlerer Schulabschluss",
      "Technisches Verständnis",
      "Deutschkenntnisse B1",
      "Handwerkliches Geschick",
    ],
    benefits: ["Übertarifliche Vergütung", "30 Tage Urlaub", "Firmenfitness"],
    startDate: "01.09.2024",
    duration: "3,5 Jahre",
    url: "https://example.com/ausbildung2",
    visaSponsorship: true,
    accommodation: true,
  },
  {
    id: "3",
    title: "Ausbildung zur Pflegefachkraft",
    company: "Klinikum Gesundheit",
    location: "Hamburg",
    field: "gesundheit",
    description:
      "Als angehende Pflegefachkraft lernst du die professionelle Betreuung und Pflege von Patienten. Du wirst in allen Bereichen der Pflege ausgebildet und erhältst eine fundierte theoretische und praktische Ausbildung.",
    requirements: [
      "Mittlerer Schulabschluss",
      "Empathie",
      "Deutschkenntnisse B2",
      "Belastbarkeit",
    ],
    benefits: [
      "Schichtzulagen",
      "Unterstützung bei Wohnungssuche",
      "Weiterbildungsmöglichkeiten",
    ],
    startDate: "01.04.2024",
    duration: "3 Jahre",
    url: "https://example.com/ausbildung3",
    visaSponsorship: true,
    accommodation: true,
  },
  {
    id: "4",
    title: "Ausbildung zum Koch",
    company: "Gourmet Restaurant Schlemmer",
    location: "Frankfurt",
    field: "gastro",
    description:
      "In deiner Ausbildung zum Koch lernst du die Zubereitung von Speisen, Menüplanung und Lebensmittelkunde. Du wirst in allen Bereichen der Küche eingesetzt und lernst verschiedene Kochtechniken und internationale Küche kennen.",
    requirements: [
      "Hauptschulabschluss",
      "Interesse am Kochen",
      "Deutschkenntnisse A2-B1",
      "Teamfähigkeit",
    ],
    benefits: [
      "Personalessen",
      "Flexible Arbeitszeiten",
      "Internationale Küche",
    ],
    startDate: "15.08.2024",
    duration: "3 Jahre",
    url: "https://example.com/ausbildung4",
    visaSponsorship: false,
    accommodation: false,
  },
  {
    id: "5",
    title: "Ausbildung zum Kaufmann im Einzelhandel",
    company: "Modehaus Schmidt",
    location: "Köln",
    field: "kaufmaennisch",
    description:
      "Als Auszubildender zum Kaufmann im Einzelhandel lernst du den Verkauf von Waren, Kundenberatung und betriebswirtschaftliche Grundlagen. Du wirst in allen Bereichen des Einzelhandels eingesetzt.",
    requirements: [
      "Mittlerer Schulabschluss",
      "Kommunikationsstärke",
      "Deutschkenntnisse B1",
      "Kundenorientierung",
    ],
    benefits: [
      "Mitarbeiterrabatte",
      "Leistungsprämien",
      "Gute Übernahmechancen",
    ],
    startDate: "01.08.2024",
    duration: "3 Jahre",
    url: "https://example.com/ausbildung5",
    visaSponsorship: false,
    accommodation: false,
  },
  {
    id: "6",
    title: "Ausbildung zur Fachkraft für Lagerlogistik",
    company: "Logistik Express GmbH",
    location: "Dortmund",
    field: "logistik",
    description:
      "In deiner Ausbildung zur Fachkraft für Lagerlogistik lernst du die Organisation und Kontrolle von Warenein- und -ausgängen, Lagerung und den Umgang mit Logistiksystemen.",
    requirements: [
      "Hauptschulabschluss",
      "Körperliche Fitness",
      "Deutschkenntnisse A2-B1",
      "Technisches Verständnis",
    ],
    benefits: [
      "Führerscheinzuschuss",
      "Betriebliche Altersvorsorge",
      "Sportangebote",
    ],
    startDate: "01.09.2024",
    duration: "3 Jahre",
    url: "https://example.com/ausbildung6",
    visaSponsorship: true,
    accommodation: false,
  },
];

const AusbildungFinder = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedField, setSelectedField] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [visaSponsorship, setVisaSponsorship] = useState(false);
  const [accommodation, setAccommodation] = useState(false);
  const [filteredPositions, setFilteredPositions] = useState(
    sampleAusbildungPositions,
  );

  const [loading, setLoading] = useState(false);

  // Apply initial search on component mount
  useEffect(() => {
    const initialLoad = async () => {
      setLoading(true);
      await handleSearch();
      setLoading(false);
    };
    initialLoad();
  }, []);

  const handleSearch = async () => {
    // Show loading state
    setFilteredPositions([]);

    // Simulate network delay for better UX feedback
    await new Promise((resolve) => setTimeout(resolve, 800));
    const filtered = sampleAusbildungPositions.filter((position) => {
      // Filter by search query
      const matchesQuery =
        searchQuery === "" ||
        position.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        position.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        position.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Filter by field
      const matchesField =
        selectedField === "all" || position.field === selectedField;

      // Filter by location
      const matchesLocation =
        selectedLocation === "all" ||
        position.location
          .toLowerCase()
          .includes(selectedLocation.toLowerCase());

      // Filter by visa sponsorship
      const matchesVisa = !visaSponsorship || position.visaSponsorship;

      // Filter by accommodation
      const matchesAccommodation = !accommodation || position.accommodation;

      return (
        matchesQuery &&
        matchesField &&
        matchesLocation &&
        matchesVisa &&
        matchesAccommodation
      );
    });

    // Simulate network delay for better UX feedback
    await new Promise((resolve) => setTimeout(resolve, 200));
    setFilteredPositions(filtered);
  };

  const handleGenerateLetter = (position: any) => {
    window.location.href = `/letter/new?jobTitle=${encodeURIComponent(position.title)}&company=${encodeURIComponent(position.company)}`;
  };

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{t("jobs.ausbildungFinder")}</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{t("jobs.ausbildung.title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder={t("dashboard.searchDocuments")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button
                onClick={async () => {
                  setLoading(true);
                  await handleSearch();
                  setLoading(false);
                }}
                className="whitespace-nowrap"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {t("common.loading")}
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    {t("common.search")}
                  </>
                )}
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("jobs.ausbildung.field")}
                </label>
                <Select value={selectedField} onValueChange={setSelectedField}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("jobs.ausbildung.allFields")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      {t("jobs.ausbildung.allFields")}
                    </SelectItem>
                    {ausbildungFields.map((field) => (
                      <SelectItem key={field.id} value={field.id}>
                        {field.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("jobs.ausbildung.location")}
                </label>
                <Select
                  value={selectedLocation}
                  onValueChange={setSelectedLocation}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={t("jobs.ausbildung.allLocations")}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      {t("jobs.ausbildung.allLocations")}
                    </SelectItem>
                    {germanCities.map((city) => (
                      <SelectItem key={city.id} value={city.name}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="visa-sponsorship"
                    checked={visaSponsorship}
                    onCheckedChange={(checked) =>
                      setVisaSponsorship(checked as boolean)
                    }
                  />
                  <Label htmlFor="visa-sponsorship">
                    {t("jobs.ausbildung.visaSponsorship")}
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="accommodation"
                    checked={accommodation}
                    onCheckedChange={(checked) =>
                      setAccommodation(checked as boolean)
                    }
                  />
                  <Label htmlFor="accommodation">
                    {t("jobs.ausbildung.accommodation")}
                  </Label>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold">
          {filteredPositions.length} {t("jobs.ausbildung.positionsFound")}
        </h2>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-2">{t("jobs.ausbildung.loading")}</span>
          </div>
        ) : filteredPositions.length > 0 ? (
          filteredPositions.map((position) => (
            <Card key={position.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold">
                        {position.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Building className="w-4 h-4 mr-1" />
                          {position.company}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {position.location}
                        </div>
                        <div className="flex items-center">
                          <Briefcase className="w-4 h-4 mr-1" />
                          {position.duration}
                        </div>
                      </div>
                    </div>

                    <p className="text-sm">{position.description}</p>

                    <div>
                      <h4 className="font-medium mb-1">
                        {t("jobs.requirements")}:
                      </h4>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        {position.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-1">
                        {t("jobs.benefits")}:
                      </h4>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        {position.benefits.map((benefit, index) => (
                          <li key={index}>{benefit}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {position.visaSponsorship && (
                        <Badge
                          variant="outline"
                          className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                        >
                          {t("jobs.ausbildung.visaSponsorship")}
                        </Badge>
                      )}
                      {position.accommodation && (
                        <Badge
                          variant="outline"
                          className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                        >
                          {t("jobs.ausbildung.accommodation")}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-row md:flex-col gap-2 mt-4 md:mt-0 md:min-w-[180px]">
                    <Button
                      onClick={() => handleGenerateLetter(position)}
                      className="flex-1 md:w-full"
                    >
                      <Wand2 className="w-4 h-4 mr-2" />
                      {t("jobs.generateLetter")}
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 md:w-full"
                      onClick={() => window.open(position.url, "_blank")}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {t("jobs.moreDetails")}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-12 border rounded-md">
            <p className="text-muted-foreground">
              {t("jobs.ausbildung.noPositionsFound")}.{" "}
              {t("jobs.ausbildung.adjustCriteria")}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AusbildungFinder;
