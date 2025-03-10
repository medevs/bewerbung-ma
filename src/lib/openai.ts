import OpenAI from "openai";

// Get API key from environment variables
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

// Create and export OpenAI instance
export const openai = new OpenAI({
  apiKey: apiKey || "dummy-key-for-development",
  dangerouslyAllowBrowser: true,
});

interface LetterData {
  jobPosting: string;
  resumeData: any;
}

/**
 * Generates a motivation letter based on job posting and resume data
 */
export async function generateMotivationLetter({
  jobPosting,
  resumeData,
}: LetterData): Promise<string> {
  try {
    // Check if API key is available
    if (!apiKey) {
      console.warn("OpenAI API key not found. Using simulated response.");
      return simulateMotivationLetter(jobPosting, resumeData);
    }

    // Extract relevant information from resume data for the prompt
    const relevantInfo = {
      name: resumeData?.firstName + " " + resumeData?.lastName,
      position: resumeData?.position || "",
      company: resumeData?.company || "",
      experience: (resumeData?.experience || [])
        .slice(0, 2)
        .map((exp: any) => ({
          title: exp.title,
          company: exp.company,
          highlights: exp.details?.slice(0, 2) || [],
        })),
      education: (resumeData?.education || []).slice(0, 2).map((edu: any) => ({
        degree: edu.degree,
        institution: edu.institution,
      })),
      skills: resumeData?.itSkills || [],
      languages: resumeData?.languages || [],
    };

    // Call OpenAI API to generate the letter
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an expert in writing professional motivation letters in German. Create a concise, compelling letter that highlights the candidate's relevant experience and skills for the position.",
        },
        {
          role: "user",
          content: `Write a professional motivation letter in German for this job posting:\n\n${jobPosting}\n\nCandidate info:\n${JSON.stringify(relevantInfo, null, 2)}\n\nWrite 3-4 concise paragraphs focusing on matching the candidate's experience with job requirements. Start after "Sehr geehrte Damen und Herren," and end before "Mit freundlichen Grüßen".`,
        },
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      max_tokens: 800,
    });

    return (
      completion.choices[0].message.content ||
      simulateMotivationLetter(jobPosting, resumeData)
    );
  } catch (error) {
    console.error("Error generating motivation letter:", error);
    return simulateMotivationLetter(jobPosting, resumeData);
  }
}

/**
 * Fallback function that simulates an AI-generated letter when the API is unavailable
 */
function simulateMotivationLetter(jobPosting: string, resumeData: any): string {
  const position = resumeData?.position || "[Position]";
  const company = resumeData?.company || "[Unternehmen]";

  let generatedText = `Hiermit bewerbe ich mich um die ausgeschriebene Stelle als ${position} in Ihrem Unternehmen ${company}.\n\n`;

  // Add job posting specific content if available
  if (jobPosting && jobPosting.length > 10) {
    generatedText += `Ihre Stellenausschreibung hat mein Interesse geweckt, da sie genau meinen beruflichen Zielen und Qualifikationen entspricht. `;
  }

  generatedText += `Während meiner bisherigen Ausbildung und beruflichen Laufbahn konnte ich bereits wertvolle Erfahrungen sammeln, die ich gerne in Ihr Unternehmen einbringen möchte. `;

  // Add more personalized content based on the position
  if (position && position !== "[Position]") {
    if (
      position.toLowerCase().includes("entwickl") ||
      position.toLowerCase().includes("program") ||
      position.toLowerCase().includes("software")
    ) {
      generatedText += `Besonders meine Kenntnisse in der Softwareentwicklung, Problemlösung und im teamorientierten Arbeiten entsprechen den Anforderungen, die Sie in Ihrer Stellenausschreibung genannt haben.`;
    } else if (
      position.toLowerCase().includes("pflege") ||
      position.toLowerCase().includes("gesundheit")
    ) {
      generatedText += `Besonders meine Empathie, Sorgfalt und Belastbarkeit sowie mein Interesse an der Arbeit mit Menschen entsprechen den Anforderungen, die Sie in Ihrer Stellenausschreibung genannt haben.`;
    } else if (
      position.toLowerCase().includes("verkauf") ||
      position.toLowerCase().includes("einzelhandel")
    ) {
      generatedText += `Besonders meine Kommunikationsstärke, Kundenorientierung und mein Verkaufstalent entsprechen den Anforderungen, die Sie in Ihrer Stellenausschreibung genannt haben.`;
    } else {
      generatedText += `Besonders meine Fachkenntnisse, Teamfähigkeit und Motivation entsprechen den Anforderungen, die Sie in Ihrer Stellenausschreibung genannt haben.`;
    }
  } else {
    generatedText += `Besonders meine Fachkenntnisse, Teamfähigkeit und Motivation entsprechen den Anforderungen, die Sie in Ihrer Stellenausschreibung genannt haben.`;
  }

  generatedText += `\n\nIch bin davon überzeugt, dass meine Fähigkeiten und mein Engagement eine Bereicherung für Ihr Team darstellen würden. `;

  // Add company specific content if available
  if (company && company !== "[Unternehmen]") {
    generatedText += `Besonders reizt mich an ${company} der gute Ruf als Arbeitgeber und die Möglichkeit, in einem innovativen Umfeld zu arbeiten.`;
  } else {
    generatedText += `Besonders reizt mich an der Stelle die Möglichkeit, meine Fähigkeiten weiterzuentwickeln und Teil eines erfolgreichen Teams zu werden.`;
  }

  generatedText += `\n\nIch freue mich auf die Möglichkeit, mich persönlich bei Ihnen vorzustellen und stehe für Rückfragen jederzeit zur Verfügung.`;

  return generatedText;
}
