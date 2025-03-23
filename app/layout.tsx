import "./globals.css";
import { GeistSans } from "geist/font/sans"; 

export const metadata = {
  title: "Redis Next.js Starter",
  description: "A simple Next.js app with Redis as the database",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.className} antialiased`}>
      <body >{children} </body>
    </html>
  );
}
