import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from './component/theme-provider'
import MouseSpotlight from './component/mouse-spotlight'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground`}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="dark" 
          enableSystem={false}
          disableTransitionOnChange
        >
          <MouseSpotlight />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
