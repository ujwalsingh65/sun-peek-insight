import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Sun } from "lucide-react";

export const useAuthGuard = () => {
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/auth");
      else setAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) navigate("/auth");
      else setAuthLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: "Logged out", description: "You have been successfully logged out." });
    navigate("/auth");
  };

  const AuthLoadingScreen = () => (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <Sun className="h-12 w-12 text-secondary animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground">{t("loading")}</p>
      </div>
    </div>
  );

  return { authLoading, handleLogout, AuthLoadingScreen };
};
