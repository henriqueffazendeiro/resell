import "@/styles/globals.css";
import "@/styles/how-it-works.css";
import { siteConfig } from "@/lib/config/site";

export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body className="min-h-screen bg-page text-foreground font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
