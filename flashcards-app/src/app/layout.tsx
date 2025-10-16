import type { Metadata } from "next";
import "./globals.css";
import { Providers, ColorScheme } from "./providers";

export const metadata: Metadata = {
  title: "Flashcards",
  description: "Next.js + Supabase Flashcard App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorScheme />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
