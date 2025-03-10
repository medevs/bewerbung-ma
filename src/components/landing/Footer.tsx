import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/i18n/index.tsx";
import { FileText, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-100 dark:bg-gray-900/80 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">
                {t("common.appName")}
              </span>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              {t("landing.heroSubtitle")}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">
              {t("common.resources", "Resources")}
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  to="/jobs"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {t("jobs.search")}
                </Link>
              </li>
              <li>
                <Link
                  to="/ausbildung-finder"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {t("jobs.ausbildungFinder")}
                </Link>
              </li>
              <li>
                <Link
                  to="/visa-guide"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {t("visa.guide")}
                </Link>
              </li>
              <li>
                <Link
                  to="/german-culture"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {t("culture.guide")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">
              {t("common.tools", "Tools")}
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  to="/resume/new"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {t("resume.create")}
                </Link>
              </li>
              <li>
                <Link
                  to="/letter/new"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {t("letter.create")}
                </Link>
              </li>
              <li>
                <Link
                  to="/interview-preparation"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {t("interview.preparation")}
                </Link>
              </li>
              <li>
                <Link
                  to="/language-learning"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {t("language.learning")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">
              {t("common.contact", "Contact")}
            </h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <Mail className="h-4 w-4 mr-2" />
                <span>contact@ausbildung-assistant.de</span>
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <Phone className="h-4 w-4 mr-2" />
                <span>+49 123 456789</span>
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Berlin, Germany</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            &copy; {new Date().getFullYear()} {t("common.appName")}.{" "}
            {t("common.allRightsReserved", "All rights reserved.")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
