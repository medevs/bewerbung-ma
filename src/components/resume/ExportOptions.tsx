import React from "react";
import { useLanguage } from "@/lib/i18n/index.tsx";
import { Button } from "../ui/button";
import { Download, FileText } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface ExportOptionsProps {
  onExport: (format: string) => void;
  documentType?: "resume" | "letter";
}

const ExportOptions = ({
  onExport,
  documentType = "resume",
}: ExportOptionsProps) => {
  const { t } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default">
          <Download className="w-4 h-4 mr-2" />
          {t("common.export")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>{t("resume.exportOptions")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onExport("pdf")}>
          <FileText className="mr-2 h-4 w-4" />
          <span>PDF</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onExport("docx")}>
          <FileText className="mr-2 h-4 w-4" />
          <span>Word (.docx)</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onExport("txt")}>
          <FileText className="mr-2 h-4 w-4" />
          <span>Plain Text (.txt)</span>
        </DropdownMenuItem>
        {documentType === "letter" && (
          <DropdownMenuItem onClick={() => onExport("email")}>
            <FileText className="mr-2 h-4 w-4" />
            <span>Email Format</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportOptions;
