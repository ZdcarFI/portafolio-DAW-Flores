"use client"

import Link from "next/link"
import {Github, Linkedin, Twitter, Mail, Cpu, Download, ExternalLink} from 'lucide-react'
import {Button} from "@/components/ui/button"
import {motion} from "framer-motion"

const estadisticas = [
    {numero: "3+", descripcion: "Años de Experiencia"},
    {numero: "15+", descripcion: "Proyectos Completados"},
    {numero: "5+", descripcion: "Clientes Satisfechos"},
    {numero: "500+", descripcion: "Desafíos de Código"}
]

const enlacesRapidos = [
    {href: "/", texto: "Inicio"},
    {href: "/#sobre-mi", texto: "Sobre Mí"},
    {href: "/#habilidades", texto: "Habilidades"},
    {href: "/#proyectos", texto: "Proyectos"},
    {href: "/#contacto", texto: "Contacto"}
]

const redesSociales = [
    {
        href: "https://github.com/akmroyal",
        icon: Github,
        texto: "GitHub",
        descripcion: "Revisa mi código"
    },
    {
        href: "https://www.linkedin.com/in/ashu-maurya-9026xxxx/",
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
            <div className="container px-4 md:px-6">
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
                        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-4">
                            <Link href="/" className="flex items-center space-x-3 group">
                                <div
                                    className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                    <Cpu className="h-6 w-6 text-primary"/>
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
                                <Button variant="default" size="sm" asChild className="group">
                                    <Link
                                        href="https://drive.google.com/file/d/1g-HFdWDeUtshGh_tnRn5bcGzPBX5MlEv/view?usp=sharing"
                                        target="_blank">
                                        <Download className="mr-2 h-4 w-4 group-hover:animate-bounce"/>
                                        Descargar CV
                                        <ExternalLink className="ml-2 h-3 w-3"/>
                                    </Link>
                                </Button>
                                <Button variant="outline" size="sm" asChild>
                                    <Link href="/#contacto">Contáctame</Link>
                                </Button>
                            </div>
                        </motion.div>

                        {/* Enlaces rápidos */}
                        <motion.div variants={itemVariants} className="space-y-4">
                            <h3 className="font-semibold text-lg">Navegación</h3>
                            <nav className="flex flex-col space-y-3">
                                {enlacesRapidos.map((enlace) => (
                                    <Link
                                        key={enlace.href}
                                        href={enlace.href}
                                        className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm group flex items-center"
                                    >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {enlace.texto}
                    </span>
                                    </Link>
                                ))}
                            </nav>
                        </motion.div>

                        {/* Redes sociales */}
                        <motion.div variants={itemVariants} className="space-y-4">
                            <h3 className="font-semibold text-lg">Conecta Conmigo</h3>
                            <nav className="flex flex-col space-y-3">
                                {redesSociales.map((red) => (
                                    <Link
                                        key={red.href}
                                        href={red.href}
                                        className="text-muted-foreground hover:text-primary transition-all duration-200 text-sm group flex items-center gap-3"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <red.icon
                                            className="h-4 w-4 group-hover:scale-110 transition-transform duration-200"/>
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
                                ))}
                            </nav>
                        </motion.div>
                    </div>
                </motion.div>


                {/* Copyright */}
                <motion.div
                    className="py-6 flex flex-col md:flex-row justify-between items-center gap-4"
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
