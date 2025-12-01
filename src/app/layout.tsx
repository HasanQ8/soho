// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SOHO Solutions | stc – Small Office / Home Office (Revamp)",
  description:
    "Request SOHO services like Fiber Link, Business Professional, Maktabi, Toll-free 800, UAN 9200, DIA and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
