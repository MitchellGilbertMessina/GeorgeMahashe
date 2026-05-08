import Image from "next/image";
import { getHomepageImages } from "@/sanity/sanity-utils";

export default async function Home() {
  const images = await getHomepageImages();

  if (!images?.length) return null;

  const randomImage =
    images[Math.floor(Math.random() * images.length)];

  return (
    <div className="relative w-full flex-1">
      <Image
        src={randomImage.asset.url}
        alt="Homepage image"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
    </div>
  );
}