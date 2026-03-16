import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sun, ArrowLeft } from "lucide-react";

export default function Auth() {
  const [mode, setMode] = useState<"login" | "signup" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
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

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      const { error } = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (error) {
        toast({ variant: "destructive", title: "Google sign-in failed", description: error.message || "Could not sign in with Google." });
      }
    } catch {
      toast({ variant: "destructive", title: "Error", description: "Google sign-in failed." });
    } finally {
      setGoogleLoading(false);
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
              Sun Peek Insight
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
          {mode !== "forgot" && (
            <>
              <Button
                variant="outline"
                className="w-full py-5 text-sm font-medium"
                onClick={handleGoogleSignIn}
                disabled={googleLoading || loading}
              >
                {googleLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                )}
                Continue with Google
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">or continue with email</span></div>
              </div>
            </>
          )}

          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input id="email" type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading} />
            </div>
            {mode !== "forgot" && (
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">Password</label>
                <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} disabled={loading} />
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
