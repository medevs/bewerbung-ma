import React from "react";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import CTASection from "./CTASection";
import Navbar from "./Navbar";
import Footer from "./Footer";
import TestimonialSection from "./TestimonialSection";
import StatisticsSection from "./StatisticsSection";
import { useLanguage } from "@/lib/i18n/index.tsx";

const LandingPage = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-background dark:bg-gray-950">
      <Navbar />
      <HeroSection />
      <StatisticsSection />
      <FeaturesSection />
      <TestimonialSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default LandingPage;
