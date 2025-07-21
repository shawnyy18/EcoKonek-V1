
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Pacifico } from "next/font/google";
import "./globals.css";

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pacifico',
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#10b981" },
    { media: "(prefers-color-scheme: dark)", color: "#047857" },
  ],
}

export const metadata: Metadata = {
  title: "EcoKonek",
  description: "A Smart Mobile Solution for Responsible E-Waste Disposal and Bridging the Digital Gap in Local Communities in Mexico, Pampanga",
  keywords: ["e-waste", "recycling", "environment", "sustainability", "Philippines", "Pampanga"],
  authors: [{ name: "EcoKonek Team" }],
  creator: "EcoKonek",
  publisher: "EcoKonek",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://ecokonek.vercel.app'),
  icons: {
    icon: [
      { url: '/favicon.png' },
      { url: '/favicon/Konek.png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
      { url: '/favicon/Konek.png', sizes: '180x180' },
    ],
  },
  openGraph: {
    title: "EcoKonek",
    description: "A Smart Mobile Solution for Responsible E-Waste Disposal and Bridging the Digital Gap in Local Communities",
    type: "website",
    locale: "en_US",
    siteName: "EcoKonek",
    images: [
      {
        url: '/favicon/Konek.png',
        width: 512,
        height: 512,
        alt: 'EcoKonek Logo',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EcoKonek",
    description: "A Smart Mobile Solution for Responsible E-Waste Disposal and Bridging the Digital Gap in Local Communities",
    images: ['/favicon/Konek.png'],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="icon" href="/favicon/Konek.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon/Konek.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon/Konek.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} antialiased transition-colors duration-300`}
      >
        {children}
      </body>
    </html>
  );
}
