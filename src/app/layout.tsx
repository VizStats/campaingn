import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";

const display = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
});

const sans = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const serif = Playfair_Display({
  variable: "--font-playfair",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Rev. Ani Opoli for Senate — Rivers West 2027 | DLA",
    template: "%s | Opoli 2027",
  },
  description:
    "Vote Rev. Hon. Amb. Mrs Aneni Opoli Inyamoyio (DLA) for Rivers West Senatorial District. Competent. Vocal. Strong. Jobs not guns, education for women, justice for the less privileged.",
  keywords: [
    "Aneni Opoli Inyamoyio",
    "Ani Opoli",
    "Rivers West Senatorial District",
    "DLA",
    "Democratic Leadership Alliance",
    "Rivers State 2027",
    "Senate election Nigeria",
  ],
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "Opoli 2027",
    title: "Vote Rev. Ani Opoli — The Light Carrier — Rivers West 2027",
    description: "A stronger voice for Rivers West. Democratic Leadership Alliance (DLA).",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#06331a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-NG"
      className={`${display.variable} ${sans.variable} ${serif.variable} antialiased`}
    >
      <body className="min-h-dvh bg-paper text-ink font-sans">{children}</body>
    </html>
  );
}
