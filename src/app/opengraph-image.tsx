import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { candidate, election, party } from "@/content/facts";
import { site } from "@/content/site";

export const alt = `${candidate.callName} — ${candidate.district} 2027`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const portrait = `data:image/png;base64,${await readFile(join(process.cwd(), "public/og-portrait.png"), "base64")}`;
const logo = `data:image/png;base64,${await readFile(join(process.cwd(), "public/og-logo.png"), "base64")}`;

/** Per-site share card: same brand frame everywhere, topic line from site.ts. */
export default async function Image() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#fffdf8" }}>
        <div style={{ display: "flex", width: 430, alignItems: "flex-end", justifyContent: "center", background: "#f2b519" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={portrait} width={400} height={576} alt="" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 64px", flex: 1 }}>
          <div style={{ fontSize: 24, letterSpacing: 4, color: "#5b3a0c", fontWeight: 700 }}>
            {candidate.honorific.toUpperCase()}
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 12, fontSize: 76, fontWeight: 800, lineHeight: 1 }}>
            <span style={{ color: "#0d0f0c" }}>{`${candidate.firstName} ${candidate.middleName}`.toUpperCase()}</span>
            <span style={{ color: "#e0971a" }}>{candidate.lastName.toUpperCase()}</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              padding: "16px 22px",
              background: "#2a1a05",
              color: "#fff",
              fontSize: 30,
              borderLeft: "8px solid #f2b519",
            }}
          >
            {site.ogLine}
          </div>
          <div style={{ display: "flex", alignItems: "center", marginTop: 32, gap: 16 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo} width={64} height={64} alt="" style={{ background: "#fff" }} />
            <div style={{ display: "flex", flexDirection: "column", fontSize: 22, color: "#5d6259" }}>
              <span style={{ color: "#0d0f0c", fontWeight: 700 }}>{party.name}</span>
              <span>{`${candidate.district} · ${election.short}`}</span>
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
