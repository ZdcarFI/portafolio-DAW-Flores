"use client"

import React from "react"
import {useState} from "react"
import {motion} from "framer-motion"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {Button} from "@/components/ui/button"
import {Label} from "@/components/ui/label"
import {Badge} from "@/components/ui/badge"
import {
    Send,
    RefreshCw,
    CheckCircle,
    Mail,
    Phone,
    MapPin,
    Eye,
    Clock,
    MessageSquare,
    ExternalLink,
} from "lucide-react"
import Link from "next/link"
import Swal from "sweetalert2"
import emailjs from "@emailjs/browser"

interface FormData {
    nombre: string
    email: string
    asunto: string
    mensaje: string
    empresa?: string
}

type FormState = "idle" | "submitting" | "success" | "error"

const informacionContacto = [
    {
        icon: Mail,
        titulo: "Correo Electrónico",
        valor: "carlosildefonso.708@gmail.com",
        descripcion: "Respuesta en 24 horas",
        enlace: "mailto:carlosildefonso.708@gmail.com",
    },
    {
        icon: Phone,
        titulo: "WhatsApp",
        valor: "Disponible previa solicitud",
        descripcion: "Solo para proyectos profesionales",
        enlace: "https://api.whatsapp.com/send/?phone=981176643&text=Hola%2C+quiero+m%C3%A1s+informaci%C3%B3n&type=phone_number&app_absent=0",
    },
    {
        icon: MapPin,
        titulo: "Ubicación",
        valor: "Trabajo Remoto",
        descripcion: "Disponible mundialmente",
        enlace: null,
    },
]


