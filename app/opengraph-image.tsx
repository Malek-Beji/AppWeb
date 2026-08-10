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
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {/* la marque, redessinée en rectangles : ImageResponse ne rasterise
              pas les <svg> imbriqués, mais gère parfaitement les divs */}
          <div style={{ display: "flex", position: "relative", width: 150, height: 150 }}>
            {[
              { l: 0, t: 50, c: "#c8a96e" },
              { l: 50, t: 50, c: "#c8a96e" },
              { l: 100, t: 50, c: "#c8a96e" },
              { l: 50, t: 100, c: "#c8a96e" },
              { l: 50, t: 0, c: "#f5f3ef" },
            ].map((b, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: b.l,
                  top: b.t,
                  width: 45,
                  height: 45,
                  borderRadius: 11,
                  background: b.c,
                }}
              />
            ))}
          </div>
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
            <span style={{ color: "#c8a96e", marginLeft: 8 }}>+</span>
          </div>
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
