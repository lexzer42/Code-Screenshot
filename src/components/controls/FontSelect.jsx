import { fonts } from "../../options";
import { SelectItem } from "../ui/select";
import { Select } from "../ui/select";
import { SelectTrigger } from "../ui/select";
import { SelectContent } from "../ui/select";
import { SelectValue } from "../ui/select";
import { useStore } from "../../store";

export default function FontSelect() {
  const fontStyle = useStore((state) => state.fontStyle);

  // console.log(fontStyle);
  return (
    <div>
      <label className="block mb-2 text-xs font-medium text-neutral-400">
        Fuente
      </label>
      <Select
        value={fontStyle}
        onValueChange={(fontStyle) => useStore.setState({ fontStyle })}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Selecciona una fuente" />
        </SelectTrigger>
        <SelectContent className="dark max-h-[500px]">
          {Object.entries(fonts).map(([id, font]) => (
            <SelectItem key={id} value={id}>
              {font.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
