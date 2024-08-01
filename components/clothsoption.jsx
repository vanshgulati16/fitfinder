import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export function ClothingOptions ({
    type,
    onClose,
    onSelect,
    selectedOptions,
    onClear,
  }) {
    const options = {
      Shirt: [
        "Oversized T-shirt",
        "Formal Shirt",
        "Fit T-shirt",
        "Polo Shirt",
        "Casual Button-up",
        "Tank Top",
      ],
      Pants: [
        "Jeans",
        "Chinos",
        "Dress Pants",
        "Cargo Pants",
        "Shorts",
        "Sweatpants",
      ],
      Shoes: [
        "Sneakers",
        "Dress Shoes",
        "Boots",
        "Sandals",
        "Loafers",
        "Running Shoes",
      ],
      Jacket: [
        "Bomber Jacket",
        "Leather Jacket",
        "Denim Jacket",
        "Blazer",
        "Parka",
        "Windbreaker",
      ],
    };
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            ✕
          </button>
          <h3 className="text-lg font-semibold mb-4 dark:text-gray-200">
            Select {type} Types
          </h3>
          <div className="space-y-2 mb-4">
            {options[type].map((option) => (
              <div key={option} className="flex items-center">
                <Checkbox
                  id={option}
                  checked={selectedOptions.includes(option)}
                  onCheckedChange={(checked) => onSelect(option, checked)}
                />
                <label htmlFor={option} className="ml-2 dark:text-gray-200">
                  {option}
                </label>
              </div>
            ))}
          </div>
          <Button
            onClick={onClear}
            variant="outline"
            className="w-full dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            Clear All
          </Button>
        </div>
      </div>
    );
  };
