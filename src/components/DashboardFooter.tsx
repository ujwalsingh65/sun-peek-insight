import { Sun } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const DashboardFooter = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border/60 bg-card/50 backdrop-blur-sm mt-16">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-secondary">
                <Sun className="h-4 w-4 text-secondary-foreground" />
              </div>
              <span className="font-bold" style={{ fontFamily: 'var(--font-serif)' }}>Sun Peek Insight</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {t("footerTagline")}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">{t("quickLinks")}</h4>
            <div className="flex flex-col gap-2">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t("documentation")}</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t("privacyPolicy")}</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t("termsOfService")}</a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">{t("contactUs")}</h4>
            <div className="flex flex-col gap-2">
              <a href="mailto:support@sunpeekinsight.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors">support@sunpeekinsight.com</a>
              <span className="text-sm text-muted-foreground">+91 800-SOLAR-01</span>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Sun Peek Insight. {t("allRightsReserved")}
          </p>
          <p className="text-xs text-muted-foreground font-medium">
            ⚡ Powered by Sun Peek Insight
          </p>
        </div>
      </div>
    </footer>
  );
};
