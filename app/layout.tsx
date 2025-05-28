import type React from "react"
import "@/app/globals.css"
import {Inter} from "next/font/google"
import {ThemeProvider} from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PageTransition from "@/components/page-transition"
import CustomCursor from "@/components/cursor"
import {Suspense} from "react"

const inter = Inter({subsets: ["latin"]})

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning className="scroll-smooth">
        <head>
            <title>Ashu Maurya | Fullstack Developer</title>
            <meta name="description"
                  content="Portfolio"/>
            <link rel="icon" href="/favicon.ico" sizes="32x32"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        </head>
        <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <CustomCursor/>
            <PageTransition>
                <Suspense>
                    <div>
                        <Navbar/>
                        {children}
                        <Footer/>
                    </div>
                </Suspense>
            </PageTransition>
        </ThemeProvider>
        </body>
        </html>
    )
}
