import Image from "next/image";

import {
  getHomepageImages,
} from "@/sanity/sanity-utils";

import {
  urlFor,
} from "@/sanity/lib/image";

export default async function Home() {

  const images =
    await getHomepageImages();

  if (!images?.length) return null;

  const randomImage =
    images[
      Math.floor(
        Math.random() * images.length
      )
    ];

  return (

    <main
      className="
        relative
        w-full
        h-screen
        overflow-hidden
      "
    >

      <Image
        src={
          urlFor(randomImage)
            .width(4000)
            .quality(100)
            .url()
        }

        alt="Homepage image"

        fill

        priority

        sizes="100vw"

        className="
          object-cover
        "
      />
    </main>
  );
}