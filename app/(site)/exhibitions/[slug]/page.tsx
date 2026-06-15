export const revalidate = 60;

import Image from "next/image";

import {
  getExhibitions,
  getExhibition,
} from "@/sanity/sanity-utils";

import RichText from "@/components/RichText";

export async function generateStaticParams() {
  const exhibitions = await getExhibitions();

  return exhibitions.map((exhibition) => ({
    slug: exhibition.slug,
  }));
}

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ExhibitionPage({
  params,
}: Props) {

  const { slug } = await params;

  const exhibition = await getExhibition(slug);

  if (!exhibition) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-16">
        Exhibition not found.
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-12">

      <div className="space-y-2">
        <h1 className="font-metana text-4xl">
          {exhibition.title}
        </h1>

        {exhibition.venue && (
          <p className="opacity-60">
            {exhibition.venue}
          </p>
        )}
      </div>

      {exhibition.featuredImage && (
        <div className="space-y-2">
          <Image
            src={exhibition.featuredImage}
            alt={exhibition.title}
            width={1600}
            height={1200}
            className="w-full h-auto"
          />

          {exhibition.featuredImageCaption && (
            <p className="text-xs opacity-40">
              {exhibition.featuredImageCaption}
            </p>
          )}
        </div>
      )}

      {exhibition.description && (
        <RichText value={exhibition.description} />
      )}

      {exhibition.galleryImages?.length ? (
        <section className="space-y-6">

          <h2 className="font-metana text-xs uppercase tracking-widest opacity-50">
            Installation Views
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {exhibition.galleryImages.map(
              (image, index) => (
                <div key={index}>

                  <Image
                    src={image.url}
                    alt=""
                    width={1200}
                    height={1200}
                    className="w-full h-auto"
                  />

                  {image.caption && (
                    <p className="text-xs opacity-40 mt-2">
                      {image.caption}
                    </p>
                  )}

                </div>
              )
            )}

          </div>

        </section>
      ) : null}

    </main>
  );
}