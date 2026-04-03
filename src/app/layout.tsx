import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/utils/theme-provider";
import { Providers } from "@/redux/provider";
import { AmplifyConfigProvider } from "@/components/providers/AmplifyConfigProvider";
import { ToastProvider } from "@/components/snakbar";

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
        <AmplifyConfigProvider>
          <ThemeProvider>
            <Providers>
              {children}
              <ToastProvider />
            </Providers>
          </ThemeProvider>
        </AmplifyConfigProvider>
      </body>
    </html>
  );
}