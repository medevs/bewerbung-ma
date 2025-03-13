import React, { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/index.tsx";
import { useAuth } from "@/lib/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Badge } from "../ui/badge";
import {
  AlertCircle,
  CheckCircle,
  HelpCircle,
  Lightbulb,
  MessageSquare,
  Send,
  ThumbsUp,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { toast } from "../ui/use-toast";
import { Separator } from "../ui/separator";

// Mock data for feature requests since we're not using the database
const mockFeatureRequests = [
  {
    id: "1",
    title: "Multilingual CV Templates",
    description:
      "Add support for creating resumes in multiple languages with a single click translation feature.",
    status: "approved",
    created_at: "2023-10-15T10:30:00Z",
    voteCount: 42,
    hasVoted: false,
  },
  {
    id: "2",
    title: "AI Interview Coach",
    description:
      "Create an AI-powered interview coach that can simulate real interviews and provide feedback on answers.",
    status: "pending",
    created_at: "2023-11-05T14:20:00Z",
    voteCount: 38,
    hasVoted: false,
  },
  {
    id: "3",
    title: "Mobile App",
    description:
      "Develop a mobile app version of the platform for on-the-go resume and letter editing.",
    status: "pending",
    created_at: "2023-11-20T09:15:00Z",
    voteCount: 27,
    hasVoted: false,
  },
  {
    id: "4",
    title: "Document Translation",
    description:
      "Add automatic translation of resumes and cover letters to German for non-German speakers.",
    status: "completed",
    created_at: "2023-09-10T11:45:00Z",
    voteCount: 53,
    hasVoted: false,
  },
  {
    id: "5",
    title: "Employer Dashboard",
    description:
      "Create a dashboard for employers to post jobs and review applications directly on the platform.",
    status: "rejected",
    created_at: "2023-10-01T16:30:00Z",
    voteCount: 19,
    hasVoted: false,
  },
];

const SupportPage = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("contact");
  const [formData, setFormData] = useState({
    name: user?.user_metadata?.full_name || "",
    email: user?.email || "",
    subject: "",
    message: "",
    type: "question",
    priority: "medium",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [featureRequests, setFeatureRequests] = useState(mockFeatureRequests);
  const [isLoadingFeatures, setIsLoadingFeatures] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (activeTab === "feature-list") {
      // Simulate loading
      setIsLoadingFeatures(true);
      setTimeout(() => {
        setIsLoadingFeatures(false);
      }, 800);
    }
  }, [activeTab]);

  const handleVote = (featureId) => {
    if (!user) {
      toast({
        title: t("support.loginRequired", "Login Required"),
        description: t(
          "support.loginToVote",
          "Please login to vote for features",
        ),
        variant: "destructive",
      });
      return;
    }

    // Update local state only (no database)
    setFeatureRequests((prev) =>
      prev.map((feature) => {
        if (feature.id === featureId) {
          const newHasVoted = !feature.hasVoted;
          return {
            ...feature,
            voteCount: newHasVoted
              ? feature.voteCount + 1
              : feature.voteCount - 1,
            hasVoted: newHasVoted,
          };
        }
        return feature;
      }),
    );

    toast({
      title: t("support.voteRegistered", "Vote Registered"),
      description: t(
        "support.thankYouForVoting",
        "Thank you for your feedback!",
      ),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form
      if (
        !formData.name ||
        !formData.email ||
        !formData.subject ||
        !formData.message
      ) {
        toast({
          title: t("support.validationError", "Validation Error"),
          description: t(
            "support.fillAllFields",
            "Please fill all required fields",
          ),
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (activeTab === "feature") {
        // Add new feature request to the mock data
        const newFeature = {
          id: String(featureRequests.length + 1),
          title: formData.subject,
          description: formData.message,
          status: "pending",
          created_at: new Date().toISOString(),
          voteCount: 1, // Auto-vote for your own feature
          hasVoted: true,
        };

        setFeatureRequests((prev) => [newFeature, ...prev]);

        // Show success message
        setSubmitted(true);
        toast({
          title: t("support.featureSubmitted", "Feature Submitted"),
          description: t(
            "support.featureSubmittedDesc",
            "We've received your feature suggestion and will review it.",
          ),
        });

        // Switch to feature list tab after submission
        setTimeout(() => {
          setActiveTab("feature-list");
        }, 2000);
      } else {
        // Show success message for support ticket
        setSubmitted(true);
        toast({
          title: t("support.ticketSubmitted", "Ticket Submitted"),
          description: t(
            "support.ticketSubmittedDesc",
            "We've received your request and will respond shortly",
          ),
        });
      }

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: user?.user_metadata?.full_name || "",
          email: user?.email || "",
          subject: "",
          message: "",
          type: "question",
          priority: "medium",
        });
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting:", error);
      toast({
        title: t("support.error", "Error"),
        description: t(
          "support.errorSubmitting",
          "There was an error submitting your request. Please try again.",
        ),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqItems = [
    {
      question: t(
        "support.faq.resumeQuestion",
        "How do I create a German-style resume?",
      ),
      answer: t(
        "support.faq.resumeAnswer",
        "To create a German-style resume, use our Resume Builder and select the 'German' template. Make sure to include a professional photo, your date and place of birth, and organize your experience in reverse chronological order. Our templates are specifically designed to meet German standards.",
      ),
    },
    {
      question: t(
        "support.faq.letterQuestion",
        "What should I include in my cover letter for an Ausbildung?",
      ),
      answer: t(
        "support.faq.letterAnswer",
        "For an Ausbildung application, your cover letter should include: why you're interested in this specific profession, why you chose this company, your relevant skills and experiences, your German language level, and your visa situation if applicable. Our AI assistant can help you generate a tailored letter.",
      ),
    },
    {
      question: t(
        "support.faq.visaQuestion",
        "Do I need a visa for an Ausbildung in Germany?",
      ),
      answer: t(
        "support.faq.visaAnswer",
        "Yes, if you're from outside the EU, you'll need an Ausbildung visa (educational visa). You'll need an acceptance letter from a German company, proof of sufficient funds, health insurance, and adequate German language skills (usually at least B1 level). Check our Visa Guide section for detailed information.",
      ),
    },
    {
      question: t(
        "support.faq.languageQuestion",
        "What German language level do I need for an Ausbildung?",
      ),
      answer: t(
        "support.faq.languageAnswer",
        "Most Ausbildung positions require at least B1 level German, as you'll need to understand instructions and communicate with colleagues. Some technical fields might require B2. Our Language Learning section provides resources to help you improve your German skills.",
      ),
    },
    {
      question: t(
        "support.faq.exportQuestion",
        "How can I export my resume or cover letter?",
      ),
      answer: t(
        "support.faq.exportAnswer",
        "You can export your documents in multiple formats. In the Resume or Letter Builder, click the 'Export' button in the top right corner. You can choose PDF (recommended for applications), Word (.docx), or plain text formats.",
      ),
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">
        {t("support.title", "Support Center")}
      </h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="contact" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            {t("support.contactUs", "Contact Us")}
          </TabsTrigger>
          <TabsTrigger value="faq" className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            {t("support.faq.title", "FAQ")}
          </TabsTrigger>
          <TabsTrigger value="feature" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            {t("support.featureRequest", "Suggest Feature")}
          </TabsTrigger>
          <TabsTrigger value="feature-list" className="flex items-center gap-2">
            <ThumbsUp className="h-4 w-4" />
            {t("support.featureList", "Feature Requests")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="contact" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("support.getInTouch", "Get in Touch")}</CardTitle>
              <CardDescription>
                {t(
                  "support.getInTouchDesc",
                  "Have a question or need help? Fill out the form below and we'll get back to you as soon as possible.",
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    {t("support.thankYou", "Thank You!")}
                  </h3>
                  <p className="text-center text-muted-foreground">
                    {t(
                      "support.ticketSubmittedDesc",
                      "We've received your request and will respond shortly",
                    )}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t("support.name", "Name")}</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t(
                          "support.namePlaceholder",
                          "Your full name",
                        )}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        {t("support.email", "Email")}
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t(
                          "support.emailPlaceholder",
                          "Your email address",
                        )}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="type">
                        {t("support.type", "Request Type")}
                      </Label>
                      <Select
                        name="type"
                        value={formData.type}
                        onValueChange={(value) =>
                          handleSelectChange("type", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t(
                              "support.selectType",
                              "Select request type",
                            )}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="question">
                            {t("support.question", "Question")}
                          </SelectItem>
                          <SelectItem value="issue">
                            {t("support.issue", "Technical Issue")}
                          </SelectItem>
                          <SelectItem value="feedback">
                            {t("support.feedback", "Feedback")}
                          </SelectItem>
                          <SelectItem value="other">
                            {t("support.other", "Other")}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priority">
                        {t("support.priority", "Priority")}
                      </Label>
                      <Select
                        name="priority"
                        value={formData.priority}
                        onValueChange={(value) =>
                          handleSelectChange("priority", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t(
                              "support.selectPriority",
                              "Select priority",
                            )}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">
                            {t("support.low", "Low")}
                          </SelectItem>
                          <SelectItem value="medium">
                            {t("support.medium", "Medium")}
                          </SelectItem>
                          <SelectItem value="high">
                            {t("support.high", "High")}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">
                      {t("support.subject", "Subject")}
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder={t(
                        "support.subjectPlaceholder",
                        "Brief description of your request",
                      )}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">
                      {t("support.message", "Message")}
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t(
                        "support.messagePlaceholder",
                        "Please provide details about your request",
                      )}
                      rows={6}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        {t("support.submitting", "Submitting...")}
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        {t("support.submit", "Submit Request")}
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faq" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {t("support.faq.title", "Frequently Asked Questions")}
              </CardTitle>
              <CardDescription>
                {t(
                  "support.faq.description",
                  "Find answers to common questions about our platform and services.",
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="mt-8 p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2 flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2 text-primary" />
                  {t(
                    "support.cantFindAnswer",
                    "Can't find an answer to your question?",
                  )}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {t(
                    "support.contactUsForMore",
                    "Contact our support team for personalized assistance.",
                  )}
                </p>
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("contact")}
                >
                  {t("support.contactSupport", "Contact Support")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feature" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {t("support.suggestFeature", "Suggest a Feature")}
              </CardTitle>
              <CardDescription>
                {t(
                  "support.suggestFeatureDesc",
                  "Have an idea for a new feature or improvement? We'd love to hear it!",
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    {t("support.thankYou", "Thank You!")}
                  </h3>
                  <p className="text-center text-muted-foreground">
                    {t(
                      "support.featureSubmittedDesc",
                      "We've received your feature suggestion and will review it.",
                    )}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t("support.name", "Name")}</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t(
                          "support.namePlaceholder",
                          "Your full name",
                        )}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        {t("support.email", "Email")}
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t(
                          "support.emailPlaceholder",
                          "Your email address",
                        )}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">
                      {t("support.featureTitle", "Feature Title")}
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder={t(
                        "support.featureTitlePlaceholder",
                        "Brief title for your feature idea",
                      )}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">
                      {t("support.featureDescription", "Feature Description")}
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t(
                        "support.featureDescriptionPlaceholder",
                        "Please describe your feature idea in detail. What problem would it solve? Who would benefit from it?",
                      )}
                      rows={6}
                      required
                    />
                  </div>

                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>{t("support.note", "Note")}</AlertTitle>
                    <AlertDescription>
                      {t(
                        "support.featureRequestNote",
                        "We review all feature requests but cannot guarantee implementation. Popular requests are prioritized.",
                      )}
                    </AlertDescription>
                  </Alert>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        {t("support.submitting", "Submitting...")}
                      </>
                    ) : (
                      <>
                        <Lightbulb className="h-4 w-4 mr-2" />
                        {t("support.submitFeature", "Submit Feature Request")}
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feature-list" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {t("support.featureList", "Feature Requests")}
              </CardTitle>
              <CardDescription>
                {t(
                  "support.featureListDesc",
                  "Vote for features you'd like to see implemented. The most popular requests will be prioritized.",
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingFeatures ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin mr-2">⏳</div>
                  <span>{t("common.loading", "Loading...")}</span>
                </div>
              ) : featureRequests.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    {t(
                      "support.noFeatureRequests",
                      "No feature requests yet. Be the first to suggest one!",
                    )}
                  </p>
                  <Button onClick={() => setActiveTab("feature")}>
                    <Lightbulb className="h-4 w-4 mr-2" />
                    {t("support.suggestFeature", "Suggest a Feature")}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {featureRequests.map((feature) => (
                    <Card key={feature.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex">
                          <div className="p-4 flex flex-col items-center justify-center bg-muted w-24 text-center">
                            <div className="text-2xl font-bold">
                              {feature.voteCount}
                            </div>
                            <div className="text-xs text-muted-foreground mb-2">
                              {t("support.votes", "votes")}
                            </div>
                            <Button
                              variant={feature.hasVoted ? "default" : "outline"}
                              size="sm"
                              onClick={() => handleVote(feature.id)}
                              className="w-full"
                            >
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              {feature.hasVoted
                                ? t("support.voted", "Voted")
                                : t("support.upvote", "Upvote")}
                            </Button>
                          </div>
                          <div className="p-4 flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-semibold text-lg">
                                {feature.title}
                              </h3>
                              <Badge
                                variant="outline"
                                className={
                                  feature.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : feature.status === "approved"
                                      ? "bg-green-100 text-green-800"
                                      : feature.status === "rejected"
                                        ? "bg-red-100 text-red-800"
                                        : feature.status === "completed"
                                          ? "bg-blue-100 text-blue-800"
                                          : "bg-gray-100"
                                }
                              >
                                {feature.status === "pending" && (
                                  <>
                                    <Clock className="h-3 w-3 mr-1" />
                                    {t("support.statusPending", "Pending")}
                                  </>
                                )}
                                {feature.status === "approved" && (
                                  <>
                                    <CheckCircle2 className="h-3 w-3 mr-1" />
                                    {t("support.statusApproved", "Approved")}
                                  </>
                                )}
                                {feature.status === "rejected" && (
                                  <>
                                    <XCircle className="h-3 w-3 mr-1" />
                                    {t("support.statusRejected", "Rejected")}
                                  </>
                                )}
                                {feature.status === "completed" && (
                                  <>
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    {t("support.statusCompleted", "Completed")}
                                  </>
                                )}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {new Date(
                                feature.created_at,
                              ).toLocaleDateString()}
                            </p>
                            <p className="text-sm">{feature.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between border-t p-4">
              <div className="text-sm text-muted-foreground">
                {t("support.haveIdea", "Have an idea for a new feature?")}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveTab("feature")}
              >
                <Lightbulb className="h-4 w-4 mr-2" />
                {t("support.suggestFeature", "Suggest a Feature")}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupportPage;
