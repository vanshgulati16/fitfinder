import Image from "next/image";
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    title: "Generate Outfit",
    description: "Generate outfit based on your own clothes",
    image: "/path-to-it",
    link: "/generate"
  },
  { 
    title: "Find Outfit", 
    description: "Create your own outfit according to your features", 
    image: "/path-to-it",
    link: "/recommend"
  },
  // {
  //   title: "Mix & Match",
  //   description: "Not sure if you should buy something?",
  //   image: "/path-to-it",
  //   link: "/mix-and-match"
  // },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl mb-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">FitFinder</h1>
        </div>

        <div className="flex flex-wrap justify-around gap-2">
          {features.map((feature, index) => (
            <Link href={feature.link} key={index} className="cursor-pointer w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)]">
              <Card className="overflow-hidden relative h-64 transition-transform duration-300 hover:scale-105">
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
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}