import React, { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/index.tsx";
import { useParams } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { Button } from "../ui/button";
import {
  ResizeHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import ResumeForm from "./ResumeForm";
import ResumePreview from "./ResumePreview";
import ResumeStats from "./ResumeStats";
import ResumeComparison from "./ResumeComparison";
import ResumeTemplatePreview from "./ResumeTemplatePreview";
import CulturalAdaptation from "./CulturalAdaptation";
import MultilingualSupport from "./MultilingualSupport";
import ApplicationTracker from "./ApplicationTracker";
import InterviewPrep from "./InterviewPrep";
import ExportOptions from "./ExportOptions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface ResumeBuilderProps {
  id?: string;
  initialData?: any;
  onSave?: (data: any) => void;
  onExport?: () => void;
}

const templates = [
  { id: "german", name: "German" },
  { id: "modern", name: "Modern" },
  { id: "professional", name: "Professional" },
  { id: "creative", name: "Creative" },
];

const ResumeBuilder = ({
  onSave = () => {},
  onExport = () => {},
}: ResumeBuilderProps) => {
  const { t } = useLanguage();
  const { id } = useParams();
  const { user } = useAuth();
  const [isInitialized, setIsInitialized] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedTemplate, setSelectedTemplate] = useState("german");
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");

  const sampleData = {
    firstName: "Lisa",
    lastName: "Brinkmann",
    title: "Informatikerin",
    email: "lisa-brinkmann@dmail.com",
    phone: "0173 928 1821",
    address: "Bonner Straße 921",
    postalCode: "14197",
    city: "Berlin",
    experience: [
      {
        title: "IT-Spezialistin im Kundensupport",
        company: "TeleZoom AG, Berlin",
        startDate: "2017-07",
        endDate: "present",
        details: [
          "Bearbeitung von rund 20 Kundenaufträgen täglich",
          "Migration von 2500 E-Mail-Accounts auf eine neue Domain",
          "Implementierung neuer Software- und Hardwarelösungen",
          "Erstellung eines Leitfadens zu alltäglichen Prozessen",
          "Produktivitäts-Auszeichnung 2020",
        ],
      },
    ],
    education: [
      {
        degree: "Master of Science, Informatik",
        institution: "TH Köln",
        startDate: "2013-10",
        endDate: "2015-09",
      },
    ],
    languages: [
      { language: "Deutsch", level: "Muttersprache" },
      { language: "Englisch", level: "Sehr gut" },
    ],
    itSkills: [
      { name: "Java", level: "5" },
      { name: "C++", level: "4" },
      { name: "JIRA", level: "3" },
    ],
  };

  useEffect(() => {
    console.log("ResumeBuilder mounted with id:", id);
    if (id && id !== "new") {
      loadResume();
    } else {
      console.log("No ID or new resume, setting sample data");
      setFormData(sampleData);
      setIsInitialized(true);
    }
  }, [id]);

  // Auto-save when template changes
  useEffect(() => {
    if (
      id &&
      id !== "new" &&
      isInitialized &&
      Object.keys(formData).length > 0
    ) {
      handleSave();
    }
  }, [selectedTemplate, id, isInitialized, formData]);

  const loadResume = async () => {
    try {
      const { data, error } = await supabase
        .from("resumes")
        .select("content, title")
        .eq("id", id)
        .single();

      if (error) throw error;
      if (data) {
        console.log("Loaded resume:", data);
        setFormData(data.content || {});
        setIsInitialized(true);
      }
    } catch (error) {
      console.error("Error loading resume:", error);
      setFormData({});
      setIsInitialized(true);
    }
  };

  const handleFormChange = (newData: any) => {
    setFormData(newData);
  };

  const handleSave = async () => {
    try {
      if (!user?.id) {
        console.error("No user ID found");
        return;
      }

      if (Object.keys(formData).length === 0) {
        console.error("Form data is empty");
        return;
      }

      setSaveStatus("saving");
      console.log("Saving resume with ID:", id);

      const resumeData = {
        id: id && id !== "new" ? id : undefined,
        user_id: user.id,
        title: `${formData.firstName || "Untitled"} ${formData.lastName || ""}'s Resume`,
        content: formData,
        updated_at: new Date().toISOString(),
      };

      console.log("Resume data to save:", resumeData);

      const { data, error } = await supabase
        .from("resumes")
        .upsert(resumeData)
        .select()
        .single();

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      console.log("Save response:", data);

      if (data && (!id || id === "new")) {
        const newUrl = `/resume/${data.id}`;
        console.log("Redirecting to:", newUrl);
        window.location.href = newUrl;
        return; // Stop execution after redirect
      }

      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch (error) {
      console.error("Error saving resume:", error);
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }
  };

  const handleExport = async (format = "pdf") => {
    if (format === "pdf") {
      const html2pdf = (await import("html2pdf.js")).default;
      const element = document.querySelector(".resume-preview");
      if (!element) return;

      const opt = {
        margin: [15, 15],
        filename: `${formData.firstName || "Resume"}_${formData.lastName || ""}_CV.pdf`,
        pagebreak: { mode: ["avoid-all"] },
        image: { type: "jpeg", quality: 1 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          backgroundColor: "#ffffff",
          windowWidth: 1024,
          scrollY: 0,
          scrollX: 0,
          removeContainer: true,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
          compress: true,
          precision: 16,
        },
      };

      try {
        await html2pdf().set(opt).from(element).save();
      } catch (error) {
        console.error("Error exporting PDF:", error);
      }
    } else if (format === "docx") {
      // For demonstration purposes - in a real app, you'd implement proper DOCX export
      alert("DOCX export functionality coming soon!");
    } else if (format === "txt") {
      // Simple text export
      try {
        const text =
          `${formData.firstName} ${formData.lastName}\n\n` +
          `Contact: ${formData.email} | ${formData.phone}\n` +
          `Address: ${formData.address}, ${formData.postalCode} ${formData.city}\n\n` +
          `EXPERIENCE\n${
            formData.experience
              ?.map(
                (exp) =>
                  `${exp.startDate} - ${exp.endDate}: ${exp.title} at ${exp.company}\n` +
                  `${exp.details?.join("\n")}\n`,
              )
              .join("\n") || ""
          }\n` +
          `EDUCATION\n${
            formData.education
              ?.map(
                (edu) =>
                  `${edu.startDate} - ${edu.endDate}: ${edu.degree} at ${edu.institution}\n`,
              )
              .join("\n") || ""
          }\n` +
          `SKILLS\n${formData.itSkills?.map((skill) => `${skill.name}: ${skill.level}/5`).join("\n") || ""}\n` +
          `LANGUAGES\n${formData.languages?.map((lang) => `${lang.language}: ${lang.level}`).join("\n") || ""}`;

        const blob = new Blob([text], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${formData.firstName || "Resume"}_${formData.lastName || ""}_CV.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error exporting TXT:", error);
      }
    }
  };

  return (
    <div className="flex-1">
      <div className="border-b bg-background px-4 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-4 flex-wrap">
          <h1 className="text-xl font-semibold">{t("resume.builder")}</h1>
          <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Vorlagen" />
            </SelectTrigger>
            <SelectContent>
              {templates.map((template) => (
                <SelectItem key={template.id} value={template.id}>
                  {template.id === "german"
                    ? "Deutscher Stil"
                    : template.id === "modern"
                      ? "Modern"
                      : template.id === "professional"
                        ? "Professionell"
                        : "Kreativ"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2 flex-wrap w-full sm:w-auto justify-center sm:justify-end">
          <Button
            variant="outline"
            onClick={handleSave}
            disabled={saveStatus === "saving"}
          >
            {saveStatus === "saving"
              ? t("resume.saving")
              : saveStatus === "saved"
                ? t("resume.saved")
                : saveStatus === "error"
                  ? t("resume.error")
                  : t("resume.saveAsDraft")}
          </Button>
          <ExportOptions onExport={handleExport} documentType="resume" />
          <Button
            variant="outline"
            onClick={() => {
              setFormData({ ...sampleData });
              setIsInitialized(true);
            }}
          >
            {t("resume.loadSampleData")}
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              setFormData({});
              setIsInitialized(true);
            }}
          >
            {t("resume.clearAll")}
          </Button>
        </div>
      </div>

      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[calc(100vh-57px)]"
      >
        <ResizablePanel defaultSize={40} minSize={30}>
          <div className="h-full p-4 overflow-auto bg-background dark:bg-gray-900">
            <Accordion type="single" collapsible className="w-full mb-4">
              <AccordionItem value="form">
                <AccordionTrigger className="text-lg font-medium">
                  {t("resume.form")}
                </AccordionTrigger>
                <AccordionContent>
                  <ResumeForm
                    initialData={formData}
                    onChange={handleFormChange}
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="templates">
                <AccordionTrigger className="text-lg font-medium">
                  {t("resume.templates")}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Wählen Sie eine Vorlage für Ihren deutschen Lebenslauf:
                    </p>
                    <ResumeTemplatePreview
                      templates={templates.map((t) => ({
                        ...t,
                        description:
                          t.id === "german"
                            ? "Traditionelles deutsches Lebenslauf-Format"
                            : t.id === "modern"
                              ? "Klares, minimalistisches Design"
                              : t.id === "professional"
                                ? "Professionelles, strukturiertes Layout"
                                : "Kreatives, herausstechendes Design",
                        thumbnail: `https://images.unsplash.com/photo-${
                          t.id === "german"
                            ? "1586281380349-632531db7ed4"
                            : t.id === "modern"
                              ? "1618005182384-a83a8bd57fbe"
                              : t.id === "professional"
                                ? "1626785774573-4b799315345d"
                                : "1626785774573-4b799315345d"
                        }?w=300&h=200&fit=crop`,
                      }))}
                      selectedTemplate={selectedTemplate}
                      onSelectTemplate={setSelectedTemplate}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="stats">
                <AccordionTrigger className="text-lg font-medium">
                  {t("resume.analysis")}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <ResumeStats resumeData={formData} />
                    <ResumeComparison resumeData={formData} />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="cultural">
                <AccordionTrigger className="text-lg font-medium">
                  {t("resume.culturalAdaptation")}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <CulturalAdaptation
                      resumeData={formData}
                      targetCountry="germany"
                    />
                    <MultilingualSupport
                      currentLanguage="de"
                      onLanguageChange={(lang) => {
                        console.log(`Language changed to ${lang}`);
                        // In a real implementation, this would change the UI language
                        alert(
                          `Sprachunterstützung für ${lang} wird bald implementiert!`,
                        );
                      }}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="applications">
                <AccordionTrigger className="text-lg font-medium">
                  {t("resume.applicationTracker")}
                </AccordionTrigger>
                <AccordionContent>
                  <ApplicationTracker />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="interview">
                <AccordionTrigger className="text-lg font-medium">
                  {t("resume.interviewPrep")}
                </AccordionTrigger>
                <AccordionContent>
                  <InterviewPrep jobType="ausbildung" />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </ResizablePanel>
        <ResizeHandle />
        <ResizablePanel defaultSize={60} minSize={30}>
          <div
            className="h-full p-2 sm:p-4 bg-muted overflow-auto dark:bg-gray-800 flex items-center justify-center"
            dir="ltr"
          >
            <ResumePreview data={formData} template={selectedTemplate} />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default ResumeBuilder;
