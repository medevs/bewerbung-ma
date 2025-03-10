import { Suspense, lazy } from "react";
import { ThemeProvider } from "./components/theme-provider";
import ProfilePage from "./components/pages/ProfilePage";
import SettingsPage from "./components/pages/SettingsPage";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import JobSearch from "./components/jobs/JobSearch";
import Home from "./components/home";
import LandingPage from "./components/landing/LandingPage";
import { DashboardLayout } from "./components/layouts/DashboardLayout";
import { AuthProvider, useAuth } from "./lib/auth";
import { LanguageProvider } from "./lib/i18n/index.tsx";
import { SignInForm } from "./components/auth/SignInForm";
import { SignUpForm } from "./components/auth/SignUpForm";
import ResumeValidator from "./components/resume/ResumeValidator";
import InterviewPreparation from "./components/interview/InterviewPreparation";
import AusbildungFinder from "./components/jobs/AusbildungFinder";
import JobApplicationTracker from "./components/jobs/JobApplicationTracker";
import VisaGuide from "./components/visa/VisaGuide";
import GermanCultureGuide from "./components/integration/GermanCultureGuide";
import LanguageLearningTools from "./components/language/LanguageLearningTools";
import routes from "tempo-routes";

const ResumeBuilder = lazy(() => import("./components/resume/ResumeBuilder"));
const LetterGenerator = lazy(
  () => import("./components/letter/LetterGenerator"),
);

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/sign-in" />;
  }

  return children;
}

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <ThemeProvider defaultTheme="system" storageKey="ui-theme">
          <AppContent />
        </ThemeProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

function AppContent() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          Loading...
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Home />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/resume/new"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center h-screen">
                      Loading Resume Builder...
                    </div>
                  }
                >
                  <ResumeBuilder key="new-resume" />
                </Suspense>
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/resume/:id"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center h-screen">
                      Loading Resume Builder...
                    </div>
                  }
                >
                  <ResumeBuilder key="edit-resume" />
                </Suspense>
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/letter/new"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center h-screen">
                      Loading Letter Generator...
                    </div>
                  }
                >
                  <LetterGenerator key="new-letter" />
                </Suspense>
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/letter/:id"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center h-screen">
                      Loading Letter Generator...
                    </div>
                  }
                >
                  <LetterGenerator key="edit-letter" />
                </Suspense>
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <ProfilePage />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/validate-resume"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <ResumeValidator />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/interview-preparation"
          element={
            <PrivateRoute>
              <DashboardLayout showHeader={true}>
                <InterviewPreparation />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <SettingsPage />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/jobs"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <JobSearch />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/ausbildung-finder"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <AusbildungFinder />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/application-tracker"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <JobApplicationTracker />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/visa-guide"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <VisaGuide />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/german-culture"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <GermanCultureGuide />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/language-learning"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <LanguageLearningTools />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
      </Routes>
      {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
    </Suspense>
  );
}

export default App;
