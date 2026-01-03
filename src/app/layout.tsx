import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/utils/theme-provider";
import { Providers } from "@/redux/provider";
import "@/lib/aws/amplify";

export const metadata: Metadata = {
  title: "Texalya",
  description: "Your landing page description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black min-h-screen">
        <ThemeProvider>
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}