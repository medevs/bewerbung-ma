import React from "react";

interface ResumeData {
  certificates?: Array<{
    name: string;
    issuer: string;
    date: string;
    details?: string;
  }>;
  firstName?: string;
  lastName?: string;
  title?: string;
  email?: string;
  phone?: string;
  mobile?: string;
  address?: string;
  postalCode?: string;
  city?: string;
  birthDate?: string;
  birthPlace?: string;
  photo?: string;
  experience?: Array<{
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    details?: string[];
  }>;
  education?: Array<{
    degree: string;
    institution: string;
    startDate: string;
    endDate: string;
    details?: string;
  }>;
  languages?: Array<{
    language: string;
    level: string;
  }>;
  itSkills?: Array<{
    name: string;
    level: string;
  }>;
  interests?: Array<{
    activity: string;
    details?: string;
  }>;
}

export const ProfessionalTemplate = ({ data = {} }: { data: ResumeData }) => {
  return (
    <div
      className="flex flex-col lg:flex-row"
      style={{ backgroundColor: "#ffffff", color: "#333333" }}
      dir="ltr"
    >
      {/* Left Sidebar */}
      <div className="w-full lg:w-[300px] bg-[#003366] text-white p-4 sm:p-8">
        {data.photo && (
          <div className="mb-8">
            <img
              src={data.photo}
              alt="Profile"
              className="w-40 h-40 object-cover rounded-full mx-auto"
            />
          </div>
        )}
        <h1 className="text-2xl font-bold mb-2">
          {data.firstName || "Max"} {data.lastName || "Mustermann"}
        </h1>
        <p className="text-lg mb-6">{data.title || "Software-Entwickler"}</p>

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Persönliches Profil</h2>
            <div className="space-y-2 text-sm">
              <p>E-Mail</p>
              <p className="font-light">
                {data.email || "max.mustermann@example.com"}
              </p>
              <p>Telefon</p>
              <p className="font-light">{data.phone || "+49 123 4567890"}</p>
              <p>Anschrift</p>
              <p className="font-light">
                {data.address || "Musterstraße 123"}
                <br />
                {data.postalCode || "12345"} {data.city || "Berlin"}
              </p>
              {data.birthDate && data.birthPlace && (
                <>
                  <p>Geburtsdatum/-ort</p>
                  <p className="font-light">
                    {data.birthDate} in {data.birthPlace}
                  </p>
                </>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">IT-Skills</h2>
            <div className="space-y-1">
              {data.itSkills?.map((skill, index) => (
                <p key={index} className="font-light">
                  {skill.name}: {"★".repeat(Number(skill.level))}
                  {"☆".repeat(5 - Number(skill.level))}
                </p>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Sprachen</h2>
            <div className="space-y-1">
              {data.languages?.map((lang, index) => (
                <p key={index} className="font-light">
                  {lang.language}: {lang.level}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-8">
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-bold text-[#003366] mb-4">
              Berufserfahrung
            </h2>
            <div className="space-y-6">
              {data.experience?.map((exp, index) => (
                <div key={index}>
                  <div className="text-sm text-gray-600 print:text-gray-600">
                    {exp.startDate || "MM/JJJJ"} -{" "}
                    {exp.endDate === "present"
                      ? "heute"
                      : exp.endDate || "MM/JJJJ"}
                  </div>
                  <div className="font-semibold">{exp.title || "Position"}</div>
                  <div className="text-gray-600 print:text-gray-600 mb-2">
                    {exp.company || "Unternehmen"}
                  </div>
                  {exp.details && (
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {Array.isArray(exp.details) ? (
                        exp.details.map((detail, idx) => (
                          <li key={idx}>{detail}</li>
                        ))
                      ) : (
                        <li>{exp.details}</li>
                      )}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#003366] mb-4">
              Ausbildung
            </h2>
            <div className="space-y-4">
              {data.education?.map((edu, index) => (
                <div key={index}>
                  <div className="text-sm text-gray-600 print:text-gray-600">
                    {edu.startDate || "MM/JJJJ"} - {edu.endDate || "MM/JJJJ"}
                  </div>
                  <div className="font-semibold">
                    {edu.degree || "Abschluss"}
                  </div>
                  <div className="text-gray-600 print:text-gray-600">
                    {edu.institution || "Bildungseinrichtung"}
                  </div>
                  {edu.details && <p className="text-sm mt-1">{edu.details}</p>}
                </div>
              ))}
            </div>
          </div>

          {data.interests && (
            <div>
              <h2 className="text-xl font-bold text-[#003366] mb-4">
                Interessen
              </h2>
              <p className="text-sm">{data.interests}</p>
            </div>
          )}

          {data.certificates && (
            <div>
              <h2 className="text-xl font-bold text-[#003366] mb-4">
                Zertifikate
              </h2>
              <p className="text-sm">{data.certificates}</p>
            </div>
          )}
        </div>

        <div className="mt-12 text-right">
          <p className="mb-8">
            {data.city || "Berlin"}, {new Date().toLocaleDateString("de-DE")}
          </p>
          <div className="h-10 border-b border-dashed border-gray-400 w-48 ml-auto"></div>
          <p className="mt-2">
            {data.firstName || "Max"} {data.lastName || "Mustermann"}
          </p>
        </div>
      </div>
    </div>
  );
};
