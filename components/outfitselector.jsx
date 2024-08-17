"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { BodyTypeSelector } from "./bodytype";
import { SkinToneSelector } from "./skinTone";
import { ClothingOptions } from "./clothsoption";
import FetchProductList from '../app/util/database'

const OutfitSelector = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [budget, setBudget] = useState(500);
  const [skinTone, setSkinTone] = useState(0);
  const [bodyType, setBodyType] = useState("");
  const [showOptions, setShowOptions] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({
    Shirt: [],
    Pants: [],
    Shoes: [],
    Jacket: [],
  });
  const [colors, setColors] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const clothingItems = [
    { icon: "🧢", name: "Hat", position: "top", size: "small" },
    { icon: "👕", name: "Shirt", position: "center", size: "large" },
    { icon: "👖", name: "Pants", position: "center", size: "large" },
    { icon: "👟", name: "Shoes", position: "bottom", size: "small" },
    { icon: "🧣", name: "Scarf", position: "left", size: "small" },
    { icon: "🧥", name: "Jacket", position: "left", size: "small" },
    { icon: "👜", name: "Bag", position: "right", size: "small" },
    { icon: "🧤", name: "Gloves", position: "right", size: "small" },
  ];

  const toggleItem = (itemName) => {
    if (["Shirt", "Pants", "Shoes", "Jacket"].includes(itemName)) {
      setShowOptions(itemName);
    } else {
      setSelectedItems((prev) =>
        prev.includes(itemName)
          ? prev.filter((item) => item !== itemName)
          : [...prev, itemName]
      );
    }
  };

  const handleOptionSelect = (option, checked) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [showOptions]: checked
        ? [...prev[showOptions], option]
        : prev[showOptions].filter((item) => item !== option),
    }));
  };

  const handleClearOptions = () => {
    setSelectedOptions((prev) => ({
      ...prev,
      [showOptions]: [],
    }));
  };

  const handleClearAll = () => {
    setSelectedItems([]);
    setSelectedOptions({
      Shirt: [],
      Pants: [],
      Shoes: [],
      Jacket: [],
    });
  };

  const generateOutfits = async () => {
    var data = await FetchProductList("Men Topwear","Black","2000","4.5")
    var data2 = await FetchProductList("Formal Trousers For Men","Black","5000","2")
    console.log(data)
    console.log(data2)
    data = data.concat(data2);
    
    fetch("/api/main", { 
    method: "POST", 

    body: JSON.stringify({ 
      prompt: "From the given data of shirts and pants, suggest a 5 date outfits for me, My height is 6ft , i have brownish skin tone, indian origin, black hair, slim body under 12000rs from the given data. Also give the response in json format like array of this object {topWear: {name , price, image, link }, bottomWear : {name , price, image, link}}", 
      data: data, 
    }), 
    }) 
    .then(response => response.json()) 
    .then(json => console.log(json)); 

}

  const closeOptions = () => {
    setShowOptions(null);
    if (
      selectedOptions[showOptions].length > 0 &&
      !selectedItems.includes(showOptions)
    ) {
      setSelectedItems((prev) => [...prev, showOptions]);
    } else if (
      selectedOptions[showOptions].length === 0 &&
      selectedItems.includes(showOptions)
    ) {
      setSelectedItems((prev) => prev.filter((item) => item !== showOptions));
    }
  };

  const renderClothingItem = (item) => (
    <div key={item.name} className="relative">
      <button
        className={`${item.size === "large" ? "w-32 h-32" : "w-24 h-24"} 
                    bg-green-700 rounded-full flex items-center justify-center text-white text-3xl
                    ${
                      selectedItems.includes(item.name) &&
                      (item.name === "Shirt" ||
                      item.name === "Pants" ||
                      item.name === "Shoes" ||
                      item.name === "Jacket"
                        ? selectedOptions[item.name].length > 0
                        : true)
                        ? "ring-4 ring-blue-500"
                        : ""
                    }
                    transition-transform duration-300 hover:scale-110
                    ${showOptions === item.name ? "opacity-50" : ""}`}
        onClick={() => toggleItem(item.name)}
      >
        {item.icon}
        {selectedItems.includes(item.name) &&
          item.name !== "Shirt" &&
          item.name !== "Pants" &&
          item.name !== "Shoes" &&
          item.name !== "Jacket" && (
            <span className="absolute top-0 right-0 bg-red-500 w-3 h-3 rounded-full"></span>
          )}
      </button>
      {["Shirt", "Pants", "Shoes", "Jacket"].includes(item.name) &&
        selectedOptions[item.name].length > 0 && (
          <div className="absolute top-0 right-0 bg-yellow-500 text-xs text-white rounded-full w-6 h-6 flex items-center justify-center">
            {selectedOptions[item.name].length}
          </div>
        )}
    </div>
  );

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-full flex items-center justify-center p-4 relative">
      <div className="w-full max-w-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 flex justify-center dark:text-gray-200">
          Select clothing items
        </h2>
        <Button
          onClick={handleClearAll}
          variant="outline"
          className="bg-red-500 hover:bg-red-600 text-white mb-4"
        >
          Clear All
        </Button>
        <div className="flex flex-col items-center mb-6 space-y-6 relative">
          <div className="w-full flex justify-center">
            {clothingItems
              .filter((item) => item.position === "top")
              .map(renderClothingItem)}
          </div>

          <div className="w-full flex justify-between">
            <div className="flex flex-col space-y-4">
              {clothingItems
                .filter((item) => item.position === "left")
                .map(renderClothingItem)}
            </div>

            <div className="flex flex-col space-y-4">
              {clothingItems
                .filter((item) => item.position === "center")
                .map(renderClothingItem)}
            </div>

            <div className="flex flex-col space-y-4">
              {clothingItems
                .filter((item) => item.position === "right")
                .map(renderClothingItem)}
            </div>
          </div>

          <div className="w-full flex justify-center">
            {clothingItems
              .filter((item) => item.position === "bottom")
              .map(renderClothingItem)}
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full mb-4">
              Options
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-96">
            <div className="p-4 space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Budget: ₹{budget}</h3>
                <Slider
                  min={500}
                  max={100000}
                  step={50}
                  value={[budget]}
                  onValueChange={(value) => setBudget(value[0])}
                />
              </div>
              <SkinToneSelector value={skinTone} onChange={setSkinTone} />
              <BodyTypeSelector value={bodyType} onChange={setBodyType} />

              <div>
                <h3 className="font-semibold mb-2">Colors:</h3>
                <Select
                  onValueChange={(value) => {
                    setColors((prev) =>
                      prev.includes(value)
                        ? prev.filter((c) => c !== value)
                        : [...prev, value]
                    );
                  }}
                  value={colors[colors.length - 1] || ""}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select colors">
                      {colors.length > 0 ? (
                        <div className="flex gap-1">
                          {colors.map((color) => (
                            <div
                              key={color}
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      ) : (
                        "Select colors"
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="w-[340px] max-h-[250px] overflow-y-auto">
                    {[
                      "Black",
                      "Blue",
                      "White",
                      "Navy Blue",
                      "Green",
                      "Grey",
                      "Red",
                      "Yellow",
                      "Maroon",
                      "Olive",
                      "Pink",
                      "Beige",
                      "Orange",
                      "Brown",
                      "Purple",
                      "Mustard",
                      "Teal",
                      "Off White",
                      "Grey Melange",
                      "Peach",
                      "Charcoal",
                      "Turquoise Blue",
                      "Rust",
                      "Cream",
                      "Sea Green",
                      "Lavender",
                      "Multi",
                      "Burgundy",
                      "Coral",
                      "Mauve",
                      "Lime Green",
                      "Khaki",
                      "Gold",
                      "Coffee Brown",
                      "Fluorescent Green",
                      "Taupe",
                      "Rose",
                      "Magenta",
                      "Tan",
                      "Nude",
                      "Steel",
                      "Silver",
                      "Metallic",
                      "Copper",
                      "Bronze",
                      "Skin",
                    ].map((color) => (
                      <SelectItem
                        key={color}
                        value={color}
                        onSelect={(event) => {
                          event.preventDefault();
                          setColors((prev) =>
                            prev.includes(color)
                              ? prev.filter((c) => c !== color)
                              : [...prev, color]
                          );
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: color }}
                          />
                          <span className="capitalize">{color}</span>
                          {colors.includes(color) && (
                            <span className="ml-auto">✓</span>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Brands:</h3>
                <Select
                  onValueChange={(value) => {
                    setBrands((prev) =>
                      prev.includes(value)
                        ? prev.filter((b) => b !== value)
                        : [...prev, value]
                    );
                  }}
                  value={brands[brands.length - 1] || ""}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select brands">
                      {brands.length > 0
                        ? `${brands.length} brand${
                            brands.length > 1 ? "s" : ""
                          } selected`
                        : "Select brands"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="w-[340px] max-h-[250px] overflow-y-auto">
                    {[
                      "nike",
                      "adidas",
                      "puma",
                      "reebok",
                      "underArmour",
                      "newBalance",
                      "asics",
                      "converse",
                      "vans",
                      "fila",
                    ].map((brand) => (
                      <SelectItem
                        key={brand}
                        value={brand}
                        onSelect={(event) => {
                          event.preventDefault();
                          setBrands((prev) =>
                            prev.includes(brand)
                              ? prev.filter((b) => b !== brand)
                              : [...prev, brand]
                          );
                        }}
                      >
                        <div className="flex items-center">
                          <span className="capitalize">{brand}</span>
                          {brands.includes(brand) && (
                            <span className="ml-auto">✓</span>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button className="w-full bg-green-700 hover:bg-green-800 text-white" onClick={generateOutfits}>
          Show outfit
        </Button>
      </div>
      {showOptions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <ClothingOptions
            type={showOptions}
            onClose={closeOptions}
            onSelect={handleOptionSelect}
            selectedOptions={selectedOptions[showOptions]}
            onClear={handleClearOptions}
          />
        </div>
      )}
    </div>
  );
};

export default OutfitSelector;
