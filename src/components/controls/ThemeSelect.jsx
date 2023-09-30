import { cn } from "../../lib/utils";
import { themes } from "../../options";
import { SelectItem } from "../ui/select";
import { Select } from "../ui/select";
import { SelectTrigger } from "../ui/select";
import { SelectContent } from "../ui/select";
import { SelectValue } from "../ui/select";
import { useStore } from "../../store";

export default function ThemeSelect() {
  const theme = useStore((state) => state.theme);
  return (
    <div>
      <label className="block mb-2 text-xs font-medium text-neutral-400">
        Tema
      </label>
      <Select
        value={theme}
        onValueChange={(theme) => useStore.setState({ theme })}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Selecciona un tema" />
        </SelectTrigger>
        <SelectContent className="dark">
          {Object.entries(themes).map(([name, theme]) => (
            <SelectItem key={name} value={name}>
              <div className="flex gap-2 items-center">
                <div className={cn("h-4 w-4 rounded-full", theme.background)} />
                <span className="capitalize">{name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
