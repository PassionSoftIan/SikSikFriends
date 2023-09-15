import "@/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Elefante",
  description: "Generated by create Elefante",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="book-cover">
          <div className="book-page1" />
          <div className="book-page2" />
          <div className="book-page">
            <div className="main-container">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}