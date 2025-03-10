import React from "react";
import { useLanguage } from "@/lib/i18n/index.tsx";
import { ProfessionalTemplate } from "./templates/ProfessionalTemplate";
import { GermanTemplate } from "./templates/GermanTemplate";

interface ResumePreviewProps {
  data?: any;
  template?: string;
}

const ResumePreview = ({
  data = {},
  template = "modern",
}: ResumePreviewProps) => {
  const { t } = useLanguage();
  const commonClasses =
    "resume-preview w-full max-w-[800px] mx-auto bg-white shadow-lg min-h-[1000px] print:shadow-none print:bg-white rounded-lg transition-all hover:shadow-xl";

  if (template === "german") {
    return (
      <div className={commonClasses}>
        <GermanTemplate data={data} />
      </div>
    );
  } else if (template === "professional") {
    return (
      <div className={commonClasses}>
        <ProfessionalTemplate data={data} />
      </div>
    );
  }
  return (
    <div
      className="resume-preview w-full max-w-[800px] mx-auto bg-white shadow-lg p-4 sm:p-8 min-h-[1000px] print:shadow-none print:bg-white rounded-lg transition-all hover:shadow-xl overflow-auto"
      style={{ backgroundColor: "#ffffff", color: "#333333" }}
    >
      <div className="space-y-8" dir="ltr">
        <div className="flex justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-orange-500 mb-6">
              Lebenslauf
            </h1>

            <div className="space-y-4">
              <div>
                <h2 className="font-bold mb-2">Persönliche Daten</h2>
                <table className="w-full">
                  <tbody>
                    <tr>
                      <td className="py-1 pr-4">Name</td>
                      <td>
                        {data.lastName
                          ? `${data.firstName} ${data.lastName}`
                          : "Max Mustermann"}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-4">Adresse</td>
                      <td>
                        {data.address || "Hauptstraße 11"}
                        <br />
                        {data.postalCode || "10411"} {data.city || "Berlin"}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-4">Telefon</td>
                      <td>
                        Telefon: {data.phone || "01234/111111"}
                        <br />
                        {data.mobile ? `Mobil: ${data.mobile}` : ""}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-4">E-Mail</td>
                      <td>{data.email || "vorname@nachname.de"}</td>
                    </tr>
                    <tr>
                      <td className="py-1 pr-4">Geburtsdatum</td>
                      <td>
                        {data.birthDate || "05.01.1982"} in{" "}
                        {data.birthPlace || "Hamburg"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <h2 className="text-lg font-semibold border-b pb-1 mb-2">
                  Berufserfahrung
                </h2>
                {(data.experience || []).map((exp: any, index: number) => (
                  <div key={index} className="flex py-1">
                    <div className="w-32 pr-4 text-sm">
                      {exp.startDate} - {exp.endDate}
                    </div>
                    <div>
                      <div className="font-semibold">{exp.company}</div>
                      <div>{exp.title}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h2 className="text-lg font-semibold border-b pb-1 mb-2">
                  Ausbildung
                </h2>
                {(data.education || []).map((edu: any, index: number) => (
                  <div key={index} className="flex py-1">
                    <div className="w-32 pr-4 text-sm">
                      {edu.startDate} - {edu.endDate}
                    </div>
                    <div>
                      <div>{edu.degree}</div>
                      <div className="text-gray-600">{edu.institution}</div>
                      {edu.details && (
                        <div className="text-sm">{edu.details}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h2 className="text-lg font-semibold border-b pb-1 mb-2">
                  Kenntnisse
                </h2>
                <div className="space-y-2">
                  <div>
                    <h3 className="font-medium">IT-Kenntnisse</h3>
                    <div className="space-y-1">
                      {(data.itSkills || []).map(
                        (skill: any, index: number) => (
                          <div key={index}>
                            {skill.name}: {"★".repeat(Number(skill.level))}
                            {"☆".repeat(5 - Number(skill.level))}
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mt-2">Sprachen</h3>
                    <div className="space-y-1">
                      {(data.languages || []).map(
                        (language: any, index: number) => (
                          <div key={index}>
                            {language.language}: {language.level}
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {data.interests && (
                <div>
                  <h2 className="text-lg font-semibold border-b pb-1 mb-2">
                    Interessen
                  </h2>
                  <p>{data.interests}</p>
                </div>
              )}

              {data.certificates && (
                <div>
                  <h2 className="text-lg font-semibold border-b pb-1 mb-2">
                    Zertifikate
                  </h2>
                  <p>{data.certificates}</p>
                </div>
              )}
            </div>
          </div>

          {data.photo && (
            <div className="ml-8">
              <img
                src={data.photo}
                alt="Profile"
                className="w-32 h-40 object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
