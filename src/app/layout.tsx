import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "EduConnect Kanyakumari | Government School Management Platform",
  description:
    "AI-Powered Integrated Digital School Management System for Government Schools in Kanyakumari District, Tamil Nadu. Simplifying school operations, reducing paperwork, and improving transparency.",
  keywords: [
    "EduConnect",
    "Government School",
    "Tamil Nadu",
    "Kanyakumari",
    "EMIS",
    "School Management",
    "Education Technology",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="h-full font-sans antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
