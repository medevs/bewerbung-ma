import React, { useState, useEffect } from "react";
import DashboardHeader from "./DashboardHeader";
import CreateDocumentSection from "./CreateDocumentSection";
import DocumentList from "./DocumentList";
import { Sidebar } from "./ui/sidebar";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import DashboardOverview from "./home/DashboardOverview";
import { useLanguage } from "@/lib/i18n/index.tsx";

const Home = () => {
  const { user, signOut } = useAuth();
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const onCreateResume = () => {
    console.log("Creating new resume");
    window.location.href = "/resume/new";
  };

  const onCreateLetter = () => {
    console.log("Creating new letter");
    window.location.href = "/letter/new";
  };

  useEffect(() => {
    loadDocuments();
  }, [user?.id]);

  const loadDocuments = async () => {
    if (!user?.id) return;

    try {
      const [resumes, letters] = await Promise.all([
        supabase
          .from("resumes")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false }),
        supabase
          .from("letters")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false }),
      ]);

      const allDocs = [
        ...(resumes.data || []).map((resume: any) => ({
          id: resume.id,
          title: resume.title,
          type: "resume",
          lastModified: new Date(
            resume.updated_at || resume.created_at,
          ).toLocaleDateString(),
          previewUrl:
            resume.content?.photo ||
            "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=300&h=400&fit=crop",
        })),
        ...(letters.data || []).map((letter: any) => ({
          id: letter.id,
          title: letter.title,
          type: "letter",
          lastModified: new Date(
            letter.updated_at || letter.created_at,
          ).toLocaleDateString(),
          previewUrl:
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=400&fit=crop",
        })),
      ];

      setDocuments(allDocs);
      setLoading(false);
    } catch (error) {
      console.error("Error loading documents:", error);
      setLoading(false);
    }
  };

  const handleEditDocument = (id: string) => {
    const doc = documents.find((d) => d.id === id);
    if (doc) {
      window.location.href = `/${doc.type}/${id}`;
    }
  };

  const handleDeleteDocument = async (id: string) => {
    const doc = documents.find((d) => d.id === id);
    if (!doc) return;

    try {
      const { error } = await supabase
        .from(doc.type === "resume" ? "resumes" : "letters")
        .delete()
        .eq("id", id);

      if (error) throw error;
      loadDocuments();
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const handleExportDocument = async (id: string) => {
    const doc = documents.find((d) => d.id === id);
    if (!doc) return;
    window.location.href = `/${doc.type}/${id}?export=true`;
  };

  const userName =
    user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";
  const userEmail = user?.email || "";
  const userAvatarUrl =
    user?.user_metadata?.avatar_url ||
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`;

  return (
    <div className="flex-1 overflow-x-hidden">
      <DashboardOverview />
      <div className="p-8">
        <CreateDocumentSection
          onCreateResume={onCreateResume}
          onCreateLetter={onCreateLetter}
        />
        <div className="mt-8">
          <DocumentList
            documents={documents}
            onEdit={handleEditDocument}
            onExport={handleExportDocument}
            onDelete={handleDeleteDocument}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
