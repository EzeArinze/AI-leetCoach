import type { Metadata } from "next";

import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/provider/theme-provider";
import Header from "@/components/home-commponents/header";

export const metadata: Metadata = {
  title: "AI leet coach",
  description: "Get tips & hints, and understanding of your leet problems",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={` antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main>{children}</main>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
