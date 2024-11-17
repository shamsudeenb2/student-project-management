import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth/next";

import SessionProvider from './component/SessionProvider'
import NavMenu from './component/NavMenu'
import Navbar from './ui/navbar/navbar'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AFIT",
  description: "AFIT",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession()
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <main>
             <Navbar/>
            {children}
          </main>
          </SessionProvider>
        </body>
    </html>
  );
}
