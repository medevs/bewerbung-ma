import React, { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/index.tsx";
import { Button } from "../ui/button";
import {
  ResizeHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import LetterForm from "./LetterForm";
import LetterPreview from "./LetterPreview";
import LetterAIAssistant from "./LetterAIAssistant";
import LetterKeywords from "./LetterKeywords";
import LetterTemplates from "./LetterTemplates";
import LetterCulturalTips from "./LetterCulturalTips";
import ApprenticeshipFocus from "./ApprenticeshipFocus";
import ExportOptions from "../resume/ExportOptions";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { useParams, useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

interface LetterGeneratorProps {
  initialData?: any;
}

const LetterGenerator = ({ initialData = {} }: LetterGeneratorProps) => {
  const { t } = useLanguage();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
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
    ...initialData,
  });
  const [generatedContent, setGeneratedContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id && id !== "new") {
      loadLetter();
    }
  }, [id]);

  const loadLetter = async () => {
    try {
      const { data, error } = await supabase
        .from("letters")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      if (data) {
        setFormData(data.content);
        setGeneratedContent(data.content.generatedContent || "");
      }
    } catch (error) {
      console.error("Error loading letter:", error);
    }
  };

  const handleFormChange = (newData: any) => {
    setFormData(newData);
  };

  const handleGenerate = async (content: string) => {
    if (!content) return;
    setGeneratedContent(content);
    try {
      setLoading(true);
      const letterContent = {
        ...formData,
        generatedContent: content,
      };

      if (id && id !== "new") {
        await supabase
          .from("letters")
          .update({ content: letterContent, updated_at: new Date() })
          .eq("id", id);
      } else {
        const { data } = await supabase
          .from("letters")
          .insert([
            {
              user_id: user?.id,
              title: `Letter for ${formData.position || "Position"}`,
              content: letterContent,
            },
          ])
          .select()
          .single();

        if (data) window.location.href = `/letter/${data.id}`;
      }
    } catch (error) {
      console.error("Error saving letter:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const content = {
        ...formData,
        generatedContent,
      };

      if (id && id !== "new") {
        const { error } = await supabase
          .from("letters")
          .update({ content, updated_at: new Date() })
          .eq("id", id);
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from("letters")
          .insert([
            {
              user_id: user?.id,
              title: `Letter for ${formData.position || "Position"}`,
              content,
            },
          ])
          .select()
          .single();

        if (error) throw error;
        if (data) window.location.href = `/letter/${data.id}`;
      }
    } catch (error) {
      console.error("Error saving letter:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (format = "pdf") => {
    if (format === "pdf") {
      const html2pdf = (await import("html2pdf.js")).default;
      const element = document.querySelector(".letter-preview");
      if (!element) return;

      const opt = {
        margin: [15, 15],
        filename: `${formData.firstName || "Motivation"}_Letter.pdf`,
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
      alert("DOCX export functionality coming soon!");
    } else if (format === "txt") {
      try {
        const text =
          `${formData.firstName} ${formData.lastName}\n` +
          `${formData.address}\n` +
          `${formData.postalCode} ${formData.city}\n` +
          `${formData.phone}\n` +
          `${formData.email}\n\n` +
          `${formData.company}\n` +
          `${formData.department}\n` +
          `${formData.hiringManager}\n` +
          `${formData.companyAddress}\n` +
          `${formData.companyCity}\n\n` +
          `${formData.city}, ${new Date().toLocaleDateString()}\n\n` +
          `Bewerbung auf Ihr Stellenangebot als ${formData.position || "Mustermitarbeiter"}\n\n` +
          `Sehr geehrte Damen und Herren,\n\n` +
          `${generatedContent}\n\n` +
          `Mit freundlichen Grüßen\n\n` +
          `${formData.firstName} ${formData.lastName}`;

        const blob = new Blob([text], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${formData.firstName || "Motivation"}_Letter.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error exporting TXT:", error);
      }
    } else if (format === "email") {
      try {
        const subject = `Bewerbung als ${formData.position || "Mustermitarbeiter"} - ${formData.firstName} ${formData.lastName}`;
        const body = `Sehr geehrte Damen und Herren,\n\n${generatedContent}\n\nMit freundlichen Grüßen\n${formData.firstName} ${formData.lastName}\n\n${formData.phone}\n${formData.email}`;

        window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      } catch (error) {
        console.error("Error creating email:", error);
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="border-b bg-background px-4 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 flex-wrap sticky top-0 z-30 shadow-sm">
        <h1 className="text-xl font-semibold">{t("letter.generator")}</h1>
        <div className="flex gap-2 w-full sm:w-auto justify-center">
          <Button variant="outline" onClick={handleSave} disabled={loading}>
            {loading
              ? t("common.saving", "Speichern...")
              : t("resume.saveAsDraft", "Entwurf speichern")}
          </Button>
          <ExportOptions onExport={handleExport} documentType="letter" />
        </div>
      </div>

      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[calc(100vh-57px)]"
      >
        <ResizablePanel defaultSize={40} minSize={30}>
          <div className="h-full p-4 overflow-auto bg-background dark:bg-gray-900">
            <Accordion
              type="single"
              collapsible
              className="w-full mb-4"
              defaultValue="form"
            >
              <AccordionItem value="form">
                <AccordionTrigger className="text-lg font-medium">
                  {t("letter.form")}
                </AccordionTrigger>
                <AccordionContent>
                  <LetterForm
                    initialData={formData}
                    onChange={handleFormChange}
                    onGenerate={handleGenerate}
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="ai">
                <AccordionTrigger className="text-lg font-medium">
                  {t("letter.aiAssistant")}
                </AccordionTrigger>
                <AccordionContent>
                  <LetterAIAssistant
                    resumeData={formData}
                    jobPosting={formData.jobPosting || ""}
                    onGenerateContent={handleGenerate}
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="templates">
                <AccordionTrigger className="text-lg font-medium">
                  {t("letter.templates")}
                </AccordionTrigger>
                <AccordionContent>
                  <LetterTemplates
                    onSelectTemplate={(templateId) => {
                      // In a real implementation, this would load a template
                      alert(
                        `Vorlage ${templateId} ausgewählt. Diese Funktion wird bald verfügbar sein!`,
                      );
                    }}
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="tips">
                <AccordionTrigger className="text-lg font-medium">
                  {t("letter.culturalTips")}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <LetterKeywords
                      jobPosting={formData.jobPosting || ""}
                      onAddKeyword={(keyword) => {
                        const newContent = generatedContent
                          ? generatedContent + ` ${keyword}`
                          : keyword;
                        setGeneratedContent(newContent);
                      }}
                    />
                    <LetterCulturalTips
                      targetCountry="germany"
                      letterType="motivation"
                    />
                    <ApprenticeshipFocus industry="it" />
                  </div>
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
            <LetterPreview
              data={formData}
              generatedContent={generatedContent}
              onDataChange={handleFormChange}
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default LetterGenerator;
