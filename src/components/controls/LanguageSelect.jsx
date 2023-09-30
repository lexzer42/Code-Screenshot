import { languages } from "../../options";
import { SelectItem } from "../ui/select";
import { Select } from "../ui/select";
import { SelectTrigger } from "../ui/select";
import { SelectContent } from "../ui/select";
import { SelectValue } from "../ui/select";
import { useStore } from "../../store";
import { MagicWandIcon } from "@radix-ui/react-icons";

export default function LanguageSelect() {
  const language = useStore((state) => state.language);
  const autoDetectLanguage = useStore((state) => state.autoDetectLanguage);

  const handleChange = (language) => {
    if (language === "auto-detect") {
      useStore.setState({ autoDetectLanguage: true, language: "plaintext" });
    } else {
      useStore.setState({ autoDetectLanguage: false, language });
    }
  };

  return (
    <div>
      <label className="block mb-2 text-xs font-medium text-neutral-400">
        Lenguaje
      </label>
      <Select value={language} onValueChange={handleChange}>
        <SelectTrigger className="w-40">
          {autoDetectLanguage && <MagicWandIcon className="mr-2" />}
          <SelectValue placeholder="Selecciona un lenguaje" />
        </SelectTrigger>
        <SelectContent className="dark max-h-[500px]">
          <SelectItem value="auto-detect">Detectar</SelectItem>
          {Object.entries(languages).map(([lang, name]) => (
            <SelectItem key={lang} value={lang}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
