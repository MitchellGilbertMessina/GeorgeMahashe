import { getAbout } from "@/sanity/sanity-utils";
import { PortableText } from "@portabletext/react";

export default async function AboutPage() {
  const data = await getAbout();

  return (
    <div>
      <h1>{data.title}</h1>

      <p>{data.bio}</p>

      <h2>Contact</h2>
      <p>{data.contactDetails?.email}</p>

      <h2>Exhibitions</h2>
      <PortableText value={data.exhibitions} />

      <h2>Published Texts</h2>
       <PortableText value={data.publishedTexts} />

      <h2>Other Websites</h2>

      <div style={{ display: "grid", gap: "20px" }}>
        {data.otherWebsites?.map((item: any, i: number) => (
          <a
            key={i}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              border: "1px solid #ddd",
              padding: "16px",
              borderRadius: "12px",
              textDecoration: "none",
              color: "inherit"
            }}
          >
            {item.image?.asset?.url && (
              <img
                src={item.image.asset.url}
                alt={item.title}
                style={{ width: "100%", borderRadius: "8px", marginBottom: "12px" }}
              />
            )}

            <h3>{item.title}</h3>

            {item.description && <p>{item.description}</p>}
          </a>
        ))}
      </div>
    </div>
  );
}