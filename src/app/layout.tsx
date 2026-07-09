import type { Metadata } from "next";
import localFont from "next/font/local";
import { Proza_Libre, Pinyon_Script } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { InquiryProvider } from "@/components/providers/InquiryProvider";
import { CursorProvider } from "@/components/providers/CursorProvider";
import { JourneyProvider } from "@/components/providers/JourneyProvider";
import { HeroExperienceProvider } from "@/components/providers/HeroExperienceProvider";

const montserrat = localFont({
  src: "../../public/fonts/Montserrat-Regular.ttf",
  variable: "--font-montserrat",
  display: "swap",
});

const prozaLibre = Proza_Libre({
  variable: "--font-proza",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const pinyonScript = Pinyon_Script({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nambiar District 25 | Luxury Residences in Bengaluru",
  description:
    "Experience the SOHO Life in Bengaluru. Villa-style skyrise residences across 40+ acres of green with world-class sports facilities.",
  openGraph: {
    title: "Nambiar District 25 — Live the SOHO Life",
    description:
      "An integrated township redefining modern living in Bengaluru. Sport, nature, and architectural distinction.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${prozaLibre.variable} ${pinyonScript.variable}`}
    >
      <body className={`${montserrat.className} font-sans antialiased`}>
        <SmoothScrollProvider>
          <HeroExperienceProvider>
            <JourneyProvider>
              <CursorProvider>
                <InquiryProvider>{children}</InquiryProvider>
              </CursorProvider>
            </JourneyProvider>
          </HeroExperienceProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
