import Image from "next/image";
import { party } from "@/content/campaign";

type Props = {
  size?: number;
  tile?: boolean;
  withName?: boolean;
  tone?: "dark" | "light";
  className?: string;
};

/** The DLA gold-pen mark, optionally on the white tile the flyers use. */
export function DlaMark({ size = 44, tile = true, withName, tone = "dark", className = "" }: Props) {
  const mark = (
    <span
      className={`relative grid shrink-0 place-items-center ${tile ? "bg-white shadow-[0_1px_0_rgba(0,0,0,.08)]" : ""}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/img/dla-logo.png"
        alt={`${party.name} (${party.short}) logo`}
        width={312}
        height={312}
        className="h-[88%] w-[88%] object-contain"
        priority
      />
    </span>
  );

  if (!withName) return <span className={className}>{mark}</span>;

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      {mark}
      <span
        className={`text-[0.68rem] font-extrabold uppercase leading-[1.05] tracking-wide ${
          tone === "light" ? "text-white" : "text-ink"
        }`}
      >
        Democratic
        <br />
        Leadership
        <br />
        Alliance
      </span>
    </span>
  );
}
