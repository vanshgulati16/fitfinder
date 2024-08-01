import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Header } from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Fitfinder",
//   description: "Explore different variation of outfit thta would suit on you",
// };

export const metadata = {
  // metadataBase: new URL(`https://${process.env.VERCEL_URL}`),
  title: {
    default: 'Fitfinder',
    template: `%s - Fitfinder`
  },
  description: 'Explore different variation of outfit thta would suit on you',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
      <Providers attribute="class" defaultTheme="system" enableSystem>
        <div>
          <Header/>
          <main>
            {children}
          </main>

        </div>
      </Providers>
      </body>
    </html>
  );
}
