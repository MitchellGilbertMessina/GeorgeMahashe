import Image from "next/image";
import type { ProgrammingItem } from "@/types/programming";

export default function ProgrammingCard({
  item,
}: {
  item: ProgrammingItem;
}) {
  return (
    <article className="space-y-4 border-t pt-6">
      <h2 className="text-xl font-metana">{item.title}</h2>

      <div className="text-sm opacity-50">
        {item.venue && <span>{item.venue}</span>}

        {item.startDate && (
          <span>
            {" "}
            •{" "}
            {new Date(item.startDate).toLocaleDateString("en-ZA")}
          </span>
        )}
      </div>

      {item.featuredImage && (
        <Image
          src={item.featuredImage}
          alt={item.title}
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      )}
    </article>
  );
}