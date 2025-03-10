import React, { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";
import JobListingCard from "./JobListingCard";
import { sampleJobs } from "@/lib/sample-jobs";
import JobFilter from "./JobFilter";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  url: string;
  created_at: string;
  applied: boolean;
  tags?: string[];
  visaSponsorship?: boolean;
  requirements?: string[];
  benefits?: string[];
}

export default function JobSearch() {
  // Enhanced sample jobs with more details
  const enhancedSampleJobs = sampleJobs.map((job, index) => ({
    ...job,
    tags:
      index % 3 === 0
        ? ["Full-time", "IT", "Development"]
        : index % 3 === 1
          ? ["Part-time", "Marketing", "Remote"]
          : ["Contract", "Finance", "Entry-level"],
    visaSponsorship: index % 2 === 0, // Alternate visa sponsorship
    requirements:
      index % 3 === 0
        ? [
            "Bachelor's degree in Computer Science or related field",
            "2+ years of experience with React",
            "Strong JavaScript skills",
            "Experience with RESTful APIs",
          ]
        : index % 3 === 1
          ? [
              "Bachelor's degree in Marketing or related field",
              "Experience with social media campaigns",
              "Excellent communication skills",
              "Creativity and analytical thinking",
            ]
          : [
              "Bachelor's degree in Finance or Business",
              "Understanding of financial principles",
              "Attention to detail",
              "Proficiency in Excel and financial software",
            ],
    benefits:
      index % 2 === 0
        ? [
            "Competitive salary",
            "Flexible working hours",
            "Remote work options",
            "Professional development budget",
          ]
        : [
            "Health insurance",
            "Paid time off",
            "Company events",
            "Career advancement opportunities",
          ],
  }));

  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    location: "any",
    jobType: "any",
    jobField: "any",
    remoteOnly: false,
    visaSponsorship: false,
    experienceLevel: "any",
  });

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // If no jobs exist, add sample jobs
      if (!data || data.length === 0) {
        await addSampleJobs();
      } else {
        setJobs(data);
        setFilteredJobs(data);
      }
    } catch (error) {
      console.error("Error loading jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const addSampleJobs = async () => {
    try {
      const { error } = await supabase.from("jobs").insert(
        enhancedSampleJobs.map((job) => ({
          ...job,
          user_id: user?.id,
          created_at: new Date().toISOString(),
          applied: false,
        })),
      );
      if (error) throw error;
      loadJobs();
    } catch (error) {
      console.error("Error adding sample jobs:", error);
    }
  };

  const handleSearch = async (query: string, newFilters: any) => {
    setLoading(true);
    setSearchQuery(query);
    setFilters(newFilters);

    try {
      // Simulate network delay for better UX feedback
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Filter the jobs based on search query and filters
      const filtered = jobs.filter((job) => {
        // Filter by search query
        const matchesQuery =
          query === "" ||
          job.title.toLowerCase().includes(query.toLowerCase()) ||
          job.company.toLowerCase().includes(query.toLowerCase()) ||
          job.description.toLowerCase().includes(query.toLowerCase());

        // Filter by location
        const matchesLocation =
          newFilters.location === "any" ||
          job.location.toLowerCase().includes(newFilters.location);

        // Filter by job field (using tags as a proxy)
        const matchesJobField =
          newFilters.jobField === "any" ||
          (job.tags &&
            job.tags.some((tag) =>
              tag.toLowerCase().includes(newFilters.jobField.toLowerCase()),
            ));

        // Filter by job type (using tags as a proxy)
        const matchesJobType =
          newFilters.jobType === "any" ||
          (job.tags &&
            job.tags.some(
              (tag) => tag.toLowerCase() === newFilters.jobType.toLowerCase(),
            ));

        // Filter by visa sponsorship
        const matchesVisa = !newFilters.visaSponsorship || job.visaSponsorship;

        // Filter by remote (using tags as a proxy)
        const matchesRemote =
          !newFilters.remoteOnly ||
          (job.tags &&
            job.tags.some((tag) => tag.toLowerCase().includes("remote")));

        // Filter by experience level
        const matchesExperience =
          newFilters.experienceLevel === "any" ||
          (job.tags &&
            job.tags.some((tag) =>
              tag
                .toLowerCase()
                .includes(newFilters.experienceLevel.toLowerCase()),
            ));

        return (
          matchesQuery &&
          matchesLocation &&
          matchesJobField &&
          matchesJobType &&
          matchesVisa &&
          matchesRemote &&
          matchesExperience
        );
      });

      setFilteredJobs(filtered);
    } catch (error) {
      console.error("Error filtering jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateLetter = (job: Job) => {
    window.location.href = `/letter/new?jobTitle=${encodeURIComponent(job.title)}&company=${encodeURIComponent(job.company)}`;
  };

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Job Search</h1>

      <JobFilter onSearch={handleSearch} isLoading={loading} />

      <div className="space-y-6">
        <h2 className="text-xl font-semibold">
          {filteredJobs.length} Jobs Found
        </h2>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-2">Loading jobs...</span>
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <JobListingCard
                key={job.id}
                job={job}
                onGenerateLetter={handleGenerateLetter}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border rounded-md">
            <p className="text-muted-foreground">
              No jobs found matching your criteria. Try adjusting your search
              filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
