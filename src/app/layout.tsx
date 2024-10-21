import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "PDF Study Tool",
  description: "A comprehensive tool for studying PDFs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen">
            <header className="bg-primary text-primary-foreground p-4">
              <nav>
                <ul className="flex space-x-4">
                  <li>
                    <Link href="/" className="hover:underline">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/pdf-reader" className="hover:underline">
                      PDF Reader
                    </Link>
                  </li>
                  <li>
                    <Link href="/notes" className="hover:underline">
                      Notes
                    </Link>
                  </li>
                  <li>
                    <Link href="/exam" className="hover:underline">
                      Exam
                    </Link>
                  </li>
                </ul>
              </nav>
            </header>
            <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
            <footer className="bg-primary text-primary-foreground p-4 text-center">
              <p>&copy; 2024 PDF Study Tool. All rights reserved.</p>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
