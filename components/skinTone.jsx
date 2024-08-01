import { Slider } from "@/components/ui/slider"

export function SkinToneSelector ({ value, onChange }){
    const skinTones = [
      { name: "Very Fair", hex: "#FFE0BD" },
      { name: "Fair", hex: "#FFCC99" },
      { name: "Light Medium", hex: "#EAC086" },
      { name: "Medium", hex: "#D3A676" },
      { name: "Tan", hex: "#B68853" },
      { name: "Deep Tan", hex: "#A5694F" },
      { name: "Dark", hex: "#8D5524" },
      { name: "Very Dark", hex: "#5B3D27" }
    ];
  
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span>Skin Tone:</span>
          <div 
            className="w-8 h-8 rounded-full border-2 border-gray-300" 
            style={{ backgroundColor: skinTones[value].hex }}
          ></div>
        </div>
        <Slider
          min={0}
          max={skinTones.length - 1}
          step={1}
          value={[value]}
          onValueChange={(newValue) => onChange(newValue[0])}
        />
        <div className="text-sm text-gray-600">{skinTones[value].name}</div>
      </div>
    );
  };