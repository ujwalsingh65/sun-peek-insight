import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardFooter } from "@/components/DashboardFooter";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, User, Mail, Phone, MapPin, Save } from "lucide-react";

export default function Profile() {
  const { authLoading, handleLogout, AuthLoadingScreen } = useAuthGuard();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setEmail(user.email || "");

      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      if (data) {
        setDisplayName(data.display_name || "");
        setPhone(data.phone || "");
        setLocation(data.location || "");
      }
      setLoading(false);
    };
    if (!authLoading) loadProfile();
  }, [authLoading]);

  const handleSave = async () => {
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      display_name: displayName,
      phone,
      location,
      updated_at: new Date().toISOString(),
    });

    if (error) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    } else {
      toast({ title: "Profile updated", description: "Your changes have been saved." });
    }
    setSaving(false);
  };

  if (authLoading) return <AuthLoadingScreen />;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardHeader onLogout={handleLogout} />
      <section className="border-b border-border/40">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
          <p className="text-muted-foreground mt-1 text-sm">Manage your account details</p>
        </div>
      </section>
      <main className="flex-1 container mx-auto px-4 py-8 max-w-2xl">
        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
        ) : (
          <Card className="border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><User className="h-5 w-5" /> Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2"><Mail className="h-4 w-4 text-muted-foreground" /> Email</label>
                <Input value={email} disabled className="bg-muted/50" />
                <p className="text-xs text-muted-foreground">Email cannot be changed</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2"><User className="h-4 w-4 text-muted-foreground" /> Display Name</label>
                <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2"><Phone className="h-4 w-4 text-muted-foreground" /> Phone</label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 XXXXX XXXXX" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2"><MapPin className="h-4 w-4 text-muted-foreground" /> Location</label>
                <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City, State" />
              </div>
              <Button onClick={handleSave} disabled={saving} className="w-full">
                {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : <><Save className="mr-2 h-4 w-4" />Save Changes</>}
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
      <DashboardFooter />
    </div>
  );
}
