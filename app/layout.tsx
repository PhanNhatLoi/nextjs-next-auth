import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sell Shoes",
  description: "Learn NextJs with sale web",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body>{children}</body>
    </html>
  );
}
