import React from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  MoreVertical,
  FileText,
  Mail,
  Pencil,
  Trash2,
  Download,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useLanguage } from "@/lib/i18n/index.tsx";

interface DocumentCardProps {
  id?: string;
  title?: string;
  type?: "resume" | "letter";
  lastModified?: string;
  previewUrl?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onExport?: () => void;
  viewMode?: "grid" | "list";
}

const DocumentCard = ({
  id,
  title = "Untitled Document",
  type = "resume",
  lastModified = "Today",
  previewUrl = "",
  onEdit = () => {},
  onDelete = () => {},
  onExport = () => {},
  viewMode = "grid",
}: DocumentCardProps) => {
  const { t } = useLanguage();

  return (
    <Card className="overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <Badge variant="outline" className="capitalize">
              {type === "resume"
                ? t("dashboard.resume")
                : t("dashboard.letter")}
            </Badge>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onEdit}>
                <Pencil className="mr-2 h-4 w-4" /> {t("common.edit")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onExport}>
                <Download className="mr-2 h-4 w-4" /> {t("common.export")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDelete} className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" /> {t("common.delete")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="mt-4 aspect-[3/4] overflow-hidden rounded-md">
          <img
            src={
              previewUrl ||
              "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=300&h=400&fit=crop"
            }
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="mt-2 text-xs text-muted-foreground">
          {t("dashboard.lastModified", "Last modified")}: {lastModified}
        </div>
      </div>
    </Card>
  );
};

export default DocumentCard;
