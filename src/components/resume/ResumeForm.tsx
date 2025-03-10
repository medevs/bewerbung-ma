import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n/index.tsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Plus, Trash2 } from "lucide-react";

const resumeSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  title: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  city: z.string().min(1, "City is required"),
  birthDate: z.string().optional(),
  birthPlace: z.string().optional(),
  photo: z.string().optional(),
});

type ResumeFormData = z.infer<typeof resumeSchema>;

interface ResumeFormProps {
  initialData?: any;
  onChange?: (data: any) => void;
}

const ResumeForm = ({
  initialData = {},
  onChange = () => {},
}: ResumeFormProps) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState(initialData);

  const handleChange = (field: string, value: any) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onChange(newData);
  };

  const handleAddExperience = () => {
    const newExperience = [...(formData.experience || [])];
    newExperience.push({
      title: "",
      company: "",
      startDate: "",
      endDate: "",
      details: "",
    });
    handleChange("experience", newExperience);
  };

  const handleRemoveExperience = (index: number) => {
    const newExperience = [...(formData.experience || [])];
    newExperience.splice(index, 1);
    handleChange("experience", newExperience);
  };

  const handleAddEducation = () => {
    const newEducation = [...(formData.education || [])];
    newEducation.push({
      degree: "",
      institution: "",
      startDate: "",
      endDate: "",
      details: "",
    });
    handleChange("education", newEducation);
  };

  const handleRemoveEducation = (index: number) => {
    const newEducation = [...(formData.education || [])];
    newEducation.splice(index, 1);
    handleChange("education", newEducation);
  };

  const handleAddLanguage = () => {
    const newLanguages = [...(formData.languages || [])];
    newLanguages.push({
      language: "",
      level: "",
    });
    handleChange("languages", newLanguages);
  };

  const handleRemoveLanguage = (index: number) => {
    const newLanguages = [...(formData.languages || [])];
    newLanguages.splice(index, 1);
    handleChange("languages", newLanguages);
  };

  const handleAddSkill = () => {
    const newSkills = [...(formData.itSkills || [])];
    newSkills.push({
      name: "",
      level: "",
    });
    handleChange("itSkills", newSkills);
  };

  const handleRemoveSkill = (index: number) => {
    const newSkills = [...(formData.itSkills || [])];
    newSkills.splice(index, 1);
    handleChange("itSkills", newSkills);
  };

  const handleLoadSampleData = () => {
    const sampleData = {
      firstName: "Max",
      lastName: "Mustermann",
      title: "Software Developer",
      email: "max.mustermann@example.com",
      phone: "+49 123 4567890",
      address: "Musterstraße 123",
      postalCode: "12345",
      city: "Berlin",
      birthDate: "1990-01-01",
      birthPlace: "München",
      experience: [
        {
          title: "Senior Developer",
          company: "Tech GmbH",
          startDate: "2018-01",
          endDate: "present",
          details: "Led development team for enterprise applications",
        },
        {
          title: "Junior Developer",
          company: "Startup AG",
          startDate: "2015-03",
          endDate: "2017-12",
          details: "Developed frontend components using React",
        },
      ],
      education: [
        {
          degree: "Master of Computer Science",
          institution: "TU Berlin",
          startDate: "2013-10",
          endDate: "2015-09",
          details: "Focus on artificial intelligence",
        },
        {
          degree: "Bachelor of Computer Science",
          institution: "Universität Hamburg",
          startDate: "2010-10",
          endDate: "2013-09",
          details: "",
        },
      ],
      languages: [
        { language: "Deutsch", level: "Muttersprache" },
        { language: "Englisch", level: "Fließend (C1)" },
        { language: "Französisch", level: "Grundkenntnisse (A2)" },
      ],
      itSkills: [
        { name: "JavaScript", level: "5" },
        { name: "React", level: "5" },
        { name: "Node.js", level: "4" },
        { name: "Python", level: "3" },
      ],
    };
    setFormData(sampleData);
    onChange(sampleData);
  };

  const handleClearAll = () => {
    const emptyData = {};
    setFormData(emptyData);
    onChange(emptyData);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1">
          <TabsTrigger value="personal">{t("resume.personalInfo")}</TabsTrigger>
          <TabsTrigger value="experience">{t("resume.experience")}</TabsTrigger>
          <TabsTrigger value="education">{t("resume.education")}</TabsTrigger>
          <TabsTrigger value="skills">{t("resume.skills")}</TabsTrigger>
          <TabsTrigger value="other">{t("resume.interests")}</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4 mt-4">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-lg font-medium mb-4">
                {t("resume.personalInfo")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">{t("resume.firstName")}</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName || ""}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">{t("resume.lastName")}</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName || ""}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">{t("resume.title")}</Label>
                  <Input
                    id="title"
                    value={formData.title || ""}
                    onChange={(e) => handleChange("title", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t("resume.email")}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email || ""}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">{t("resume.phone")}</Label>
                  <Input
                    id="phone"
                    value={formData.phone || ""}
                    onChange={(e) => handleChange("phone", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">{t("resume.address")}</Label>
                  <Input
                    id="address"
                    value={formData.address || ""}
                    onChange={(e) => handleChange("address", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="postalCode">{t("resume.postalCode")}</Label>
                  <Input
                    id="postalCode"
                    value={formData.postalCode || ""}
                    onChange={(e) => handleChange("postalCode", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">{t("resume.city")}</Label>
                  <Input
                    id="city"
                    value={formData.city || ""}
                    onChange={(e) => handleChange("city", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthDate">{t("resume.birthDate")}</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={formData.birthDate || ""}
                    onChange={(e) => handleChange("birthDate", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthPlace">{t("resume.birthPlace")}</Label>
                  <Input
                    id="birthPlace"
                    value={formData.birthPlace || ""}
                    onChange={(e) => handleChange("birthPlace", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="photo">{t("resume.photo")}</Label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      id="photo"
                      value={formData.photo || ""}
                      onChange={(e) => handleChange("photo", e.target.value)}
                      placeholder="https://example.com/photo.jpg"
                      className="flex-1"
                    />
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            handleChange("photo", reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="flex-1"
                    />
                  </div>
                  {formData.photo && (
                    <div className="mt-2">
                      <img
                        src={formData.photo}
                        alt="Preview"
                        className="w-24 h-32 object-cover border rounded-md"
                      />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experience" className="space-y-4 mt-4">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-lg font-medium mb-4">
                {t("resume.experience")}
              </h2>
              <Button onClick={handleAddExperience} className="w-full">
                {t("resume.addExperience")}
              </Button>

              <div className="space-y-4 mt-4">
                {(formData.experience || []).map((exp: any, index: number) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <h3 className="text-md font-medium mb-2">
                        {t("resume.experience")} {index + 1}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>{t("resume.jobTitle")}</Label>
                          <Input
                            value={exp.title || ""}
                            onChange={(e) => {
                              const newExperience = [
                                ...(formData.experience || []),
                              ];
                              newExperience[index] = {
                                ...newExperience[index],
                                title: e.target.value,
                              };
                              handleChange("experience", newExperience);
                            }}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>{t("resume.company")}</Label>
                          <Input
                            value={exp.company || ""}
                            onChange={(e) => {
                              const newExperience = [
                                ...(formData.experience || []),
                              ];
                              newExperience[index] = {
                                ...newExperience[index],
                                company: e.target.value,
                              };
                              handleChange("experience", newExperience);
                            }}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>{t("resume.startDate")}</Label>
                          <Input
                            type="month"
                            value={exp.startDate || ""}
                            onChange={(e) => {
                              const newExperience = [
                                ...(formData.experience || []),
                              ];
                              newExperience[index] = {
                                ...newExperience[index],
                                startDate: e.target.value,
                              };
                              handleChange("experience", newExperience);
                            }}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>{t("resume.endDate")}</Label>
                          <Input
                            type="month"
                            value={exp.endDate || ""}
                            onChange={(e) => {
                              const newExperience = [
                                ...(formData.experience || []),
                              ];
                              newExperience[index] = {
                                ...newExperience[index],
                                endDate: e.target.value,
                              };
                              handleChange("experience", newExperience);
                            }}
                          />
                        </div>

                        <div className="space-y-2 sm:col-span-2">
                          <Label>{t("resume.description")}</Label>
                          <Textarea
                            value={exp.details || ""}
                            onChange={(e) => {
                              const newExperience = [
                                ...(formData.experience || []),
                              ];
                              newExperience[index] = {
                                ...newExperience[index],
                                details: e.target.value,
                              };
                              handleChange("experience", newExperience);
                            }}
                          />
                        </div>
                      </div>

                      <div className="mt-4 flex justify-end">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRemoveExperience(index)}
                        >
                          {t("common.remove")}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education" className="space-y-4 mt-4">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-lg font-medium mb-4">
                {t("resume.education")}
              </h2>
              <Button onClick={handleAddEducation} className="w-full">
                {t("resume.addEducation")}
              </Button>

              <div className="space-y-4 mt-4">
                {(formData.education || []).map((edu: any, index: number) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <h3 className="text-md font-medium mb-2">
                        {t("resume.education")} {index + 1}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>{t("resume.degree")}</Label>
                          <Input
                            value={edu.degree || ""}
                            onChange={(e) => {
                              const newEducation = [
                                ...(formData.education || []),
                              ];
                              newEducation[index] = {
                                ...newEducation[index],
                                degree: e.target.value,
                              };
                              handleChange("education", newEducation);
                            }}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>{t("resume.institution")}</Label>
                          <Input
                            value={edu.institution || ""}
                            onChange={(e) => {
                              const newEducation = [
                                ...(formData.education || []),
                              ];
                              newEducation[index] = {
                                ...newEducation[index],
                                institution: e.target.value,
                              };
                              handleChange("education", newEducation);
                            }}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>{t("resume.startDate")}</Label>
                          <Input
                            type="month"
                            value={edu.startDate || ""}
                            onChange={(e) => {
                              const newEducation = [
                                ...(formData.education || []),
                              ];
                              newEducation[index] = {
                                ...newEducation[index],
                                startDate: e.target.value,
                              };
                              handleChange("education", newEducation);
                            }}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>{t("resume.endDate")}</Label>
                          <Input
                            type="month"
                            value={edu.endDate || ""}
                            onChange={(e) => {
                              const newEducation = [
                                ...(formData.education || []),
                              ];
                              newEducation[index] = {
                                ...newEducation[index],
                                endDate: e.target.value,
                              };
                              handleChange("education", newEducation);
                            }}
                          />
                        </div>

                        <div className="space-y-2 sm:col-span-2">
                          <Label>{t("resume.description")}</Label>
                          <Textarea
                            value={edu.details || ""}
                            onChange={(e) => {
                              const newEducation = [
                                ...(formData.education || []),
                              ];
                              newEducation[index] = {
                                ...newEducation[index],
                                details: e.target.value,
                              };
                              handleChange("education", newEducation);
                            }}
                          />
                        </div>
                      </div>

                      <div className="mt-4 flex justify-end">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRemoveEducation(index)}
                        >
                          {t("common.remove")}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-4 mt-4">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-lg font-medium mb-4">{t("resume.skills")}</h2>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>{t("resume.skills")}</Label>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleAddSkill}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      {t("resume.addSkill")}
                    </Button>
                  </div>

                  {(formData.itSkills || []).map(
                    (skill: any, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          className="flex-1"
                          placeholder="Fähigkeit"
                          value={skill.name || ""}
                          onChange={(e) => {
                            const newSkills = [...(formData.itSkills || [])];
                            newSkills[index] = {
                              ...newSkills[index],
                              name: e.target.value,
                            };
                            handleChange("itSkills", newSkills);
                          }}
                        />
                        <Input
                          className="w-20"
                          placeholder="1-5"
                          type="number"
                          min="1"
                          max="5"
                          value={skill.level || ""}
                          onChange={(e) => {
                            const newSkills = [...(formData.itSkills || [])];
                            newSkills[index] = {
                              ...newSkills[index],
                              level: e.target.value,
                            };
                            handleChange("itSkills", newSkills);
                          }}
                        />
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleRemoveSkill(index)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    ),
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>{t("resume.languages")}</Label>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleAddLanguage}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      {t("resume.addLanguage")}
                    </Button>
                  </div>

                  {(formData.languages || []).map(
                    (language: any, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          className="flex-1"
                          placeholder="Sprache"
                          value={language.language || ""}
                          onChange={(e) => {
                            const newLanguages = [
                              ...(formData.languages || []),
                            ];
                            newLanguages[index] = {
                              ...newLanguages[index],
                              language: e.target.value,
                            };
                            handleChange("languages", newLanguages);
                          }}
                        />
                        <Input
                          className="flex-1"
                          placeholder="Niveau"
                          value={language.level || ""}
                          onChange={(e) => {
                            const newLanguages = [
                              ...(formData.languages || []),
                            ];
                            newLanguages[index] = {
                              ...newLanguages[index],
                              level: e.target.value,
                            };
                            handleChange("languages", newLanguages);
                          }}
                        />
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleRemoveLanguage(index)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="other" className="space-y-4 mt-4">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-lg font-medium mb-4">
                {t("resume.interests")}
              </h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>{t("resume.interests")}</Label>
                  <Textarea
                    placeholder="Beschreiben Sie Ihre Interessen und Hobbys"
                    value={formData.interests || ""}
                    onChange={(e) => handleChange("interests", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>{t("resume.certificates")}</Label>
                  <Textarea
                    placeholder="Listen Sie Ihre Zertifikate und Erfolge auf"
                    value={formData.certificates || ""}
                    onChange={(e) =>
                      handleChange("certificates", e.target.value)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between">
        <Button onClick={handleLoadSampleData} variant="outline">
          {t("resume.loadSampleData")}
        </Button>
        <Button onClick={handleClearAll} variant="outline">
          {t("resume.clearAll")}
        </Button>
      </div>
    </div>
  );
};

export default ResumeForm;
