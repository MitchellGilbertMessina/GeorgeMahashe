import Image from "next/image";

import RichText from "@/components/RichText";
import type { ProgrammingItem } from "@/types/programming";

export default function EventCard({
  item,
}: {
  item: ProgrammingItem;
}) {
  return (
    <article className="space-y-5">

      <div>

        <h2 className="font-metana text-2xl">
          {item.title}
        </h2>

        {item.subtitle && (
          <p className="opacity-70">
            {item.subtitle}
          </p>
        )}

      </div>

      <div className="text-sm opacity-60">

        {item.venue}

        {item.startDate && (
          <>
            {" • "}
            {new Date(item.startDate).toLocaleDateString("en-ZA")}
          </>
        )}

      </div>

      {item.featuredImage && (
        <Image
          src={item.featuredImage}
          alt={item.title}
          width={1600}
          height={1000}
          className="w-full h-auto"
        />
      )}

      {item.featuredImageCaption && (
        <p className="text-xs italic opacity-60">
          {item.featuredImageCaption}
        </p>
      )}

      {item.description && (
        <RichText value={item.description} />
      )}

    </article>
  );
}