export default function ContactForm() {
    const [estadoFormulario, setEstadoFormulario] = useState<FormState>("idle")
    const [datosFormulario, setDatosFormulario] = useState<FormData>({
        nombre: "",
        email: "",
        asunto: "",
        mensaje: "",
        empresa: "",
    })
    const [mostrarContacto, setMostrarContacto] = useState(false)

    const manejarCambio = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target
        setDatosFormulario((prev) => ({...prev, [name]: value}))
    }

    const manejarEnvio = async (e: React.FormEvent) => {
        e.preventDefault()
        setEstadoFormulario("submitting")

        try {
            await emailjs.send(
                "service_rw2cg6l",
                "template_zzluat8",
                {
                    from_name: datosFormulario.nombre,
                    from_email: datosFormulario.email,
                    subject: datosFormulario.asunto,
                    message: datosFormulario.mensaje,
                    company: datosFormulario.empresa || "No especificada",
                },
                "amvzvRyWQ_Ao_e3jL",
            )

            setEstadoFormulario("success")
            await Swal.fire({
                title: "¡Mensaje Enviado!",
                text: "Gracias por contactarme. Te responderé lo antes posible.",
                icon: "success",
                confirmButtonColor: "hsl(var(--primary))",
                confirmButtonText: "Perfecto",
            })

            // Resetear formulario
            setTimeout(() => {
                setDatosFormulario({
                    nombre: "",
                    email: "",
                    asunto: "",
                    mensaje: "",
                    empresa: "",
                })
                setEstadoFormulario("idle")
            }, 1000)
        } catch (error) {
            console.error("Error al enviar email:", error)
            setEstadoFormulario("error")
            await Swal.fire({
                title: "Error al Enviar",
                text: "Hubo un problema al enviar tu mensaje. Por favor, intenta nuevamente.",
                icon: "error",
                confirmButtonColor: "hsl(var(--primary))",
                confirmButtonText: "Entendido",
            })
            setTimeout(() => setEstadoFormulario("idle"), 1000)
        }
    }

    const manejarReset = () => {
        setDatosFormulario({
            nombre: "",
            email: "",
            asunto: "",
            mensaje: "",
            empresa: "",
        })
    }

    const manejarMostrarContacto = async () => {
        const resultado = await Swal.fire({
            title: "Aviso Importante",
            text: "Esta información de contacto es solo para propósitos profesionales.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "hsl(var(--primary))",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Entiendo",
            cancelButtonText: "Cancelar",
        })

        if (resultado.isConfirmed) {
            setMostrarContacto(true)
        }
    }

    return (
        <section id="contact" className="py-20 min-h-screen bg-gradient-to-br from-background to-muted/20">
            <div className="container px-4 md:px-6">
                {/* Encabezado */}
                <motion.div
                    className="text-center mb-16"
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.6}}
                >
                    <Badge variant="outline" className="mb-4">
                        <MessageSquare className="mr-2 h-4 w-4"/>
                        Hablemos
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Trabajemos Juntos</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        ¿Tienes un proyecto en mente? Me encantaría escuchar tus ideas y ayudarte a hacerlas realidad.
                    </p>
                </motion.div>

                <div className="grid gap-8 lg:grid-cols-5 lg:gap-12 items-start">
                    {/* Información de contacto */}
                    <motion.div
                        className="lg:col-span-2 space-y-8"
                        initial={{opacity: 0, x: -20}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 0.6, delay: 0.2}}
                    >
                        <div className="space-y-6">
                            <h2 className="text-2xl font-semibold">Información de Contacto</h2>

                            {informacionContacto.map((info, index) => (
                                <motion.div
                                    key={info.titulo}
                                    className="flex items-start space-x-4 p-4 rounded-lg border bg-card hover:shadow-md transition-all duration-300"
                                    whileHover={{scale: 1.02}}
                                >
                                    <div className="p-2 rounded-lg bg-primary/10">
                                        <info.icon className="h-5 w-5 text-primary"/>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-medium">{info.titulo}</h3>
                                        {info.titulo === "WhatsApp" && !mostrarContacto ? (
                                            <Button variant="outline" size="sm" onClick={manejarMostrarContacto}
                                                    className="mt-2">
                                                <Eye className="mr-2 h-4 w-4"/>
                                                Ver Contacto
                                            </Button>
                                        ) : info.enlace ? (
                                            <Link
                                                href={info.enlace}
                                                className="text-primary hover:underline flex items-center gap-1"
                                                target="_blank"
                                            >
                                                {info.valor}
                                                <ExternalLink className="h-3 w-3"/>
                                            </Link>
                                        ) : (
                                            <p className="text-muted-foreground">{info.valor}</p>
                                        )}
                                        <p className="text-sm text-muted-foreground mt-1">{info.descripcion}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>


                    </motion.div>

                    {/* Formulario de contacto */}
                    <motion.div
                        className="lg:col-span-3"
                        initial={{opacity: 0, x: 20}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 0.6, delay: 0.4}}
                    >
                        <Card className="overflow-hidden shadow-lg">
                            <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
                                <CardTitle className="text-2xl">Envíame un Mensaje</CardTitle>
                                <CardDescription>Completa el formulario y te responderé en menos de 24
                                    horas.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-8">
                                <form onSubmit={manejarEnvio} className="space-y-6">
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="nombre">Nombre Completo *</Label>
                                            <Input
                                                id="nombre"
                                                name="nombre"
                                                placeholder="Tu nombre completo"
                                                value={datosFormulario.nombre}
                                                onChange={manejarCambio}
                                                required
                                                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email">Correo Electrónico *</Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="tu@email.com"
                                                value={datosFormulario.email}
                                                onChange={manejarCambio}
                                                required
                                                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="empresa">Empresa (Opcional)</Label>
                                            <Input
                                                id="empresa"
                                                name="empresa"
                                                placeholder="Nombre de tu empresa"
                                                value={datosFormulario.empresa}
                                                onChange={manejarCambio}
                                                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="asunto">Asunto *</Label>
                                            <Input
                                                id="asunto"
                                                name="asunto"
                                                placeholder="Asunto de tu mensaje"
                                                value={datosFormulario.asunto}
                                                onChange={manejarCambio}
                                                required
                                                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="mensaje">Mensaje *</Label>
                                        <Textarea
                                            id="mensaje"
                                            name="mensaje"
                                            placeholder="Cuéntame sobre tu proyecto o consulta..."
                                            value={datosFormulario.mensaje}
                                            onChange={manejarCambio}
                                            required
                                            className="min-h-[150px] resize-none transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                                        />
                                    </div>

                                    <div className="flex gap-4">
                                        <Button type="submit" className="flex-1" disabled={estadoFormulario !== "idle"}>
                                            {estadoFormulario === "idle" && (
                                                <>
                                                    <Send className="mr-2 h-4 w-4"/>
                                                    Enviar Mensaje
                                                </>
                                            )}
                                            {estadoFormulario === "submitting" && (
                                                <>
                                                    <RefreshCw className="mr-2 h-4 w-4 animate-spin"/>
                                                    Enviando...
                                                </>
                                            )}
                                            {estadoFormulario === "success" && (
                                                <>
                                                    <CheckCircle className="mr-2 h-4 w-4"/>
                                                    Enviado Exitosamente
                                                </>
                                            )}
                                            {estadoFormulario === "error" && (
                                                <>
                                                    <span className="mr-2">❌</span>
                                                    Error al Enviar
                                                </>
                                            )}
                                        </Button>

                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={manejarReset}
                                            disabled={estadoFormulario !== "idle"}
                                            className="flex-1"
                                        >
                                            Limpiar
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
