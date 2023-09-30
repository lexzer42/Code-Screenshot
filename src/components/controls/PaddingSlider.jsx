import { Slider } from "../ui/slider";
import { useStore } from "../../store";

export default function PaddingSlider (){
  const padding = useStore(state => state.padding)
  return (
    <div>
      <label className="block mb-2 text-xs font-medium text-neutral-400">Espaciado
      </label>
      <Slider
      className="w-44 my-5"
      value={[padding]}
      onValueChange={([padding]) => useStore.setState({ padding })}
      max={128}
      step={8}
      />
    </div>
  )
}