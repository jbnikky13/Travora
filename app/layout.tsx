import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Travora — Search, compare and manage flights",
  description: "A flight-first travel platform for searching, comparing and managing airline bookings.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}