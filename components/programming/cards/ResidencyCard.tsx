import Image from "next/image";
import Link from "next/link";

import RichText from "@/components/RichText";
import type { ProgrammingItem } from "@/types/programming";

const residencyLabels = {
  convened: "Convened Residency",
  visiting: "Visiting Residency",
  pavilion: "Pavilion Occupation",
};


export default function ResidencyCard({
    item,
}: {
    item: ProgrammingItem;
}) {
    return (
        <article className="space-y-5">

            {/* Residency Type */}
            {item.residencyType && (
                <p className="text-xs uppercase tracking-widest opacity-50">
                    {residencyLabels[item.residencyType]}
                </p>
            )}

            {/* Image */}
            {item.featuredImage && (
                <Image
                    src={item.featuredImage}
                    alt={item.title}
                    width={1600}
                    height={1000}
                    className="w-full h-auto"
                />
            )}

            {/* Caption */}
            {item.featuredImageCaption && (
                <p className="text-xs italic opacity-60">
                    {item.featuredImageCaption}
                </p>
            )}

            {/* Participant */}
            <h2 className="font-metana text-2xl">
                {item.title}
            </h2>

            {/* Description */}
            {item.description && (
                <RichText value={item.description} />
            )}

            {/* Link */}
            <Link
                href={`/programming/${item.slug}`}
                className="inline-block text-sm hover:underline"
            >
                More Info →
            </Link>

        </article>
    );
}