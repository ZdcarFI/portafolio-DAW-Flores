"use client"

import Link from "next/link"
import {Github, Linkedin, Twitter, Mail, Cpu, Download, ExternalLink} from 'lucide-react'
import {Button} from "@/components/ui/button"
import {motion} from "framer-motion"

const enlacesRapidos = [
    {href: "/", texto: "Inicio"},
    {href: "/#about", texto: "Sobre Mí"},
    {href: "/#skills", texto: "Habilidades"},
    {href: "/#projects", texto: "Proyectos"},
    {href: "/#contact", texto: "Contacto"}
]

const redesSociales = [
    {
        href: "https://github.com/ZdcarFI/portafolio-DAW-Flores",
        icon: Github,
        texto: "GitHub",
        descripcion: "Revisa mi código"
    },
    {
        href: "https://www.linkedin.com/in/carlos-flores-ildefonso-9a2431212/",
        icon: Linkedin,
        texto: "LinkedIn",
        descripcion: "Conecta conmigo"
    },

    {
        href: "carlosildefonso.708@gmail.com",
        icon: Mail,
        texto: "Email",
        descripcion: "Escríbeme"
    }
]

const FloatingCircles = () => {
    const circles = Array.from({length: 15}, (_, i) => ({
        id: i,
        size: Math.random() * 60 + 20, // Tamaño entre 20px y 80px
        initialX: Math.random() * 100, // Posición inicial X en %
        initialY: Math.random() * 100, // Posición inicial Y en %
        duration: Math.random() * 20 + 15, // Duración entre 15s y 35s
        delay: Math.random() * 5, // Delay inicial hasta 5s
    }))

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {circles.map((circle) => (
                <motion.div
                    key={circle.id}
                    className="absolute rounded-full opacity-5"
                    style={{
                        width: circle.size,
                        height: circle.size,
                        left: `${circle.initialX}%`,
                        top: `${circle.initialY}%`,
                        background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary)) 50%, transparent)',
                    }}
                    animate={{
                        y: [-20, -100],
                        x: [0, Math.random() * 100 - 50],
                        scale: [1, 1.2, 0.8, 1],
                        opacity: [0, 0.1, 0.05, 0],
                    }}
                    transition={{
                        duration: circle.duration,
                        delay: circle.delay,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
    )
}

// Componente para partículas más pequeñas
const FloatingParticles = () => {
    const particles = Array.from({length: 25}, (_, i) => ({
        id: i,
        size: Math.random() * 4 + 2, // Partículas pequeñas 2-6px
        initialX: Math.random() * 100,
        initialY: Math.random() * 100,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 8,
    }))

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full"
                    style={{
                        width: particle.size,
                        height: particle.size,
                        left: `${particle.initialX}%`,
                        top: `${particle.initialY}%`,
                        backgroundColor: 'hsl(var(--primary))',
                    }}
                    animate={{
                        y: [0, -150],
                        x: [0, Math.random() * 60 - 30],
                        opacity: [0, 0.3, 0.1, 0],
                        scale: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    )
}
export default function Footer() {
    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: {opacity: 0, y: 20},
        visible: {opacity: 1, y: 0}
    }

    return (
        <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <FloatingCircles/>
            <FloatingParticles/>
            <div
                className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none"/>

            <div className="container px-4 md:px-6 relative z-10">
                {/* Sección principal */}
                <motion.div
                    className="py-12 md:py-16 lg:py-20"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once: true}}
                >
                    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                        {/* Información personal */}
                        <motion.div
                            variants={itemVariants}
                            className="lg:col-span-2 space-y-4 relative"
                        >
                            <Link href="/" className="flex items-center space-x-3 group">
                                <div
                                    className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors relative overflow-hidden">
                                    <Cpu className="h-6 w-6 text-primary relative z-10"/>
                                    {/* Efecto de brillo en hover */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                        initial={{x: "-100%"}}
                                        whileHover={{x: "100%"}}
                                        transition={{duration: 0.6}}
                                    />
                                </div>
                                <div>
                                    <span className="font-bold text-xl">Carlos Flores Ildefonso</span>
                                    <p className="text-sm text-muted-foreground">Desarrollador Full Stack</p>
                                </div>
                            </Link>
                            <p className="text-muted-foreground max-w-md leading-relaxed">
                                Estudiante de Ingeniería de Sistemas, en constante formación en desarrollo web Frontend
                                y Backend. Me considero un desarrollador Full Stack en proceso, con gran interés en la
                                programación y el desarrollo de software. Apasionado por aprender nuevas tecnologías y
                                crear soluciones útiles que generen impacto.
                            </p>
                            <div className="flex gap-3 pt-2">
                                <Button variant="outline" size="sm" asChild className="group relative overflow-hidden">
                                    <Link href="/#contact">
                                        <span className="relative z-10">Contáctame</span>
                                        {/* Efecto de hover */}
                                        <motion.div
                                            className="absolute inset-0 bg-primary/10"
                                            initial={{scale: 0, opacity: 0}}
                                            whileHover={{scale: 1, opacity: 1}}
                                            transition={{duration: 0.3}}
                                        />
                                    </Link>
                                </Button>
                            </div>
                        </motion.div>

                        {/* Enlaces rápidos */}
                        <motion.div variants={itemVariants} className="space-y-4">
                            <h3 className="font-semibold text-lg relative">
                                Navegación
                                {/* Línea decorativa */}
                                <motion.div
                                    className="absolute -bottom-1 left-0 h-0.5 bg-primary/30"
                                    initial={{width: 0}}
                                    whileInView={{width: "2rem"}}
                                    transition={{duration: 0.8, delay: 0.2}}
                                />
                            </h3>
                            <nav className="flex flex-col space-y-3">
                                {enlacesRapidos.map((enlace, index) => (
                                    <motion.div
                                        key={enlace.href}
                                        initial={{opacity: 0, x: -20}}
                                        whileInView={{opacity: 1, x: 0}}
                                        transition={{delay: index * 0.1}}
                                    >
                                        <Link
                                            href={enlace.href}
                                            className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm group flex items-center relative"
                                        >
                                            <span
                                                className="group-hover:translate-x-1 transition-transform duration-200">
                                                {enlace.texto}
                                            </span>
                                            {/* Punto decorativo que aparece en hover */}
                                            <motion.div
                                                className="absolute -left-3 w-1 h-1 rounded-full bg-primary"
                                                initial={{scale: 0, opacity: 0}}
                                                whileHover={{scale: 1, opacity: 1}}
                                                transition={{duration: 0.2}}
                                            />
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>
                        </motion.div>

                        {/* Redes sociales */}
                        <motion.div variants={itemVariants} className="space-y-4">
                            <h3 className="font-semibold text-lg relative">
                                Conecta Conmigo
                                <motion.div
                                    className="absolute -bottom-1 left-0 h-0.5 bg-primary/30"
                                    initial={{width: 0}}
                                    whileInView={{width: "2rem"}}
                                    transition={{duration: 0.8, delay: 0.4}}
                                />
                            </h3>
                            <nav className="flex flex-col space-y-3">
                                {redesSociales.map((red, index) => (
                                    <motion.div
                                        key={red.href}
                                        initial={{opacity: 0, x: -20}}
                                        whileInView={{opacity: 1, x: 0}}
                                        transition={{delay: index * 0.1 + 0.2}}
                                    >
                                        <Link
                                            href={red.href}
                                            className="text-muted-foreground hover:text-primary transition-all duration-200 text-sm group flex items-center gap-3 p-2 rounded-lg hover:bg-primary/5"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <motion.div
                                                whileHover={{rotate: 360}}
                                                transition={{duration: 0.6}}
                                            >
                                                <red.icon
                                                    className="h-4 w-4 group-hover:scale-110 transition-transform duration-200"/>
                                            </motion.div>
                                            <div>
                                                <div
                                                    className="group-hover:translate-x-1 transition-transform duration-200">
                                                    {red.texto}
                                                </div>
                                                <div className="text-xs text-muted-foreground/70">
                                                    {red.descripcion}
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Copyright */}
                <motion.div
                    className="py-6 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-primary/10"
                    initial={{opacity: 0}}
                    whileInView={{opacity: 1}}
                    viewport={{once: true}}
                >
                    <p className="text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} Zdcarfi0708. Todos los derechos reservados.
                    </p>
                </motion.div>
            </div>
        </footer>
    )
}
