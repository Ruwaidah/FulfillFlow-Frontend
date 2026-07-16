import type { ReactNode } from "react"
import "./globals.css"
import Sidebar from "@/components/Sidebar"
import Navbar from "@/components/Navbar"

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex bg-zinc-900 text-white min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="p-6">{children}</main>
        </div>
      </body>
    </html>
  )
}
