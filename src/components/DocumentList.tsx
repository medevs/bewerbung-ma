import React, { useState } from "react";
import DocumentCard from "./DocumentCard";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Grid, List, SortAsc } from "lucide-react";
import { useLanguage } from "@/lib/i18n/index.tsx";

interface Document {
  id: string;
  title: string;
  type: "resume" | "letter";
  lastModified: string;
  previewUrl: string;
}

interface DocumentListProps {
  documents?: Document[];
  onEdit?: (id: string) => void;
  onExport?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const DocumentList = ({
  documents = [],
  onEdit = () => {},
  onExport = () => {},
  onDelete = () => {},
}: DocumentListProps) => {
  const { t } = useLanguage();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("modified");
  const [filterType, setFilterType] = useState("all");

  const filteredDocuments = documents
    .filter((doc) => {
      if (filterType === "all") return true;
      return doc.type === filterType;
    })
    .filter((doc) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === "modified") {
        return (
          new Date(b.lastModified).getTime() -
          new Date(a.lastModified).getTime()
        );
      }
      return a.title.localeCompare(b.title);
    });

  return (
    <div className="w-full max-w-[1200px] mx-auto p-4 sm:p-6 bg-background">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          {t("dashboard.recentDocuments")}
        </h2>
      </div>

      <div className="flex flex-col md:flex-row gap-3 mb-4 sm:mb-6 items-start md:items-center justify-between">
        <Input
          placeholder={t("dashboard.searchDocuments")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-[300px]"
        />

        <div className="flex flex-wrap gap-2 sm:gap-4 w-full md:w-auto justify-end">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[140px]">
              <SelectValue
                placeholder={t("dashboard.filterByType", "Filter by type")}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {t("dashboard.allDocuments", "All Documents")}
              </SelectItem>
              <SelectItem value="resume">
                {t("dashboard.resumes", "Resumes")}
              </SelectItem>
              <SelectItem value="letter">
                {t("dashboard.coverLetters", "Cover Letters")}
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder={t("dashboard.sortBy", "Sort by")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="modified">
                {t("dashboard.lastModified", "Last Modified")}
              </SelectItem>
              <SelectItem value="name">
                {t("dashboard.name", "Name")}
              </SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-1 border rounded-md p-1 bg-card">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className="h-8 w-8"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
              className="h-8 w-8"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div
        className={`
          ${
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
              : "flex flex-col gap-4"
          }
        `}
      >
        {filteredDocuments.map((doc) => (
          <DocumentCard
            key={doc.id}
            title={doc.title}
            type={doc.type}
            lastModified={doc.lastModified}
            previewUrl={doc.previewUrl}
            onEdit={() => onEdit(doc.id)}
            onExport={() => onExport(doc.id)}
            onDelete={() => onDelete(doc.id)}
          />
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <div className="text-center py-12 border rounded-md">
          <p className="text-muted-foreground mb-4">
            {searchQuery
              ? t("dashboard.noResults")
              : t("dashboard.noDocuments")}
          </p>
          {!searchQuery && (
            <p className="text-sm text-muted-foreground">
              {t("dashboard.startCreating")}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default DocumentList;
