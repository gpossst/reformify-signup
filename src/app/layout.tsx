import type { Metadata } from "next";
import { Fredoka, Merriweather_Sans } from "next/font/google";
import "@/app/globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-fredoka",
  display: "swap",
});

const merriweatherSans = Merriweather_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-merriweather-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Reformify - Simple Form API for Developers",
  description:
    "Create and manage forms easily with Reformify's simple API. Affordable pricing with all features included.",
  keywords:
    "form api, form management, developer tools, web forms, api forms, simple forms",
  openGraph: {
    title: "Reformify - Simple Form API for Developers",
    description:
      "Create and manage forms easily with Reformify's simple API. Affordable pricing with all features included.",
    type: "website",
    images: [
      "https://utfs.io/f/STFL4gpOFkcntBKcL5dVbQDo8T7RmK6aH09S5z4fXAqCGNPB",
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reformify - Simple Form API for Developers",
    description:
      "Create and manage forms easily with Reformify's simple API. Affordable pricing with all features included.",
  },
  alternates: {
    canonical: "https://reformify.dev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fredoka.variable} ${merriweatherSans.variable} antialiased h-full`}
      >
        <div className="h-full">{children}</div>
      </body>
    </html>
  );
}
