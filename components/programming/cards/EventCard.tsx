import Image from "next/image";

import RichText from "@/components/RichText";
import type { ProgrammingItem } from "@/types/programming";

export default function EventCard({
  item,
}: {
  item: ProgrammingItem;
}) {
  return (
    <article className="relative border-t border-gray-200 pt-6">
      <div className="space-y-5">

        <div>
          <div className="text-sm opacity-60">
            {item.startDate && (
              <>
               {new Date(item.startDate).toLocaleDateString("en-ZA")}
              </>
            )}
          </div>
          <div className="text-sm opacity-60">
            {item.venue}
          </div>

          <h2 className="font-metana text-2xl pt-5">
            {item.title}
          </h2>

          {item.subtitle && (
            <p className="italic">
              {item.subtitle}
            </p>
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



      </div>
    </article>
  );
}