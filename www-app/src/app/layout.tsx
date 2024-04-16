import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NextAuthSessionProvider from '@/provider/sessionProvider'

import '../styles/globals.css'
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gerenciamento de tasks',
  description: 'Painel para gerenciamento de tasks',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body
        className={inter.className}
      >
        <NextAuthSessionProvider>
          <Toaster position="bottom-right" />
          <Theme>
            {children}
          </Theme>
        </NextAuthSessionProvider>
      </body>
    </html>
  )
}
