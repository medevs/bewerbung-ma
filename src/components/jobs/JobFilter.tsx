import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n/index.tsx";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search, Filter, Building, MapPin, Briefcase } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "../ui/sheet";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface JobFilterProps {
  onSearch: (query: string, filters: any) => void;
  isLoading?: boolean;
}

const germanCities = [
  { id: "berlin", name: "Berlin" },
  { id: "hamburg", name: "Hamburg" },
  { id: "munich", name: "München" },
  { id: "cologne", name: "Köln" },
  { id: "frankfurt", name: "Frankfurt" },
  { id: "stuttgart", name: "Stuttgart" },
  { id: "dusseldorf", name: "Düsseldorf" },
  { id: "dortmund", name: "Dortmund" },
];

const jobFields = [
  { id: "it", name: "IT & Software" },
  { id: "engineering", name: "Engineering" },
  { id: "finance", name: "Finance" },
  { id: "healthcare", name: "Healthcare" },
  { id: "marketing", name: "Marketing" },
  { id: "sales", name: "Sales" },
  { id: "education", name: "Education" },
  { id: "hospitality", name: "Hospitality" },
];

const JobFilter = ({ onSearch, isLoading = false }: JobFilterProps) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("any");
  const [jobType, setJobType] = useState("any");
  const [jobField, setJobField] = useState("any");
  const [visaSponsorship, setVisaSponsorship] = useState(false);
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [experienceLevel, setExperienceLevel] = useState("any");

  const handleSearch = () => {
    onSearch(searchQuery, {
      location,
      jobType,
      jobField,
      remoteOnly,
      visaSponsorship,
      experienceLevel,
    });
  };

  const handleReset = () => {
    setSearchQuery("");
    setLocation("any");
    setJobType("any");
    setJobField("any");
    setRemoteOnly(false);
    setVisaSponsorship(false);
    setExperienceLevel("any");
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{t("jobs.search")}</CardTitle>
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
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
            </div>
            <Button
              onClick={handleSearch}
              className="whitespace-nowrap"
              disabled={isLoading}
            >
              <Search className="w-4 h-4 mr-2" />
              {isLoading ? t("common.loading") : t("common.search")}
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                {t("jobs.location")}
              </label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger>
                  <SelectValue placeholder={t("jobs.anyLocation")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">{t("jobs.anyLocation")}</SelectItem>
                  {germanCities.map((city) => (
                    <SelectItem key={city.id} value={city.id}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                <Building className="w-4 h-4 inline mr-1" />
                {t("jobs.jobField")}
              </label>
              <Select value={jobField} onValueChange={setJobField}>
                <SelectTrigger>
                  <SelectValue placeholder={t("jobs.anyField")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">{t("jobs.anyField")}</SelectItem>
                  {jobFields.map((field) => (
                    <SelectItem key={field.id} value={field.id}>
                      {field.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                <Briefcase className="w-4 h-4 inline mr-1" />
                {t("jobs.jobType")}
              </label>
              <Select value={jobType} onValueChange={setJobType}>
                <SelectTrigger>
                  <SelectValue placeholder={t("jobs.anyType")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">{t("jobs.anyType")}</SelectItem>
                  <SelectItem value="full-time">
                    {t("jobs.fullTime")}
                  </SelectItem>
                  <SelectItem value="part-time">
                    {t("jobs.partTime")}
                  </SelectItem>
                  <SelectItem value="contract">{t("jobs.contract")}</SelectItem>
                  <SelectItem value="internship">
                    {t("jobs.internship")}
                  </SelectItem>
                  <SelectItem value="apprenticeship">
                    {t("jobs.apprenticeship")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {t("jobs.experienceLevel")}
              </label>
              <Select
                value={experienceLevel}
                onValueChange={setExperienceLevel}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("jobs.anyLevel")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">{t("jobs.anyLevel")}</SelectItem>
                  <SelectItem value="entry">{t("jobs.entryLevel")}</SelectItem>
                  <SelectItem value="mid">{t("jobs.midLevel")}</SelectItem>
                  <SelectItem value="senior">
                    {t("jobs.seniorLevel")}
                  </SelectItem>
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
                  {t("jobs.visaSponsorship")}
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remote"
                  checked={remoteOnly}
                  onCheckedChange={(checked) =>
                    setRemoteOnly(checked as boolean)
                  }
                />
                <Label htmlFor="remote">{t("jobs.remoteOnly")}</Label>
              </div>
            </div>

            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={handleReset}
                className="w-full"
              >
                {t("jobs.resetFilters")}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobFilter;
