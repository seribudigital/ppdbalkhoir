import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "PPDB MTs & MA Al-Khoir Islamic School Bin Baz 5",
  description: "Penerimaan Peserta Didik Baru Madrasah Tsanawiyah (MTs) dan Madrasah Aliyah (MA) Al-Khoir Islamic School Bin Baz 5. Sekolah Islam unggulan di Cikande, Serang, Banten dengan kurikulum tahfidz dan asrama.",
  icons: {
    icon: "https://hujtpnndfhnxddglztdn.supabase.co/storage/v1/object/public/seribudigital/mts.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://hujtpnndfhnxddglztdn.supabase.co" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
