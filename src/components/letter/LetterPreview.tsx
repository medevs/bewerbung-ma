import React from "react";
import { format } from "date-fns";

interface LetterPreviewProps {
  data?: any;
  generatedContent?: string;
  onDataChange?: (newData: any) => void;
}

const LetterPreview = ({
  data = {},
  generatedContent = "",
  onDataChange = () => {},
}: LetterPreviewProps) => {
  return (
    <div
      className="letter-preview flex-1 bg-white shadow-lg min-h-[1000px] p-6 sm:p-12 text-[#333] print:shadow-none print:bg-white rounded-lg transition-all hover:shadow-xl overflow-auto"
      style={{ backgroundColor: "#ffffff", color: "#333333" }}
    >
      <div className="space-y-6" dir="ltr">
        <div className="flex flex-col sm:flex-row justify-between text-sm mb-8 sm:mb-16 gap-6">
          <div className="text-gray-600 dark:text-gray-400 print:text-gray-600">
            {data.firstName || "Max"} {data.lastName || "Mustermann"}
            <br />
            {data.address || "Musterstraße 38"}
            <br />
            {data.postalCode || "12345"} {data.city || "Musterstadt"}
            <br />
            {data.phone || "01234/56789"}
            <br />
            {data.email || "max@mustermann.de"}
          </div>
          <div className="text-gray-600 dark:text-gray-400 print:text-gray-600">
            {data.company || "[Company Name]"}
            <br />
            {data.department || "IT-Abteilung"}
            <br />
            {data.hiringManager || "Hr. Schmidt"}
            <br />
            {data.companyAddress || "Firmenstraße 1"}
            <br />
            {data.companyCity || "Berlin"}
          </div>
        </div>

        <div className="space-y-8">
          <div className="text-right mb-8">
            {data.city || "Musterstadt"}, {format(new Date(), "dd.MM.yyyy")}
          </div>

          <div className="mb-8">
            <div className="mb-4">
              Bewerbung auf Ihr Stellenangebot als{" "}
              {data.position || "Mustermitarbeiter"}
            </div>
          </div>

          <div className="mb-8">Sehr geehrte Damen und Herren,</div>

          <div className="text-justify leading-relaxed mb-12">
            {generatedContent ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: generatedContent.replace(/\n/g, "<br>"),
                }}
              />
            ) : (
              <div className="text-gray-400 italic">
                Ihr generierter Motivationsbrief erscheint hier. Klicken Sie auf
                "Brief generieren", um einen personalisierten Brief basierend
                auf Ihren Eingaben zu erstellen. Der Brief wird automatisch im
                deutschen Format mit korrekter Anrede und Grußformel erstellt.
              </div>
            )}
          </div>

          <div className="mb-12">Mit freundlichen Grüßen</div>

          <div>
            {data.firstName || "Max"} {data.lastName || "Mustermann"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetterPreview;
