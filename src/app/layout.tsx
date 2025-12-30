import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

// Instanciamos la fuente Inter (compatible con Next.js 13)
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Zohar Master',
  description: 'Zohar System Interface',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* Aplicamos la clase de la fuente Inter al body */}
      <body className={inter.className}>{children}</body>
    </html>
  )
}