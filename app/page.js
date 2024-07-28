import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    title: "Generate Outfit",
    description: "Generate outfit based on your own cloths",
    image: "/path-to-it"
  },
  { 
    title: "Find Outfit", 
    description: "Create your own outfit according to your features", 
    image: "/path-to-it" },
  {
    title: "Mix & Match",
    description: "Not sure if you should buy something?",
    image: "/path-to-it"
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 cursor-pointer">
      <div className="w-full max-w-3xl mb-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">FitFinder</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <Card key={index} className="overflow-hidden relative h-64">
              <Image
                src={feature.image}
                alt={feature.title}
                layout="fill"
                objectFit="cover"
              />
              <CardContent className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-br from-green-200/80 to-pink-200/80 text-gray-800">
                <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
                <p>{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
