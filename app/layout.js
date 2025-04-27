import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "रूपा",
  description: "मेरा नाम रूपा है। मुझे नीला रंग बहुत पसंद है।",
  images: ["https://roopa.vercel.app/api/og"],

  openGraph: {
    title: "रूपा",
    description: "मेरा नाम रूपा है। मुझे नीला रंग बहुत पसंद है।",
    images: ["https://roopa.vercel.app/api/og"],
  },
};

export const viewport = {
  maximumScale: 1, // Disable auto-zoom on mobile Safari
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
