"use client"

import {motion} from "framer-motion"
import {useInView} from "framer-motion"
import {useRef, useState} from "react"
import Image from "next/image"
import Link from "next/link"
import {Button} from "@/components/ui/button"
import {Clock, Code2, GraduationCap, Heart, MapPin, Rocket, User} from "lucide-react"
import {FileText} from "lucide-react"
import {Card, CardContent} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";

export default function AboutSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, {once: true, amount: 0.3})
    const [isHovered, setIsHovered] = useState(false)

    return (
        <section id="about" className="py-16 bg-muted/50">
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
                                    src="/Foto.png"
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
                                ¡Hola! Soy <span
                                className="text-primary font-bold">Carlos Andre Johan Flores Ildefonso</span>,
                                Estudiante de Ingeniería de Sistemas en constante formación en desarrollo web Frontend y
                                Backend
                            </p>

                            <div className="flex items-start gap-3">
                                <div className="bg-primary/10 p-2 rounded-lg mt-1">
                                    <Code2 className="h-5 w-5 text-primary"/>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Desarrollador Full Stack en Proceso</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Me especializo en la construcción de aplicaciones robustas y escalables que
                                        resuelven
                                        problemas del mundo real, con una sólida base en los fundamentos de la
                                        informática.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="bg-primary/10 p-2 rounded-lg mt-1">
                                    <Rocket className="h-5 w-5 text-primary"/>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Innovación e Impacto</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Apasionado por aprender nuevas tecnologías y crear soluciones útiles que generen
                                        impacto,
                                        siempre enfocado en escribir código limpio, eficiente y fácil de mantener.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="bg-primary/10 p-2 rounded-lg mt-1">
                                    <Heart className="h-5 w-5 text-primary"/>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">Más Allá del Código</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Cuando no estoy programando, me encuentras explorando nuevas tecnologías,
                                        escuchando música o practicando deportes. Creo en el equilibrio entre la pasión
                                        profesional y el crecimiento personal.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 grid md:grid-cols-3 gap-6 mb-12">
                            <Card
                                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-primary/10">
                                <CardContent className="p-6 text-center">
                                    <div
                                        className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                                        <GraduationCap className="h-7 w-7 text-primary"/>
                                    </div>
                                    <h3 className="font-semibold text-lg mb-2">Educación</h3>
                                    <p className="text-muted-foreground text-sm">Universidad Nacional del Centro del
                                        Perú</p>
                                    <Badge variant="outline" className="mt-2 text-xs">Ingeniería de Sistemas</Badge>
                                </CardContent>
                            </Card>

                            <Card
                                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-primary/10">
                                <CardContent className="p-6 text-center">
                                    <div
                                        className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                                        <MapPin className="h-7 w-7 text-primary"/>
                                    </div>
                                    <h3 className="font-semibold text-lg mb-2">Ubicación</h3>
                                    <p className="text-muted-foreground text-sm">Trabajo Remoto, Huancayo - Perú</p>

                                    <Badge variant="outline" className="mt-2 text-xs"> Disponible Globalmente</Badge>
                                </CardContent>
                            </Card>

                            <Card
                                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-primary/10">
                                <CardContent className="p-6 text-center">
                                    <div
                                        className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                                        <Clock className="h-7 w-7 text-primary"/>
                                    </div>
                                    <h3 className="font-semibold text-lg mb-2">Disponibilidad</h3>
                                    <p className="text-muted-foreground text-sm">Tiempo Completo</p>

                                    <Badge variant="outline" className="mt-2 text-xs"> Inmediata</Badge>
                                </CardContent>
                            </Card>
                        </div>


                    </div>
                </motion.div>
            </div>
        </section>
    )
}