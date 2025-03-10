import { Sidebar } from "../ui/sidebar";
import DashboardHeader from "../DashboardHeader";
import { useAuth } from "@/lib/auth";

interface DashboardLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
}

export function DashboardLayout({
  children,
  showHeader = true,
}: DashboardLayoutProps) {
  const { user, signOut } = useAuth();

  const userName =
    user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";
  const userEmail = user?.email || "";
  const userAvatarUrl =
    user?.user_metadata?.avatar_url ||
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`;

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row relative overflow-x-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {showHeader && (
          <DashboardHeader
            userName={userName}
            userEmail={userEmail}
            userAvatarUrl={userAvatarUrl}
            onLogout={signOut}
          />
        )}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
