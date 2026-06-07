import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Dharma Gita - Belajar Kidung Bali Tanpa Batasan",
  description: "Dharma Gita adalah sebuah platform e-learning untuk melestarikan seni kidung Bali melalui teknologi yang mudah diakses semua kalangan.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen bg-white text-black">
        <Navbar />

        <main className="flex-grow">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}