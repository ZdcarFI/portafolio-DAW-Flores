"use client"

import {motion} from "framer-motion"
import {useInView} from "framer-motion"
import {useRef, useState} from "react"
import Image from "next/image"
import Link from "next/link"
import {Button} from "@/components/ui/button"
import {User} from "lucide-react"
import {FileText} from "lucide-react"

export default function AboutSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, {once: true, amount: 0.3})
    const [isHovered, setIsHovered] = useState(false)

    return (
        <section id="about" className="py-20 bg-muted/50">
            <div className="container px-4 md:px-6">
                <motion.div
                    ref={ref}
                    initial={{opacity: 0, y: 20}}
                    animate={isInView ? {opacity: 1, y: 0} : {opacity: 0, y: 20}}
                    transition={{duration: 0.5}}
                    className="grid gap-10 md:grid-cols-2 items-center"
                >
                    <div className="relative group">
                        <div
                            className={`absolute -inset-4 rounded-lg bg-gradient-to-r from-primary to-primary/20 opacity-30 blur-lg transition-all duration-500 ${
                                isHovered ? "opacity-70 scale-105" : "opacity-30"
                            }`}
                        />
                        <div
                            className="relative overflow-hidden rounded-lg border bg-background"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <div className="relative">
                                <Image
                                    src="/profilImg.png"
                                    alt="Sobre mí"
                                    width={600}
                                    height={600}
                                    className={`object-cover w-full h-full transition-all duration-500 ${
                                        isHovered ? "scale-110 filter grayscale" : "scale-100"
                                    }`}
                                />
                                {isHovered && (
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                        <motion.div
                                            initial={{opacity: 0, scale: 0.8}}
                                            animate={{opacity: 1, scale: 1}}
                                            transition={{duration: 0.3}}
                                        >
                                            <Button size="lg" asChild>
                                                <Link href="/profile">
                                                    <User className="mr-2 h-4 w-4"/>
                                                    Ver Perfil
                                                </Link>
                                            </Button>
                                        </motion.div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold tracking-tight mb-6">
                            Sobre <span className="text-primary">Mí</span>
                        </h2>

                        <div className="space-y-4 text-muted-foreground">
                            <p>
                                ¡Hola! Soy Carlos Andre Johan Flores Ildefonso, un apasionado **Estudiante de Ingeniería de Sistemas** con
                                gran interés en el desarrollo web.
                            </p>

                            <p>
                                Me especializo en la construcción de aplicaciones robustas y escalables que resuelven
                                problemas del mundo real. Con una sólida base en los fundamentos de la informática y una
                                gran atención al detalle, me esfuerzo por escribir código limpio, eficiente y fácil de
                                mantener.
                            </p>

                            <p>
                                Cuando no estoy codificando, me puedes encontrar explorando nuevas tecnologías,
                                escuchar música o hacer deporte.
                            </p>
                        </div>

                        <div className="mt-8 grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="font-medium text-lg">Educación</h3>
                                <p className="text-muted-foreground">Universidad Nacional del Centro del Perú</p>
                            </div>


                            <div>
                                <h3 className="font-medium text-lg">Ubicación</h3>
                                <p className="text-muted-foreground">Remoto</p>
                            </div>

                            <div>
                                <h3 className="font-medium text-lg">Disponibilidad</h3>
                                <p className="text-muted-foreground">Full time</p>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-col sm:flex-row gap-4">
                            <Button size="lg" variant="outline" asChild className="group">
                                <Link href="/about">
                                    <FileText className="mr-2 h-4 w-4 group-hover:animate-pulse"/>
                                    Conoce Más Sobre Mí
                                </Link>
                            </Button>

                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}