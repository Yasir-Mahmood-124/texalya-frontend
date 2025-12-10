import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ThemeProvider from "@/utils/theme-provider";

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
          {/* <Navbar /> */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}