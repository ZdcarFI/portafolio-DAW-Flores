"use client"

import {useState, useEffect} from "react"
import {motion, AnimatePresence} from "framer-motion"
import {Card, CardContent} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {
    ChevronLeft,
    ChevronRight,
    BookOpen,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import {Semanas} from "@/data/semanas"


export default function ProjectsSection() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying) return

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % Semanas.length)
        }, 5000)

        return () => clearInterval(interval)
    }, [isAutoPlaying])

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % Semanas.length)
    }

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + Semanas.length) % Semanas.length)
    }

    const goToSlide = (index: number) => {
        setCurrentIndex(index)
    }

    const currentSemana = Semanas[currentIndex]

    return (
        <section id='projects' className="py-20 bg-gradient-to-br from-background via-muted/20 to-background">
            <div className="container px-4 md:px-6">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.6}}
                >
                    <Badge variant="outline" className="mb-4">
                        <BookOpen className="mr-2 h-4 w-4"/>
                        Mi Viaje de Aprendizaje
                    </Badge>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                        7 Semanas de <span className="text-primary">Desarrollo Web</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Un recorrido estructurado desde los fundamentos hasta tecnologías avanzadas del desarrollo web
                        moderno.
                    </p>
                </motion.div>

                {/* Main Carousel */}
                <div className="relative max-w-6xl mx-auto">
                    <div
                        className="relative overflow-hidden rounded-2xl"
                        onMouseEnter={() => setIsAutoPlaying(false)}
                        onMouseLeave={() => setIsAutoPlaying(true)}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{opacity: 0, x: 300}}
                                animate={{opacity: 1, x: 0}}
                                exit={{opacity: 0, x: -300}}
                                transition={{duration: 0.5, ease: "easeInOut"}}
                                className="relative"
                            >
                                <Card className="overflow-hidden border-0 shadow-2xl">
                                    <div className={`bg-gradient-to-br ${currentSemana.color} p-1`}>
                                        <div className="bg-background rounded-lg">
                                            <CardContent className="p-0">
                                                <div className="grid md:grid-cols-2 gap-0">
                                                    {/* Content Side */}
                                                    <div className="p-8 md:p-12 flex flex-col justify-center">
                                                        <div className="flex items-center gap-3 mb-4">
                                                            <div
                                                                className={`p-3 rounded-xl bg-gradient-to-br ${currentSemana.color}`}>
                                                                <currentSemana.icono className="h-8 w-8 text-white"/>
                                                            </div>
                                                            <div>
                                                                <Badge variant="secondary" className="mb-2">
                                                                    Semana {currentSemana.id}
                                                                </Badge>

                                                            </div>
                                                        </div>

                                                        <h3 className="text-3xl md:text-4xl font-bold mb-2">{currentSemana.titulo}</h3>
                                                        <p className="text-xl text-primary font-medium mb-4">{currentSemana.subtitulo}</p>
                                                        <p className="text-muted-foreground mb-6 leading-relaxed">{currentSemana.descripcion}</p>

                                                        {/* Technologies */}
                                                        <div className="mb-8">
                                                            <h4 className="font-semibold mb-3">Tecnologías
                                                                Cubiertas:</h4>
                                                            <div className="flex flex-wrap gap-2">
                                                                {currentSemana.tecnologias.map((tech, index) => (
                                                                    <Badge key={index} variant="secondary"
                                                                           className="text-xs">
                                                                        {tech}
                                                                    </Badge>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* CTA Button */}
                                                        <Button asChild size="lg" className="w-fit group">
                                                            <Link href={`/projects/${currentSemana.slug}`}>
                                                                Explorar Semana {currentSemana.id}
                                                                <ChevronRight
                                                                    className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform"/>
                                                            </Link>
                                                        </Button>
                                                    </div>

                                                    {/* Image Side */}
                                                    <div className="relative aspect-square md:aspect-auto">
                                                        <div
                                                            className={`absolute inset-0 bg-gradient-to-br ${currentSemana.color} opacity-10`}/>
                                                        <Image
                                                            src={currentSemana.imagen || "/placeholder.svg"}
                                                            alt={currentSemana.titulo}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                        <div
                                                            className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"/>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Arrows */}
                        <Button
                            variant="outline"
                            size="icon"
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background"
                            onClick={prevSlide}
                        >
                            <ChevronLeft className="h-4 w-4"/>
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background"
                            onClick={nextSlide}
                        >
                            <ChevronRight className="h-4 w-4"/>
                        </Button>
                    </div>

                    {/* Dots Indicator */}
                    <div className="flex justify-center gap-2 mt-8">
                        {Semanas.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    index === currentIndex
                                        ? "bg-primary scale-125"
                                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                                }`}
                            />
                        ))}
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-6 bg-muted rounded-full h-2 overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-primary to-primary/80"
                            initial={{width: 0}}
                            animate={{width: `${((currentIndex + 1) / Semanas.length) * 100}%`}}
                            transition={{duration: 0.5}}
                        />
                    </div>
                </div>

                {/* Timeline Overview */}
                <motion.div
                    className="mt-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4"
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.6, delay: 0.3}}
                >
                    {Semanas.map((semana, index) => (
                        <motion.button
                            key={semana.id}
                            onClick={() => goToSlide(index)}
                            className={`p-4 rounded-lg border transition-all duration-300 text-left ${
                                index === currentIndex
                                    ? "border-primary bg-primary/5 shadow-lg scale-105"
                                    : "border-border hover:border-primary/50 hover:bg-muted/50"
                            }`}
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                        >
                            <div className={`p-2 rounded-lg bg-gradient-to-br ${semana.color} w-fit mb-2`}>
                                <semana.icono className="h-4 w-4 text-white"/>
                            </div>
                            <div className="text-sm font-medium mb-1">Semana {semana.id}</div>
                            <div className="text-xs text-muted-foreground">{semana.titulo}</div>
                        </motion.button>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
