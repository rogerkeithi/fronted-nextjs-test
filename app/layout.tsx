import './globals.css'
import { Providers } from './providers'

export const metadata = {
  title: 'SELAZ',
  description: 'Aplicação frontend para teste backend'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
