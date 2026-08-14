// app/blog/[slug]/opengraph-image.tsx
import { ImageResponse } from "next/og";
import { getPost } from "@/lib/posts";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function OgImage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPost(params.slug);

  if (!post) {
    return new ImageResponse(<div>Not Found</div>, size);
  }

  // Fetch your custom fonts so the image matches your website exactly
  // We're using the Google Fonts CDN to get the raw font buffers.
  const [frauncesData, plexSansData] = await Promise.all([
    fetch(
      "https://fonts.gstatic.com/s/fraunces/v32/6NUu8FyLNQOQZAnv9bYEvDiIdE9pA8R4.woff2"
    ).then((res) => res.arrayBuffer()),
    fetch(
      "https://fonts.gstatic.com/s/ibmplexsans/v19/zYXgKVElMYYaJe8bpLHnCwDKhdHeFQ.woff2"
    ).then((res) => res.arrayBuffer()),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0f1c", // Your dark bg-background color
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          fontFamily: '"IBM Plex Sans", sans-serif',
        }}
      >
        {/* Top Section: Title and Excerpt */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 60,
              fontWeight: 700,
              fontFamily: '"Fraunces", serif',
              color: "#f0f4fa", // Your text-foreground
              lineHeight: 1.2,
              marginBottom: 24,
              maxWidth: "90%",
              textShadow: "0 2px 8px rgba(0,0,0,0.4)",
            }}
          >
            {post.title}
          </div>
          {post.excerpt && (
            <div
              style={{
                fontSize: 28,
                color: "#8b9bb5", // Your muted-foreground
                maxWidth: "80%",
                lineHeight: 1.4,
              }}
            >
              {post.excerpt}
            </div>
          )}
        </div>

        {/* Bottom Section: Site Name and Date */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "2px solid #2a3a5c",
            paddingTop: 32,
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: 600,
              color: "#c7d1e0",
            }}
          >
            tremante.info
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#8b9bb5",
            }}
          >
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Fraunces",
          data: frauncesData,
          style: "normal",
          weight: 700,
        },
        {
          name: "IBM Plex Sans",
          data: plexSansData,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}