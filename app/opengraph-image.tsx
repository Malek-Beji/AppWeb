import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#08090d",
          backgroundImage:
            "radial-gradient(circle at 15% 15%, rgba(200,169,110,0.16), transparent 55%), radial-gradient(circle at 85% 85%, rgba(139,115,72,0.14), transparent 55%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontSize: 108,
            fontWeight: 400,
            color: "#f5f3ef",
            letterSpacing: -2,
          }}
        >
          AppWeb
          <span style={{ color: "#c8a96e", fontStyle: "italic", marginLeft: 8 }}>+</span>
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 28,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "rgba(245,243,239,0.5)",
          }}
        >
          Solutions Digitales Premium
        </div>
      </div>
    ),
    { ...size }
  );
}
