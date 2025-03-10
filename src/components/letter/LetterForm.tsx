import React, { useEffect } from "react";
import { useLanguage } from "@/lib/i18n/index.tsx";
import { supabase } from "@/lib/supabase";
import { generateMotivationLetter } from "@/lib/openai";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Wand2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const letterSchema = z.object({
  jobPosting: z.string().min(1, "Job posting text is required"),
  resumeId: z.string().min(1, "Please select a resume"),
});

type LetterFormData = z.infer<typeof letterSchema>;

interface LetterFormProps {
  initialData?: any;
  resumeData?: any;
  onChange?: (data: any) => void;
  onGenerate?: (letter: string) => void;
}

const LetterForm = ({
  initialData = {},
  resumeData = {},
  onChange = () => {},
  onGenerate = () => {},
}: LetterFormProps) => {
  const { t } = useLanguage();
  const [resumes, setResumes] = React.useState([]);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    address: "",
    postalCode: "",
    city: "",
    phone: "",
    email: "",
    company: "",
    department: "",
    hiringManager: "",
    companyAddress: "",
    companyCity: "",
    position: "",
    jobPosting: "",
    ...initialData,
  });

  // Check URL parameters for job information
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const jobTitle = params.get("jobTitle");
    const company = params.get("company");

    if (jobTitle || company) {
      const updatedData = { ...formData };
      if (jobTitle) updatedData.position = decodeURIComponent(jobTitle);
      if (company) updatedData.company = decodeURIComponent(company);
      setFormData(updatedData);
      onChange(updatedData);
    }
  }, []);

  useEffect(() => {
    loadResumes();
  }, []);

  const loadResumes = async () => {
    try {
      const { data, error } = await supabase
        .from("resumes")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (data) setResumes(data);
    } catch (error) {
      console.error("Error loading resumes:", error);
    }
  };

  const handleChange = (field: string, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onChange(newData);
  };

  const handleGenerate = async (data: LetterFormData) => {
    if (!data.resumeId || !data.jobPosting) {
      console.error("Missing required data");
      return;
    }

    setIsGenerating(true);
    try {
      const { data: selectedResume, error: resumeError } = await supabase
        .from("resumes")
        .select("content")
        .eq("id", data.resumeId)
        .single();

      if (resumeError) throw resumeError;
      if (!selectedResume) throw new Error("No resume found");

      // Auto-fill personal data from resume
      const resumeContent = selectedResume.content;
      handleChange("firstName", resumeContent.firstName || "");
      handleChange("lastName", resumeContent.lastName || "");
      handleChange("address", resumeContent.address || "");
      handleChange("postalCode", resumeContent.postalCode || "");
      handleChange("city", resumeContent.city || "");
      handleChange("phone", resumeContent.phone || "");
      handleChange("email", resumeContent.email || "");

      // Try to extract company info from job posting
      const jobText = data.jobPosting;
      const companyMatch = jobText.match(
        /(?:Company|Firma|Unternehmen):\s*([^\n]+)/i,
      );
      const departmentMatch = jobText.match(
        /(?:Department|Abteilung):\s*([^\n]+)/i,
      );
      const locationMatch = jobText.match(
        /(?:Location|Standort|Ort):\s*([^\n]+)/i,
      );

      if (companyMatch) handleChange("company", companyMatch[1].trim());
      if (departmentMatch)
        handleChange("department", departmentMatch[1].trim());
      if (locationMatch) handleChange("companyCity", locationMatch[1].trim());

      const letter = await generateMotivationLetter({
        jobPosting: data.jobPosting,
        resumeData: selectedResume.content,
      });

      onGenerate(letter);
    } catch (error) {
      console.error("Error generating letter:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleGenerate({
          jobPosting: e.currentTarget.jobPosting.value,
          resumeId: e.currentTarget.resumeId.value,
        });
      }}
      className="space-y-6"
    >
      <Card className="p-4">
        <div className="space-y-4">
          <Accordion type="single" collapsible defaultValue="personal">
            <AccordionItem value="personal">
              <AccordionTrigger>{t("letter.personalInfo")}</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>{t("letter.firstName")}</Label>
                    <Input
                      name="firstName"
                      value={formData.firstName || ""}
                      onChange={(e) =>
                        handleChange("firstName", e.target.value)
                      }
                      placeholder="Max"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t("letter.lastName")}</Label>
                    <Input
                      name="lastName"
                      value={formData.lastName || ""}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      placeholder="Mustermann"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t("letter.address")}</Label>
                    <Input
                      name="address"
                      value={formData.address || ""}
                      onChange={(e) => handleChange("address", e.target.value)}
                      placeholder="Musterstraße 38"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t("letter.postalCode")}</Label>
                    <Input
                      name="postalCode"
                      value={formData.postalCode || ""}
                      onChange={(e) =>
                        handleChange("postalCode", e.target.value)
                      }
                      placeholder="12345"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t("letter.city")}</Label>
                    <Input
                      name="city"
                      value={formData.city || ""}
                      onChange={(e) => handleChange("city", e.target.value)}
                      placeholder="Musterstadt"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t("letter.phone")}</Label>
                    <Input
                      name="phone"
                      value={formData.phone || ""}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="01234/56789"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t("letter.email")}</Label>
                    <Input
                      name="email"
                      value={formData.email || ""}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="max@mustermann.de"
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="company">
              <AccordionTrigger>{t("letter.companyInfo")}</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>{t("letter.company")}</Label>
                    <Input
                      name="company"
                      value={formData.company || ""}
                      onChange={(e) => handleChange("company", e.target.value)}
                      placeholder="[Company Name]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t("letter.department")}</Label>
                    <Input
                      name="department"
                      value={formData.department || ""}
                      onChange={(e) =>
                        handleChange("department", e.target.value)
                      }
                      placeholder="IT-Abteilung"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t("letter.hiringManager")}</Label>
                    <Input
                      name="hiringManager"
                      value={formData.hiringManager || ""}
                      onChange={(e) =>
                        handleChange("hiringManager", e.target.value)
                      }
                      placeholder="Hr. Schmidt"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t("letter.companyAddress")}</Label>
                    <Input
                      name="companyAddress"
                      value={formData.companyAddress || ""}
                      onChange={(e) =>
                        handleChange("companyAddress", e.target.value)
                      }
                      placeholder="Firmenstraße 1"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t("letter.companyCity")}</Label>
                    <Input
                      name="companyCity"
                      value={formData.companyCity || ""}
                      onChange={(e) =>
                        handleChange("companyCity", e.target.value)
                      }
                      placeholder="Berlin"
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Card>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>{t("letter.selectResume")}</Label>
            <Select name="resumeId" defaultValue={initialData.resumeId}>
              <SelectTrigger>
                <SelectValue placeholder={t("letter.selectResume")} />
              </SelectTrigger>
              <SelectContent>
                {resumes.map((resume: any) => (
                  <SelectItem key={resume.id} value={resume.id}>
                    {resume.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>{t("letter.jobPosting")}</Label>
            <Textarea
              name="jobPosting"
              defaultValue={initialData.jobPosting}
              placeholder={t("letter.jobPosting")}
              className="min-h-[300px]"
            />
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">{t("letter.aiAssistant")}</h2>
            <p className="text-sm text-muted-foreground">
              {t("letter.createDescription")}
            </p>
          </div>
          <Button type="submit" disabled={isGenerating}>
            <Wand2 className="w-4 h-4 mr-2" />
            {isGenerating
              ? t("letter.generatingLetter")
              : t("letter.generateLetter")}
          </Button>
        </div>
      </Card>
    </form>
  );
};

export default LetterForm;
