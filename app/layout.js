import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth/next";
import { getSession } from "@/app/configuration/auth"

import SessionProvider from './component/SessionProvider'
import NavMenu from './component/NavMenu'
import Navbar from './ui/navbar/navbar'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AFIT",
  description: "AFIT",
};

export default async function RootLayout({ children }) {
  const session = await getSession()
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <main>
             <Navbar/>
             <div><hr width="100%" color="#c5c8ca" size="1"/></div>
            {children}
          </main>
          </SessionProvider>
        </body>
    </html>
  );
}
