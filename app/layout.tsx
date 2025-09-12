import type { Metadata } from "next";
import { Baloo_Da_2 } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const balooDa2 = Baloo_Da_2({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Sundoritto",
  description: "A beautiful Next.js application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className={balooDa2.className} suppressHydrationWarning>
        <main className="min-h-screen pt-16">
          {children}
          <Toaster richColors position="bottom-right" />
        </main>
      </body>
    </html>
  );
}
