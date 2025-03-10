import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { ThemeToggle } from "../theme-toggle";

export default function SettingsPage() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Theme</Label>
            <div>
              <ThemeToggle />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
