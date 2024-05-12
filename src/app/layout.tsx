import type { Metadata } from "next";
import { Inter, Poppins, Radio_Canada } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const poppins = Poppins({ 
  subsets: ["latin"] ,
  weight: ["400", "500", "700"],
  variable: "--font-poppins"
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
