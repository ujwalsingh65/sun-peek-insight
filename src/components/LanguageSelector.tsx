import { useLanguage } from "@/contexts/LanguageContext";
import { Language, languageLabels } from "@/i18n/translations";
import { Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <Select value={language} onValueChange={(val) => setLanguage(val as Language)}>
      <SelectTrigger className="w-auto gap-2 bg-background/20 backdrop-blur-sm border-secondary/30 text-primary-foreground hover:bg-background/40 h-9 px-3">
        <Globe className="h-4 w-4" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {(Object.keys(languageLabels) as Language[]).map((lang) => (
          <SelectItem key={lang} value={lang}>
            {languageLabels[lang]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
