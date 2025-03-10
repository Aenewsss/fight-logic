import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import WhatsAppButton from "@/components/whatsapp-button";
import BenefitsCard from "@/components/benefits-card";
import ModalBenefits from "@/components/modal-benefits";

const questrial = Montserrat({ subsets: ['latin'], weight: '400', variable: "--font-questrial" });
const inter = Inter({ subsets: ['latin'], weight: '400', variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Fight Logic",
  description: "Academia de lutas mais tradicional de Brasília. Trazendo consigo uma história de mais de 20 anos.",
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
        <WhatsAppButton />
        {/* <BenefitsCard /> */}
        <ModalBenefits />
      </body>
    </html>
  );
}
