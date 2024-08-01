
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function BodyTypeSelector ({ value, onChange }){
  const bodyTypes = [
    {
      id: "ectomorph",
      name: "Ectomorph",
      icon: "🏃",
      description: "Lean and slender, with narrow shoulders and hips.",
    },
    {
      id: "mesomorph",
      name: "Mesomorph",
      icon: "💪",
      description:
        "Athletic build, with well-defined muscles, broad shoulders, and a naturally muscular physique.",
    },
    {
      id: "endomorph",
      name: "Endomorph",
      icon: "🧘",
      description:
        "Soft and round body shape, with higher levels of body fat, broader hips.",
    },
  ];

  return (
    <div className="space-y-2">
      <h3 className="font-semibold">Body Type:</h3>
      <div className="flex justify-between">
        {bodyTypes.map((type) => (
          <TooltipProvider key={type.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => onChange(type.id)}
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-2 transition-all
                          ${
                            value === type.id
                              ? "bg-green-700 text-white"
                              : "bg-gray-200 text-gray-800"
                          }
                          hover:bg-green-600 hover:text-white`}
                  >
                    {type.icon}
                  </button>
                  <span className="text-sm text-center">{type.name}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-sm">{type.description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
};
