import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Feline AI",
  description: "Feline op Ollama 3.1 met login, chats en instellingen.",
  icons: {
    icon: "/intro-assets/feline%20kalebassen.ico",
    shortcut: "/intro-assets/feline%20kalebassen.ico",
    apple: "/intro-assets/feline%20kalebassen.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className="h-full antialiased">
      <body className="min-h-full font-body">{children}</body>
    </html>
  );
}
