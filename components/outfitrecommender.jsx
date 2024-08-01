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

const ImageUploadPopup = ({ type, onClose, onUpload, existingImages = [] }) => {
  const [images, setImages] = useState(existingImages);

  const handleImageChange = (e) => {
    if (e.target.files) {
      setImages(prevImages => [...prevImages, ...Array.from(e.target.files)]);
    }
  };

  const handleSubmit = () => {
    if (images.length > 0) {
      onUpload(type, images);
      onClose();
    }
  };

  const handleDelete = (index) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg relative max-w-2xl w-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        >
          ✕
        </button>
        <h3 className="text-lg font-semibold mb-4 dark:text-gray-200">
          Upload {type} Images
        </h3>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4"
          multiple
        />
        <div className="grid grid-cols-3 gap-4 mb-4">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image instanceof File ? URL.createObjectURL(image) : image}
                alt={`Preview ${index + 1}`}
                className="w-full h-32 object-cover rounded"
              />
              <button
                onClick={() => handleDelete(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <Button onClick={handleSubmit} disabled={images.length === 0}>
          Upload
        </Button>
      </div>
    </div>
  );
};

const OutfitRecommender = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [skinTone, setSkinTone] = useState(0);
  const [bodyType, setBodyType] = useState("");
  const [showOptions, setShowOptions] = useState(null);
  const [itemImages, setItemImages] = useState({});

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
    setShowOptions(itemName);
  };

  const handleClearAll = () => {
    setSelectedItems([]);
    setItemImages({});
  };

  const handleImageUpload = (type, images) => {
    setItemImages(prev => ({...prev, [type]: images}));
    setSelectedItems(prev => [...new Set([...prev, type])]);
    setShowOptions(null);
  };

  const renderClothingItem = (item) => (
    <div key={item.name} className="relative">
      <button
        className={`${item.size === "large" ? "w-32 h-32" : "w-24 h-24"} 
                    bg-green-700 rounded-full flex items-center justify-center text-white text-3xl
                    ${selectedItems.includes(item.name) ? "ring-4 ring-blue-500" : ""}
                    transition-transform duration-300 hover:scale-110
                    ${showOptions === item.name ? "opacity-50" : ""}`}
        onClick={() => toggleItem(item.name)}
      >
        {itemImages[item.name] && itemImages[item.name].length > 0 ? (
          <img
            src={itemImages[item.name][0] instanceof File ? URL.createObjectURL(itemImages[item.name][0]) : itemImages[item.name][0]}
            alt={`Uploaded ${item.name}`}
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          item.icon
        )}
      </button>
      {itemImages[item.name] && itemImages[item.name].length > 1 && (
        <span className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
          +{itemImages[item.name].length - 1}
        </span>
      )}
    </div>
  );

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-full flex items-center justify-center p-4 relative">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <div className="w-1/4"></div> 
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 flex-grow text-center">
            Select clothing items
          </h2>
          <div className="w-1/4 flex justify-end">
            <Button
              onClick={handleClearAll}
              variant="outline"
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Clear All
            </Button>
          </div>
        </div>
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
              <SkinToneSelector value={skinTone} onChange={setSkinTone} />
              <BodyTypeSelector value={bodyType} onChange={setBodyType} />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button className="w-full bg-green-700 hover:bg-green-800 text-white">
          Show outfit
        </Button>
      </div>
      {showOptions && (
        <ImageUploadPopup
          type={showOptions}
          onClose={() => setShowOptions(null)}
          onUpload={handleImageUpload}
          existingImages={itemImages[showOptions] || []}
        />
      )}
    </div>
  );
};

export default OutfitRecommender;