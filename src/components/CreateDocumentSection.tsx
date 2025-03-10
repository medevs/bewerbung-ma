import React from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { FileText, Mail } from "lucide-react";
import { useLanguage } from "@/lib/i18n/index.tsx";

interface CreateDocumentSectionProps {
  onCreateResume?: () => void;
  onCreateLetter?: () => void;
}

const CreateDocumentSection = ({
  onCreateResume = () => {},
  onCreateLetter = () => {},
}: CreateDocumentSectionProps) => {
  const { t } = useLanguage();

  return (
    <section className="w-full max-w-[1200px] mx-auto p-4 sm:p-6 bg-background">
      <h2 className="text-2xl font-semibold mb-6">
        {t("dashboard.createNew")}
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-950 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-medium mb-2">
                  {t("dashboard.resume")}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {t(
                    "resume.createDescription",
                    "Create a professional resume with our easy-to-use builder.",
                  )}
                </p>
                <Button
                  onClick={onCreateResume}
                  className="w-full sm:w-auto"
                  size="lg"
                >
                  {t("resume.create", "Create Resume")}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-green-100 dark:bg-green-950 rounded-lg">
                <Mail className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-medium mb-2">
                  {t("dashboard.letter")}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {t(
                    "letter.createDescription",
                    "Generate a personalized cover letter for your job application.",
                  )}
                </p>
                <Button
                  onClick={onCreateLetter}
                  className="w-full sm:w-auto"
                  variant="secondary"
                  size="lg"
                >
                  {t("letter.create", "Create Letter")}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CreateDocumentSection;
