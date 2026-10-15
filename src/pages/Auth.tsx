import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sun, ArrowLeft, Eye, EyeOff } from "lucide-react";

export default function Auth() {
  const [mode, setMode] = useState<"login" | "signup" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/dashboard");
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (session) navigate("/dashboard");
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) {
          toast({ variant: "destructive", title: "Error", description: error.message });
        } else {
          toast({ title: "Check your email", description: "A password reset link has been sent to your email." });
          setMode("login");
        }
      } else if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          toast({ variant: "destructive", title: "Login failed", description: error.message.includes("Invalid login") ? "Invalid email or password." : error.message });
        } else {
          toast({ title: "Welcome back!", description: "Successfully logged in." });
        }
      } else {
        const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/dashboard` } });
        if (error) {
          toast({ variant: "destructive", title: "Signup failed", description: error.message.includes("already registered") ? "This email is already registered." : error.message });
        } else {
          toast({ title: "Account created!", description: "Please check your email to verify your account." });
        }
      }
    } catch {
      toast({ variant: "destructive", title: "Error", description: "An unexpected error occurred." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4 relative">
      {/* Back to landing */}
      <Button variant="ghost" size="sm" className="absolute top-4 left-4 text-muted-foreground" onClick={() => navigate("/")}>
        <ArrowLeft className="h-4 w-4 mr-1" /> Back
      </Button>

      <Card className="w-full max-w-md border-border/50 shadow-xl">
        <CardHeader className="space-y-3 text-center pb-2">
          {/* Branding */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-secondary shadow-glow">
              <Sun className="h-6 w-6 text-secondary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight" style={{ fontFamily: "var(--font-serif)" }}>
              Solar Production Estimator
            </span>
          </div>
          <CardTitle className="text-2xl font-bold">
            {mode === "forgot" ? "Reset Password" : mode === "login" ? "Welcome Back" : "Create Account"}
          </CardTitle>
          <CardDescription>
            {mode === "forgot"
              ? "Enter your email to receive a reset link"
              : mode === "login"
              ? "Sign in to access your solar dashboard"
              : "Start monitoring your solar panels today"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input id="email" type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading} />
            </div>
            {mode !== "forgot" && (
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">Password</label>
                <div className="relative">
                  <Input id="password" type={showPassword ? "text" : "password"} className="pr-10" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} disabled={loading} />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 text-muted-foreground"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                    onClick={() => setShowPassword((visible) => !visible)}
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
                  </Button>
                </div>
              </div>
            )}

            {mode === "login" && (
              <button type="button" onClick={() => setMode("forgot")} className="text-xs text-primary hover:underline">
                Forgot password?
              </button>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{mode === "forgot" ? "Sending..." : mode === "login" ? "Signing in..." : "Creating account..."}</>
              ) : (
                <>{mode === "forgot" ? "Send Reset Link" : mode === "login" ? "Sign In" : "Create Account"}</>
              )}
            </Button>
          </form>

          <div className="text-center text-sm">
            {mode === "forgot" ? (
              <button type="button" onClick={() => setMode("login")} className="text-primary hover:underline">Back to sign in</button>
            ) : (
              <button type="button" onClick={() => setMode(mode === "login" ? "signup" : "login")} className="text-primary hover:underline" disabled={loading}>
                {mode === "login" ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
