import type { Metadata } from "next";
import { Questrial, Inter } from "next/font/google";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const questrial = Questrial({ subsets: ['latin'], weight: '400', variable: "--font-questrial" });
const inter = Inter({ subsets: ['latin'], weight: '400', variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Fight Logic",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      <body className={`${inter.variable} ${questrial.variable}`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
