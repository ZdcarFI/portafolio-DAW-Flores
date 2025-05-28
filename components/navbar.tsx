"use client"

import {useState, useEffect} from "react"
import Link from "next/link"
import {usePathname} from "next/navigation"
import {motion, AnimatePresence} from "framer-motion"
import {Menu, X, Cpu} from "lucide-react"
import {Button} from "@/components/ui/button"
import {ThemeSwitcher} from "./theme-switcher"
import Logo from "@/components/Logo";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()
    const [text, setText] = useState("")
    const fullText = "ZdcarFI   "
    const [isTyping, setIsTyping] = useState(true)

    useEffect(() => {
        if (text.length < fullText.length) {
            setIsTyping(true)
            const timeout = setTimeout(() => {
                setText(fullText.slice(0, text.length + 1))
            }, 150)
            return () => clearTimeout(timeout)
        } else {
            setIsTyping(false)
            const timeout = setTimeout(() => {
                setText("")
            }, 2000)
            return () => clearTimeout(timeout)
        }
    }, [text])

    // Cerrar menú al cambiar de ruta
    useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    // Prevenir scroll del body cuando el menú está abierto
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    const navItems = [
        {name: "Inicio", path: "/"},
        {name: "Sobre Mí", path: "/#about"},
        {name: "Habilidades", path: "/#skills"},
        {name: "Proyectos", path: "/#projects"},
        {name: "Contacto", path: "/#contact"},
    ]

    const handleLinkClick = () => {
        setIsOpen(false)
    }

    return (
        <>
            <header
                className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center justify-between px-4">
                    <Link href="/" className="flex items-center space-x-2 group">
                        <motion.div
                            initial={{rotate: 0}}
                            animate={{rotate: 360}}
                            transition={{duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse"}}
                            className="group-hover:text-primary transition-colors"
                        >
                            <Logo className="h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16"/>
                        </motion.div>
                        <span className="font-bold text-lg sm:text-xl relative">
                            {text}
                            <span
                                className={`absolute right-0 top-0 h-full w-[2px] bg-primary ${isTyping ? "animate-blink" : "opacity-0"}`}
                            ></span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.path}
                                prefetch={true}
                                className={`text-sm font-medium transition-colors hover:text-primary relative group ${
                                    pathname === item.path ? "text-primary" : "text-muted-foreground"
                                }`}
                            >
                                {item.name}
                                <span
                                    className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}
                        <ThemeSwitcher/>
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center space-x-2 md:hidden">
                        <ThemeSwitcher/>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative z-50"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
                        >
                            <motion.div
                                animate={isOpen ? {rotate: 180} : {rotate: 0}}
                                transition={{duration: 0.2}}
                            >
                                {isOpen ? <X className="h-6 w-6"/> : <Menu className="h-6 w-6"/>}
                            </motion.div>
                        </Button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.2}}
                        className="fixed inset-0 z-50 md:hidden"
                    >
                        {/* Backdrop */}
                        <motion.div
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{x: "100%"}}
                            animate={{x: 0}}
                            exit={{x: "100%"}}
                            transition={{type: "tween", duration: 0.3}}
                            className="absolute right-0 top-0 h-full w-[280px] max-w-[80vw] bg-background border-l shadow-xl"
                        >
                            {/* Header del menú móvil */}
                            <div className="flex items-center justify-between p-4 border-b">
                                <div className="flex items-center space-x-2">
                                    <Logo className="h-6 w-6"/>
                                    <span className="font-bold text-sm">{text}</span>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsOpen(false)}
                                    className="h-8 w-8"
                                >
                                    <X className="h-4 w-4"/>
                                </Button>
                            </div>

                            {/* Navigation Links */}
                            <nav className="p-4">
                                <div className="space-y-1">
                                    {navItems.map((item, index) => (
                                        <motion.div
                                            key={item.name}
                                            initial={{opacity: 0, x: 20}}
                                            animate={{opacity: 1, x: 0}}
                                            transition={{delay: index * 0.1}}
                                        >
                                            <Link
                                                href={item.path}
                                                prefetch={true}
                                                className={`flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground ${
                                                    pathname === item.path
                                                        ? "bg-primary/10 text-primary border-l-2 border-primary"
                                                        : "text-muted-foreground hover:text-foreground"
                                                }`}
                                                onClick={handleLinkClick}
                                            >
                                                {item.name}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </nav>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}