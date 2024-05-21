import ToastNotification from "@/components/ui/ToastNotification";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quiosco",
  description: "Quiosco de comida con Next.js y Prisma",
  icons: "/favicon.ico"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark:bg-neutral-800">
      <body className={`${inter.className} bg-gray-100 text-[#333]`} >
        {children}
        <ToastNotification />
      </body>
    </html>
  );
}
