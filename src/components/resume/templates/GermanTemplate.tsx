import React from "react";

interface ResumeData {
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
  certificates?: Array<{
    name: string;
    issuer: string;
    date: string;
    details?: string;
  }>;
}

export const GermanTemplate = ({ data }: { data: ResumeData }) => {
  return (
    <div
      className="p-4 sm:p-8"
      style={{ backgroundColor: "#ffffff", color: "#333333" }}
      dir="ltr"
    >
      <div className="flex flex-col lg:flex-row justify-between gap-6">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-8">Lebenslauf</h1>

          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold mb-4">Berufserfahrung</h2>
              {data.experience?.map((exp, index) => (
                <div key={index} className="mb-4">
                  <div className="flex">
                    <div className="w-32 text-orange-500 font-medium">
                      {exp.startDate} - {exp.endDate}
                    </div>
                    <div>
                      <div className="font-bold">{exp.company}</div>
                      <div className="text-gray-700 print:text-gray-700">
                        {exp.title}
                      </div>
                      {exp.details && (
                        <ul className="list-disc list-inside mt-2 text-gray-600 print:text-gray-600">
                          {exp.details.map((detail, idx) => (
                            <li key={idx}>{detail}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Ausbildung</h2>
              {data.education?.map((edu, index) => (
                <div key={index} className="mb-4">
                  <div className="flex">
                    <div className="w-32 text-orange-500 font-medium">
                      {edu.startDate} - {edu.endDate}
                    </div>
                    <div>
                      <div className="font-bold">{edu.institution}</div>
                      <div className="text-gray-700 print:text-gray-700">
                        {edu.degree}
                      </div>
                      {edu.details && (
                        <div className="text-gray-600 print:text-gray-600 mt-1">
                          {edu.details}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">
                Kenntnisse und Interessen
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-orange-500">Fremdsprachen</h3>
                  {data.languages?.map((lang, index) => (
                    <div key={index}>
                      {lang.language} ({lang.level})
                    </div>
                  ))}
                </div>

                <div>
                  <h3 className="font-bold text-orange-500">IT-Kenntnisse</h3>
                  <div className="space-y-1">
                    {data.itSkills?.map((skill, index) => (
                      <div key={index}>
                        {skill.name}: {"★".repeat(Number(skill.level))}
                        {"☆".repeat(5 - Number(skill.level))}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-orange-500">Zertifikate</h3>
                  {data.certificates?.map((cert, index) => (
                    <div key={index} className="mb-2">
                      <div className="font-medium">{cert.name}</div>
                      <div className="text-gray-600">
                        {cert.issuer} - {cert.date}
                      </div>
                      {cert.details && (
                        <div className="text-gray-500">{cert.details}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/3 lg:pl-8">
          {data.photo && (
            <img
              src={data.photo}
              alt="Profile"
              className="w-full h-auto mb-6 rounded"
            />
          )}
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold">
                {data.firstName} {data.lastName}
              </h2>
              {data.title && <div className="text-gray-600">{data.title}</div>}
            </div>
            <div className="space-y-1 text-gray-600">
              <div>{data.address}</div>
              <div>
                {data.postalCode} {data.city}
              </div>
              <div>{data.phone}</div>
              <div>{data.email}</div>
              {data.birthDate && data.birthPlace && (
                <div>
                  Geboren am {data.birthDate} in {data.birthPlace}
                </div>
              )}
            </div>
          </div>
        </div>
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
  );
};
